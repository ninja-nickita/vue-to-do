<template>
  <div class="container pt-5 mt-5">
    <loading-spinner :loading="loading">
      <b-form @submit.prevent="saveApp" enctype="'multipart/form-data'">
        <h2 class="text-muted mb-4 text-center">Application information</h2>

        <b-row class="mt-5">
          <b-col>
            <b-form-group label="Enter your name" label-for="name">
              <b-form-input
                id="name"
                v-model="app.name"
                type="text"
                placeholder="please write name"
                name="name"
                v-validate="'required|min:1|max:50'"
                :class="{ 'input-error': errors.has('name') }"
              />
              <small v-if="errors.has('name')" class="text-danger">{{
                errors.first("name")
              }}</small>
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group
              label="Enter your description"
              label-for="description"
            >
              <b-form-input
                id="description"
                v-model="app.description"
                type="text"
                placeholder="please write description"
                name="description"
                v-validate="'required'"
                :class="{ 'input-error': errors.has('description') }"
              />
              <small v-if="errors.has('description')" class="text-danger">{{
                errors.first("description")
              }}</small>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-form-group label="Enter your type" label-for="type">
              <b-form-select
                id="type"
                v-model="app.type"
                type="text"
                placeholder="please write type"
                name="type"
                :options="type"
                v-validate="'required'"
                :class="{ 'input-error': errors.has('type') }"
              ></b-form-select>
              <small v-if="errors.has('type')" class="text-danger">{{
                errors.first("type")
              }}</small>
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group label="Enter your framework" label-for="framework">
              <b-form-select
                id="framework"
                v-model="app.framework"
                type="text"
                placeholder="please write framework"
                name="framework"
                :options="framework"
                v-validate="'required'"
                :class="{ 'input-error': errors.has('framework') }"
              ></b-form-select>
              <small v-if="errors.has('framework')" class="text-danger">{{
                errors.first("framework")
              }}</small>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-form-group
              label="Enter your domain name"
              label-for="domain_name"
            >
              <b-form-input
                id="domain_name"
                v-model="app.domain_name"
                type="text"
                placeholder="please write domain name"
                name="domain_name"
                v-validate="'required'"
                :class="{ 'input-error': errors.has('domain_name') }"
              />
              <small v-if="errors.has('domain_name')" class="text-danger">{{
                errors.first("domain_name")
              }}</small>
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group label="Enter your screenshot" label-for="screenshot">
              <div class="d-flex align-items-center">
                <b-img
                  :src="imageUrl"
                  width="75"
                  height="75"
                  class="mr-2"
                ></b-img>
                <b-form-file
                  id="screenshot"
                  v-model="screenshot"
                  v-validate="'required'"
                  type="text"
                  placeholder="please select screenshot"
                  name="screenshot"
                  :class="{ 'input-error': errors.has('screenshot') }"
                ></b-form-file>
              </div>
              <small v-if="errors.has('screenshot')" class="text-danger">{{
                errors.first("screenshot")
              }}</small>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row class="justify-content-center mt-5 action">
          <loading-spinner :loading="btnLoading">
            <button type="submit" class="form-control btn btn-danger w-50">
              {{ app.id ? "UPDATE" : "CREATE" }}
            </button>
          </loading-spinner>
        </b-row>
      </b-form>
    </loading-spinner>
  </div>
</template>

<script>
import constants from "@/services/constants.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { mapState } from "vuex";

export default {
  name: "ApplicationForm",
  components: {
    LoadingSpinner
  },
  data() {
    return {
      type: constants.types,
      framework: constants.frameworks,
      loading: false,
      btnLoading: false
    };
  },
  computed: {
    ...mapState("app", ["app"]),
    appId() {
      return this.$route.params.id;
    },
    isNew() {
      return this.appId === "create";
    },
    imageUrl() {
      if (this.app.screenshot) {
        if (typeof this.app.screenshot === "string")
          return this.app.screenshot.split("?")[0];
        else return window.URL.createObjectURL(this.app.screenshot);
      } else {
        return "https://via.placeholder.com/75";
      }
    },
    screenshot: {
      get: function() {
        if (typeof this.app.screenshot === "string") return null;
        else return this.app.screenshot;
      },
      set: function(value) {
        this.app.screenshot = value;
      }
    }
  },
  async created() {
    if (this.isNew) {
      const initialAppData = {
        name: "",
        description: "",
        type: "",
        framework: "",
        domain_name: "",
        subscription: "",
        screenshot: null,
        plan: ""
      };
      this.$store.commit("app/setApp", initialAppData);
    } else {
      this.loading = true;

      await this.$store.dispatch("app/getApp", this.appId);
      this.loading = false;
    }
  },
  methods: {
    async saveApp() {
      const validation = await this.$validator.validateAll();
      if (validation) {
        this.btnLoading = true;
        const formData = new FormData();
        // eslint-disable-next-line no-unused-vars
        const { plan, subscription, ...params } = this.app;
        Object.entries(params).forEach(([key, value]) => {
          formData.append(key, value);
        });

        if (this.isNew) await this.$store.dispatch("app/createApp", formData);
        else await this.$store.dispatch("app/updateApp", formData);

        this.$router.push({ name: "dashboard" });
        this.btnLoading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep.action .loading-spinner {
  text-align: center;
}
</style>
