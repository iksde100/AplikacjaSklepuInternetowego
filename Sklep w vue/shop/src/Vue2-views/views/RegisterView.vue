<template>
  <div class="view register-view">
    <UiLoader background v-show="loading" />
    <div class="modal">
      <div v-show="registered">
        <h1>Thank you</h1>
        <p>Confirmation email has been send.</p>
      </div>
      <form @submit.prevent="onSubmit" v-show="!registered">
        <h1 class="modal__title montaga-regular">Register</h1>
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
        <input
          class="input_form montaga-regular"
          placeholder="Repeat password"
          type="password"
          v-model="repeatPassword"
        />
        <button class="button montaga-regular" type="submit" :disabled="disabled">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import { UiLoader } from "@/components";
import { postUser } from "@/utils/api";

export default {
  name: "RegisterView",
  components: {
    UiLoader,
  },
  data() {
    return {
      error: "",
      loading: false,
      email: "",
      password: "",
      repeatPassword: "",
      registered: false,
    };
  },
  computed: {
    disabled() {
      return this.loading || !this.email.length;
    },
  },
  methods: {
    onSubmit() {
      if (this.password !== this.repeatPassword) {
        this.error = "Passwords are not the same";
      } else if (this.email.length < 6) {
        this.error = "Email must have at least 6 characters";
      } else {
        this.loading = true;
        this.error = "";
        postUser({ email: this.email, password: this.password })
          .then(() => {
            this.registered = true;
          })
          .catch(() => {
            this.error = "Could not register user";
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
