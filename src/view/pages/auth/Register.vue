<template>
  <div class="auth-module">
    <div class="register rounded auth-form">
      <h4 class="text-center py-5">Sign up for your account</h4>

      <div class="content px-4 my-6">
        <b-form @submit.prevent="register" novalidate>
          <b-form-group>
            <b-form-input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="Name"
              v-validate="'required'"
              name="name"
              :class="{ 'input-error': errors.has('name') }"
            />
            <small v-if="errors.has('name')" class="text-danger">
              {{ errors.first("name") }}
            </small>
          </b-form-group>

          <b-form-group>
            <b-form-input
              id="name"
              v-model="form.email"
              type="email"
              placeholder="Email"
              v-validate="'required|email'"
              name="email"
              :class="{ 'input-error': errors.has('name') }"
            />
            <small v-if="errors.has('email')" class="text-danger">
              {{ errors.first("email") }}
            </small>
          </b-form-group>

          <b-form-group>
            <b-form-input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="Password"
              v-validate="'required|min:8'"
              ref="password"
              name="password"
              :class="{ 'input-error': errors.has('name') }"
            />
            <small v-if="errors.has('password')" class="text-danger">
              {{ errors.first("password") }}
            </small>
          </b-form-group>

          <b-form-group>
            <b-form-input
              id="passwordConfirm"
              v-model="form.passwordConfirm"
              type="password"
              placeholder="Password Confirmation"
              v-validate="'required|confirmed:password'"
              name="passwordConfirm"
              :class="{ 'input-error': errors.has('name') }"
            />
            <small v-if="errors.has('passwordConfirm')" class="text-danger">
              {{ errors.first("passwordConfirm") }}
            </small>
          </b-form-group>

          <loading-spinner :loading="loading">
            <b-button type="submit" variant="danger" class="form-control my-3">
              SIGN UP
            </b-button>
          </loading-spinner>
        </b-form>

        <div class="my-4 text-center">
          <span class="text-gray">Already have an account?</span>
          <router-link class="ml-2 sign-up" to="/login">Log in</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default {
  name: "Register",

  components: {
    LoadingSpinner
  },

  data() {
    return {
      form: {
        email: "",
        name: "",
        password: "",
        passwordConfirm: ""
      },
      loading: false
    };
  },

  computed: {
    ...mapGetters(["isAuthenticated"])
  },

  methods: {
    async register() {
      const validation = await this.$validator.validateAll();

      if (validation) {
        this.loading = true;

        const params = {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password
        };
        await this.$store.dispatch("register", params);

        this.loading = false;
        if (this.isAuthenticated) {
          this.$router.push("/dashboard");
        }
      }
    }
  }
};
</script>
