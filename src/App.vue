<template>
  <div class="app-module">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",

  computed: {
    ...mapGetters(["notification"])
  },

  watch: {
    notification: function({ type, message }) {
      if (message) {
        const title = type === "danger" ? "error" : "infomation";
        this.$bvToast.toast(message, {
          title: title.toUpperCase(),
          variant: type,
          autoHideDelay: 3000,
          solid: true
        });

        setTimeout(() => {
          this.$store.commit("showNotification", {
            type: "info",
            message: null
          });
        }, 3000);
      }
    }
  }
};
</script>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap.scss";
@import "node_modules/bootstrap-vue/src/index.scss";
@import "./assets/sass/global.scss";
</style>
