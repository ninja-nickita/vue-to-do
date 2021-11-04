<template>
  <div class="dashboard-layout">
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="dark"
      class="dashboard-layout__header"
    >
      <router-link to="/dashboard">
        <b-navbar-brand class="mx-5">
          CrowdBotics
        </b-navbar-brand>
      </router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right class="mx-3">
            <template #button-content>
              <em>{{ userName }}</em>
            </template>
            <b-dropdown-item @click.prevent="logout">
              Log Out
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="dashboard-layout__content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DashboardLayout",

  computed: {
    ...mapGetters(["me"]),
    userName() {
      return this.me?.username || "User";
    }
  },

  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/login");
    }
  }
};
</script>
