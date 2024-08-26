<template>
  <div class="view product-view montaga-regular">
    <template v-if="!loading">
      <UiProductTileBig :product="product" @buy-product="onBuyProduct" :buyLoading="cartLoading" />
      <template v-if="product.features">
        <section
          v-for="feature in product.features"
          :key="feature.name"
          class="feature container card"
        >
          <img
            class="feature__image"
            :src="product.image && require(`@/assets/${product.image}`)"
          />
          <div>
            <h3>{{ feature.name }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </section>
      </template>
      <section class="similar-products container card">
        <h3>You may also like:</h3>
        <UiLoader v-if="similarProductsLoading" />
        <p v-if="similarProductsError">Error while loading similar products</p>
        <div
          class="similar-products__list"
          v-if="Array.isArray(similarProducts) && similarProducts.length"
        >
          <UiProductTile v-for="product in similarProducts" :key="product.id" :product="product" />
        </div>
        <p v-if="Array.isArray(similarProducts) && !similarProducts.length">
          No similar products found
        </p>
        <p v-if="!Array.isArray(similarProducts)">similarProducts is not an array</p>
      </section>

      <section class="new-comment container card" v-if="product.ratingOption">
        <template v-if="!newCommentSend">
          <h3>
            What do you think about <i>{{ product.name }}</i>
          </h3>
          <p v-if="newCommentError">Something went wrong. Please submit again.</p>
          <UiRating
            :onEdit="newRate ? null : onRate"
            :rate="newRate"
            class="new-comment__app-rating"
          />
          <textarea class="new-comment__textarea" v-model="newComment" />
          <button class="comment_button montaga-regular" @click="onNewCommentSend">Send</button>
          <div class="new-comment__loader" v-show="newCommentLoading">
            <UiLoader />
          </div>
        </template>
        <template v-if="newCommentSend">
          <h3>Thank you for your opinion</h3>
        </template>
      </section>

      <section class="comments container card">
        <h3>Comments:</h3>
        <h4 v-if="!product.comments.length">No comments</h4>
        <div class="comments__comment" v-for="comment in product.comments" :key="comment.id">
          <h4>{{ comment.user }}</h4>
          <p>{{ comment.message }}</p>
        </div>
      </section>
    </template>
    <UiLoader v-if="loading" />
  </div>
</template>

<script>
import * as actionTypes from "@/store/action-types";
import * as getterTypes from "@/store/getter-types";
import { mapGetters } from "vuex";

import { UiRating, UiLoader, UiProductTile, UiProductTileBig } from "@/components";

export default {
  name: "ProductView",
  components: {
    UiProductTileBig,
    UiLoader,
    UiProductTile,
    UiRating,
  },
  data() {
    return {
      newRate: null,
      newComment: "",
      newCommentLoading: false,
      newCommentSend: false,
      newCommentError: false,
    };
  },
  computed: {
    product() {
      return this.$store.getters[getterTypes.GET_PRODUCT_BY_ID](this.$route.params.id) || {};
    },
    loading() {
      return !this.product.name;
    },
    ...mapGetters({
      similarProducts: getterTypes.GET_PRODUCTS_SIMILAR_PRODUCTS_LIST,
      similarProductsLoading: getterTypes.GET_PRODUCTS_SIMILAR_PRODUCTS_LOADING,
      similarProductsError: getterTypes.GET_PRODUCTS_SIMILAR_PRODUCTS_ERROR,
      cartLoading: getterTypes.GET_CART_LOADING,
    }),
  },
  methods: {
    fetchData() {
      console.log("Fetching product and similar products");
      this.$store.dispatch(actionTypes.FETCH_PRODUCT, this.$route.params.id);
      this.$store.dispatch(actionTypes.FETCH_PRODUCTS_SIMILAR_PRODUCTS, this.$route.params.id);
    },
    onRate(newRate) {
      this.newRate = newRate;
    },
    onNewCommentSend() {
      this.newCommentLoading = true;
      this.newCommentError = false;

      this.$store
        .dispatch(actionTypes.POST_PRODUCTS_RATING, {
          rating: this.newRate,
          comment: this.newComment,
        })
        .then(() => {
          this.newCommentSend = true;
        })
        .catch(() => {
          this.newCommentError = true;
        })
        .finally(() => {
          this.newCommentLoading = false;
        });
    },
    onBuyProduct() {
      this.$store.dispatch(actionTypes.POST_CART_PRODUCT, this.product);
    },
  },
  created() {
    this.fetchData();
  },
  watch: {
    similarProducts(newVal) {
      console.log("similarProducts updated:", newVal);
    },
  },
};
</script>

<style lang="scss" scoped></style>
