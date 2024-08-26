<template>
  <div class="view-login">
    <div class="view login-view">
      <UiLoader background v-show="loading" />
      <div class="modal">
        <form class="login_form" @submit.prevent="onSubmit">
          <h1 class="modal__title montaga-regular">Log in</h1>
          <div class="modal__error" v-show="!!error">
            {{ error }}
          </div>
          <input class="input_form montaga-regular" placeholder="Email" v-model="email" />
          <input
            class="input_form montaga-regular"
            placeholder="Password"
            type="password"
            v-model="password"
          />
          <button class="button montaga-regular" type="submit" :disabled="disabled">Send</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { UiLoader } from "@/components";
import * as actionTypes from "@/store/action-types";

export default {
  components: {
    UiLoader,
  },
  data() {
    return {
      error: "",
      loading: false,
      email: "",
      password: "",
    };
  },
  computed: {
    disabled() {
      return this.loading || !this.email.length;
    },
  },
  methods: {
    onSubmit() {
      if (this.email.length < 6) {
        this.error = "Email must have at least 6 characters";
      } else {
        this.loading = true;
        this.error = "";
        this.$store
          .dispatch(actionTypes.LOGIN, { email: this.email, passowrd: this.password })
          .then(() => {
            this.$router.push("/");
          })
          .catch(() => {
            this.error = "Email or password is incorrect";
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
