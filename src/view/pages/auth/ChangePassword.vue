<template>
  <div class="auth-module">
    <div class="mx-auto rounded md-shadow login">
      <div class="text-center py-3">
        <h3 class="text-black">Change Password?</h3>
      </div>
      <hr />
      <div class="content px-4 my-6">
        <b-form @submit.prevent="onSubmit">
          <b-form-group>
            <b-alert
              :show="dismissCountDown"
              dismissible
              variant="warning"
              @dismissed="dismissCountDown = 0"
            >
              <p>{{ apiError }}</p>
              <b-progress
                variant="warning"
                :max="dismissSecs"
                :value="dismissCountDown"
                height="4px"
              ></b-progress>
            </b-alert>
          </b-form-group>
          <b-form-group>
            <b-form-input
              id="oldPassword"
              v-model="form.oldPassword"
              type="password"
              placeholder="oldPassword"
              name="oldPassword"
              v-validate="'required|min:8'"
            />
            <small v-if="errors.has('oldPassword')" class="text-danger">{{
              errors.first("oldPassword")
            }}</small>
          </b-form-group>
          <b-form-group>
            <b-form-input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="Password"
              name="password"
              v-validate="'required|min:8'"
              ref="password"
            />
            <small v-if="errors.has('password')" class="text-danger">{{
              errors.first("password")
            }}</small>
          </b-form-group>
          <b-form-group>
            <b-form-input
              id="passwordConfirm"
              v-model="form.passwordConfirm"
              type="password"
              placeholder="Password Confirmation"
              name="passwordConfirm"
              v-validate="'required|confirmed:password'"
              data-vv-as="password"
            />
            <small v-if="errors.has('passwordConfirm')" class="text-danger">{{
              errors.first("passwordConfirm")
            }}</small>
          </b-form-group>
          <b-button type="submit" variant="danger" class="form-control"
            >RESET</b-button
          >
        </b-form>
        <div class="my-4 text-center">
          <span class="text-gray">Already have an account?</span>
          <span class="ml-2 sign-up" @click.prevent="login">Log in</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ChangePassword",
  data() {
    return {
      form: {
        oldPassword: "",
        passwordConfirm: "",
        password: ""
      },
      dismissSecs: 10,
      dismissCountDown: 0,
      showDismissibleAlert: false
    };
  },
  computed: {
    ...mapGetters({
      apiError: "getErrors",
      isAuthenticated: "isAuthenticated"
    })
  },
  methods: {
    onSubmit() {
      this.$validator.validateAll().then(async result => {
        if (result) {
          const new_password1 = this.form.password;
          const new_password2 = this.form.passwordConfirm;
          await this.changePassword({ new_password1, new_password2 });
          if (!this.isAuthenticated) this.showAlert();
          else this.$router.push("/dashboard");
        }
      });
    },
    login() {
      this.$router.push("/");
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  &:hover {
    color: grey;
  }
  &:visited {
    color: grey;
  }
}
.login {
  width: 475px;
  margin-top: 12vh;
  border: 1px solid gray;
  font-size: 16px;
  line-height: 1;
}
.md-shadow {
  box-shadow: 0 2px 12px rgb(0 40 117 / 6%);
}
.sign-up {
  cursor: pointer;
}
</style>
