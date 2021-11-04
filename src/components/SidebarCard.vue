<template>
  <div class="m-2">
    <b-card
      :title="plan && plan.description ? plan.description : ''"
      :sub-title="plan && plan.name ? plan.name : ''"
      :border-variant="selected ? 'primary' : ''"
      class="d-flex text-center sidebar-card"
    >
      <b-card-text>
        {{ plan && +plan.price ? plan.price : "" }}
      </b-card-text>

      <b-list-group>
        <b-list-group-item v-for="(detail, index) in planDetails" :key="index">
          <b-icon check variant="primary"></b-icon>
          {{ detail }}
        </b-list-group-item>
      </b-list-group>

      <loading-spinner :loading="loading">
        <b-button class="mt-2" variant="primary" @click="selectPlan(plan.id)">{{
          selected ? "current" : "select"
        }}</b-button>
      </loading-spinner>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import constants from "@/services/constants";

export default {
  name: "SidebarCard",
  components: {
    LoadingSpinner
  },
  props: {
    plan: Object
  },
  data() {
    return {
      loading: false,
      planDetails: constants.planDetails
    };
  },
  computed: {
    ...mapGetters({
      app: "app/app",
      subscription: "app/subscription"
    }),

    selected() {
      const oldPlanId = this.subscription.plan || 1;
      return this.plan?.id === oldPlanId;
    }
  },
  methods: {
    async selectPlan(id) {
      this.loading = true;

      if (this.subscription?.id) {
        const params = Object.assign({}, this.subscription);
        params.plan = id;

        await this.$store.dispatch("app/updateSubscription", params);
      } else {
        await this.$store.dispatch("app/createSubscription", {
          plan: id,
          app: this.app.id,
          active: true
        });
      }
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar-card {
  width: 300px;
}

.card-text {
  min-height: 25px;
}
</style>
