<template>
  <div class="app-select montaga-regular">
    <label v-if="label">{{ label }}</label>
    <select :value="value" @change="onChange">
      <option v-for="{ label, value } in options" :key="label + value" :value="value">
        {{ label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  value: String,
  label: String,
  options: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["getValue"]);

const onChange = (e) => {
  emit("getValue", e.target.value);
};
</script>

<style lang="scss" scoped></style>
