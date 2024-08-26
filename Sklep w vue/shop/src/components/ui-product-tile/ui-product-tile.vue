<template>
  <div class="container montaga-regular">
    <router-link class="product-tile card" :to="`/product/${product.id}`">
      <div class="product-tile_image" :style="imageStyle"></div>
      <h4 class="product-tile_title">{{ product.name }}</h4>
      <UiRating
        class="product-tile_rating-number"
        :rate="product.rate"
        :ratesNumber="product.ratesNumber"
      />
      <div class="product-tile_price">{{ product.price }}$</div>
    </router-link>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { UiRating } from "..";

const props = defineProps({
  product: Object,
});

const imageStyle = computed(() => {
  const { image } = props.product;
  let imageUrl;
  try {
    imageUrl = require(`@/assets/${image}`);
  } catch (e) {
    imageUrl = "";
  }
  return {
    background: `url(${imageUrl}) center / cover`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  };
});
</script>

<style scoped></style>
