<template>
  <div v-click-outside="onHide">
    <div @click="onToggle">
      <slot name="button"></slot>
    </div>
    <div v-show="props.opened" ref="popup">
      <slot name="popup"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from "vue";
import ClickOutside from "@/directives/ClickOutside";

const props = defineProps({
  disabled: Boolean,
  opened: Boolean,
});

const emit = defineEmits(["onHide", "onToggle"]);

const onHide = () => {
  emit("onHide");
};

const onToggle = () => {
  if (!props.disabled) {
    emit("onToggle");
  }
};

const popupItem = ref(null);

onMounted(() => {
  popupItem.value = popupItem;
});
</script>

<script>
export default {
  directives: {
    ClickOutside,
  },
};
</script>

<style lang="scss" scoped></style>
