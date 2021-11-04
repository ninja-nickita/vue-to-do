<template>
  <div>
    <b-sidebar id="sidebar-right" title="Change Plan" right backdrop shadow>
      <h3 class="pl-3">Plans</h3>
      <hr />
      <div class="py-2"></div>
      <hr />
      <div class="px-3 py-2 d-flex">
        <sidebar-card v-for="plan in plans" :key="plan.id" :plan="plan" />
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarCard from "./SidebarCard.vue";

export default {
  components: {
    SidebarCard
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      plans: "app/plans"
    })
  }
};
</script>
