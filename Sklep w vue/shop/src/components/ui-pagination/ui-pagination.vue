<template>
  <div class="ui-pagination montaga-regular">
    <button
      v-for="page in pages"
      :key="page"
      :class="page === modelValue ? 'active' : ''"
      @click="onClick(page)"
    >
      {{ page }}
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const pages = computed(() => {
  console.log("Total pages:", props.totalPages);
  return Array.from({ length: props.totalPages }, (_, i) => i + 1);
});

const onClick = (whichPage) => {
  console.log("Clicked page:", whichPage);
  if (whichPage !== props.modelValue) {
    emit("update:modelValue", whichPage);
  }
};
</script>

<style lang="scss" scoped></style>
