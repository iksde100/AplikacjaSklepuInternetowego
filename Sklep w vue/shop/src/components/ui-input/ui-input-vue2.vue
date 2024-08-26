<template>
  <div class="ui-input montaga-regular">
    <label>{{ label }}</label>
    <input
      class="input_form montaga-regular"
      :class="{ error }"
      :value="value"
      :placeholder="placeholder"
      :type="type"
      @input="onInput"
    />
    <span class="app-input__error montaga-regular" v-show="error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  props: {
    value: [String, Number],
    label: String,
    placeholder: String,
    type: {
      type: String,
      default: "text",
    },
    error: String,
  },
  methods: {
    onInput(e) {
      let { value } = e.target;

      if (this.type === "number") {
        value = +value; // Convert to number if input type is number
      }

      this.$emit("input", value); // Emit input event
    },
  },
};
</script>

<style lang="scss" scoped></style>
