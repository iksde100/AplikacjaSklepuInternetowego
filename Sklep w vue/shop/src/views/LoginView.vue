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

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { UiLoader } from "@/components";
import * as actionTypes from "@/store/action-types";

const store = useStore();
const router = useRouter();

const error = ref("");
const loading = ref(false);
const email = ref("");
const password = ref("");

const disabled = computed(() => loading.value || !email.value.length);

const onSubmit = () => {
  if (email.value.length < 6) {
    error.value = "Email must have at least 6 characters";
  } else {
    loading.value = true;
    error.value = "";
    store
      .dispatch(actionTypes.LOGIN, { email: email.value, password: password.value })
      .then(() => {
        router.push("/");
      })
      .catch(() => {
        error.value = "Email or password is incorrect";
        loading.value = false;
      });
  }
};
</script>

<style lang="scss" scoped></style>
