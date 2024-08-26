<template>
  <div class="loader__container">
    <div
      :class="{
        'ui-loader': true,
        'ui-loader--background': background,
        'ui-loader--small': small,
      }"
    >
      <svg viewBox="0 0 60 60">
        <circle cx="30" cy="30" r="20" :stroke-width="small ? 8 : 2" fill="none" />
        <circle v-if="!small" cx="30" cy="30" r="17" stroke-width="2" fill="none" />
        <circle v-if="!small" cx="30" cy="30" r="14" stroke-width="2" fill="none" />
        <circle v-if="!small" cx="30" cy="30" r="11" stroke-width="2" fill="none" />
        <circle v-if="!small" cx="30" cy="30" r="8" stroke-width="1.8" fill="none" />
        <circle v-if="!small" cx="30" cy="30" r="5" stroke-width="1.6" fill="none" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  background: Boolean,
  small: Boolean,
});
</script>

<style lang="scss" scoped></style>
