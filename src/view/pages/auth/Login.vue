<template>
  <div class="auth-module">
    <div class="login rounded auth-form">
      <h4 class="text-center py-5">Welcome Crowdbotics</h4>

      <div class="content px-4 my-6">
        <b-form @submit.prevent="login" novalidate>
          <b-form-group>
            <b-form-input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="Email"
              v-validate="'required|email'"
              name="email"
              :class="{ 'input-error': errors.has('email') }"
            />
            <small v-if="errors.has('email')" class="text-danger">
              {{ errors.first("email") }}
            </small>
          </b-form-group>

          <b-form-group>
            <b-form-input
              id="input-1"
              v-model="form.password"
              type="password"
              placeholder="Password"
              v-validate="'required|min:8'"
              name="password"
              :class="{ 'input-error': errors.has('password') }"
            />
            <small v-if="errors.has('password')" class="text-danger">
              {{ errors.first("password") }}
            </small>
          </b-form-group>

          <loading-spinner :loading="loading">
            <b-button
              type="submit"
              variant="danger"
              class="form-control my-3"
              ref="loginButton"
            >
              LOG IN
            </b-button>
          </loading-spinner>
        </b-form>

        <div class="my-4">
          <router-link to="/register" class="row pr-2 justify-content-center">
            Sign up
          </router-link>
          <router-link
            to="/password-reset"
            class="row pr-2 justify-content-center"
          >
            Forgot password
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default {
  name: "Login",

  components: {
    LoadingSpinner
  },

  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      loading: false
    };
  },

  computed: {
    ...mapGetters(["isAuthenticated"])
  },

  methods: {
    async login() {
      const validation = await this.$validator.validateAll();

      if (validation) {
        this.loading = true;

        const params = {
          email: this.form.email,
          password: this.form.password
        };
        await this.$store.dispatch("login", params);

        this.loading = false;
        if (this.isAuthenticated) {
          this.$router.push("/dashboard");
        }
      }
    }
  }
};
</script>
