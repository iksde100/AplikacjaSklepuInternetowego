<template>
  <div class="view register-view">
    <UiLoader background v-show="loading" />
    <div class="modal">
      <div v-show="registered">
        <h1>Thank you</h1>
        <p>Confirmation email has been sent.</p>
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

<script setup>
import { ref, computed } from "vue";
import { postUser } from "@/utils/api";
import { UiLoader } from "@/components";

const email = ref("");
const password = ref("");
const repeatPassword = ref("");
const error = ref("");
const loading = ref(false);
const registered = ref(false);

const disabled = computed(() => loading.value || !email.value.length);

const onSubmit = async () => {
  if (password.value !== repeatPassword.value) {
    error.value = "Passwords are not the same";
  } else if (email.value.length < 6) {
    error.value = "Email must have at least 6 characters";
  } else {
    loading.value = true;
    error.value = "";
    try {
      await postUser({ email: email.value, password: password.value });
      registered.value = true;
    } catch {
      error.value = "Could not register user";
    } finally {
      loading.value = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
