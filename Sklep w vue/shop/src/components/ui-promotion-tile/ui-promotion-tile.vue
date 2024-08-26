<template>
  <div :style="containerStyle" class="promotion-tile montaga-regular">
    <h3>{{ promotion.header }}</h3>
    <p>{{ promotion.description }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  promotion: {
    type: Object,
    required: true,
  },
});

const containerStyle = computed(() => {
  const { image, colorFrom, colorTo, color } = props.promotion;
  let imageUrl = "";

  try {
    imageUrl = require(`@/assets/${image}`);
  } catch (e) {
    console.error("Image not found:", image);
  }

  const overlay = `linear-gradient(to bottom, ${colorFrom}, ${colorTo})`;

  return {
    background: `${overlay}, url(${imageUrl}) center center / cover, ${color}`,
    height: "200px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "10px",
  };
});
</script>

<style lang="scss" scoped></style>
