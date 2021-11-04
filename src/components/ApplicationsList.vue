<template>
  <div class="container mt-3">
    <h2 class="text-muted  my-5">Apps List</h2>

    <b-row>
      <b-col sm="3" class="d-flex justify-content-center align-items-center">
        <b-input-group size="sm">
          <b-input-group-prepend is-text>
            <b-icon icon="search" />
          </b-input-group-prepend>

          <b-form-input
            type="search"
            placeholder="Search app name"
            id="filter-input"
            v-model="filter"
          />
        </b-input-group>
      </b-col>

      <b-col class="text-right">
        <b-button variant="primary" @click="createApp">create app</b-button>
      </b-col>
    </b-row>

    <loading-spinner :loading="listLoading">
      <b-row class="mt-3 justify-content-center">
        <b-table
          :items="apps"
          select-mode="single"
          :fields="fieldsName"
          :filter="filter"
          empty-text="No data"
          @filtered="onFiltered"
          show-empty
          sticky-headers
          :per-page="perPage"
          :current-page="currentPage"
        >
          <template #cell(name)="{item}">
            <div>
              <b-link @click.prevent="updateApp(item.id)">{{
                item.name
              }}</b-link>
              <div>{{ item.type + " / " + item.framework }}</div>
            </div>
          </template>

          <template #cell(screenshot)="{item}">
            <b-img
              :src="getImageUrl(item.screenshot)"
              width="75"
              height="75"
            ></b-img>
          </template>

          <template #cell(plan)="{item}">
            {{ getPlan(item.id) }}
          </template>

          <template #cell(action)="{item}">
            <b-row class="align-items-center">
              <b-button
                pill
                variant="outline-danger"
                size="sm"
                @click="updateApp(item.id)"
                class="px-4 mx-2"
              >
                Update
              </b-button>

              <b-button
                pill
                variant="outline-primary"
                size="sm"
                @click="selectPlan(item.id)"
                class="px-4 mx-2 select-plan-button"
              >
                <span v-if="loadingAppId === item.id">
                  <b-spinner small></b-spinner>
                  Loading...
                </span>
                <span v-else>Select plan</span>
              </b-button>

              <b-row style="font-size: 2rem;" class="ml-1">
                <b-icon
                  icon="trash-fill"
                  class="rounded-circle bg-danger p-2 icon-button"
                  variant="light"
                  @click="deleteApp(item.id)"
                ></b-icon>
              </b-row>
            </b-row>
          </template>
        </b-table>

        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>
      </b-row>
    </loading-spinner>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as appApi from "@/apis/app";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default {
  name: "ApplicationList",

  components: {
    LoadingSpinner
  },

  async created() {
    this.listLoading = true;
    await this.$store.dispatch("app/getAppsList");
    await this.$store.dispatch("app/getPlanList");
    this.listLoading = false;
  },

  data() {
    return {
      fieldsName: [
        { key: "name", label: "Name", filterByFormatted: true },
        { key: "description", label: "Description" },
        { key: "domain_name", label: "Domain name" },
        { key: "screenshot", label: "Screenshot" },
        { key: "action", label: "Action" }
      ],
      listLoading: false,
      loadingAppId: null,
      filter: null,
      perPage: 3,
      currentPage: 1
    };
  },

  computed: {
    ...mapGetters({
      apps: "app/apps",
      subscription: "app/subscription",
      app: "app/app"
    }),
    rows() {
      return this.apps.length;
    }
  },

  methods: {
    updateApp(id) {
      this.$router.push({ name: "application", params: { id } });
    },

    createApp() {
      this.$router.push({
        name: "application",
        params: {
          id: "create"
        }
      });
    },

    async selectPlan(id) {
      this.loadingAppId = id;

      const { data } = await appApi.getApp(id);
      this.$store.commit("app/setApp", data);

      if (data?.subscription)
        await this.$store.dispatch(
          "app/getSubscription",
          this.app.subscription
        );
      else this.$store.commit("app/setSubscription", { plan: 1 });

      this.$root.$emit("bv::toggle::collapse", "sidebar-right");
      this.loadingAppId = null;
    },

    async deleteApp(id) {
      const sureDelete = window.confirm("Are you sure?");
      if (sureDelete) {
        this.listLoading = true;
        await this.$store.dispatch("app/deleteApp", id);
        await this.$store.dispatch("app/getAppsList");
        this.listLoading = false;
      }
    },

    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    getImageUrl(url) {
      if (url) {
        return url.split("?")[0];
      } else {
        return "https://via.placeholder.com/75";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.select-plan-button {
  width: 130px;
}
</style>
