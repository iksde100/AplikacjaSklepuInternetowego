<template>
  <div v-click-outside="() => $emit('onHide')">
    <div @click="() => !disabled && $emit('onToggle')">
      <slot name="button"></slot>
    </div>
    <div v-show="opened" ref="popup">
      <slot name="popup"></slot>
    </div>
  </div>
</template>
<script>
import ClickOutside from "@/directives/ClickOutside";
export default {
  name: "PopupButton",
  props: {
    disabled: Boolean,
    opened: Boolean,
  },
  direvtives: {
    ClickOutside,
  },
  mounted() {
    this.popupItem = this.$refs.popup;
  },
};
</script>
<style lang="scss"></style>
