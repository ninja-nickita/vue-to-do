<template>
  <div class="auth-module">
    <div class="reset-password rounded auth-form">
      <h4 class="text-center py-5">Can't log in?</h4>

      <div class="content px-4 pb-5">
        <b-form @submit.prevent="send" novalidate>
          <b-form-group>
            <span>
              Please enter your email address below so we can send you a link to
              reset your password.
            </span>
          </b-form-group>

          <b-form-group>
            <b-form-input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="Please enter your email address"
              v-validate="'required|email'"
              name="email"
              :class="{ 'input-error': errors.has('email') }"
            />
            <small v-if="errors.has('email')" class="text-danger">{{
              errors.first("email")
            }}</small>
          </b-form-group>

          <loading-spinner :loading="loading">
            <b-button type="submit" variant="danger" class="form-control my-3">
              SUBMIT
            </b-button>
          </loading-spinner>
          <router-link to="/login" class="row pr-2 justify-content-center">
            Login
          </router-link>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default {
  name: "ResetPassword",

  components: {
    LoadingSpinner
  },

  data() {
    return {
      form: {
        email: ""
      },
      loading: false
    };
  },
  computed: {
    ...mapGetters(["notification"])
  },
  methods: {
    async send() {
      const validation = await this.$validator.validateAll();

      if (validation) {
        this.loading = true;
        await this.$store.dispatch("resetPassword", this.form.email);

        this.loading = false;
        if (this.notification.type === "info") this.$router.push("/login");
      }
    }
  }
};
</script>
