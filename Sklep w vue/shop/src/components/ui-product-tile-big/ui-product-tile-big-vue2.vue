<template>
  <div class="product-tile-big montaga-regular">
    <div class="product-tile-big__left" :style="imageStyle" />
    <div class="product-tile-big__right">
      <h2>{{ product.name }}</h2>
      <UiRating
        class="product-tile-big__app-rating"
        :rate="product.rate"
        :ratesNumber="product.ratesNumber"
      />
      <p>{{ product.description }}</p>
      <h3>Specification:</h3>
      <ul class="product-tile-big__specification">
        <li v-for="(item, key) in product.specification" :key="key">
          <b>{{ key }}</b
          >: {{ item.join ? item.join(", ") : item }}
        </li>
      </ul>
      <h3>Price:</h3>
      <p class="product-tile-big__price">{{ product.price }}$</p>
      <button
        class="product-tile-big__buy-button button"
        @click="onBuyClick"
        :disabled="buyLoading"
      >
        <template v-if="buyLoading"><UiLoader small /></template>
        <template v-if="!buyLoading">Buy now</template>
      </button>
    </div>
  </div>
</template>

<script>
import { UiRating, UiLoader } from "..";

export default {
  props: {
    product: Object,
    buyLoading: Boolean,
  },
  components: {
    UiLoader,
    UiRating,
  },
  computed: {
    imageStyle() {
      return {
        background: `url(${require(`@/assets/${this.product.image}`)}) center center / contain no-repeat, #eee`,
      };
    },
  },
  methods: {
    onBuyClick() {
      this.$emit("buy-product");
    },
  },
};
</script>

<style lang="scss" scoped></style>
