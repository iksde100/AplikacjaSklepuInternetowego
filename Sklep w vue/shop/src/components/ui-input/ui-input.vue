<template>
  <div class="ui-input montaga-regular">
    <label>{{ label }}</label>
    <input
      class="input_form montaga-regular"
      :class="{ error }"
      :value="internalValue"
      :placeholder="placeholder"
      :type="type"
      @input="onInput"
    />
    <span class="app-input__error montaga-regular" v-show="error">{{ error }}</span>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  error: String,
});

const emit = defineEmits(["update:modelValue"]);

const internalValue = ref(props.modelValue);

// Watcher, który synchronizuje modelValue z lokalną zmienną
watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue;
  }
);

const onInput = (e) => {
  let value = e.target.value;

  if (props.type === "number") {
    value = +value;
  }

  emit("update:modelValue", value);
};
</script>

<style lang="scss" scoped></style>
