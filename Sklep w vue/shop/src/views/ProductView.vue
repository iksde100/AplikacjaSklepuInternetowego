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

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import { UiRating, UiLoader, UiProductTile, UiProductTileBig } from "@/components";
import * as actionTypes from "@/store/action-types";
import * as getterTypes from "@/store/getter-types";

const store = useStore();
const route = useRoute();

const newRate = ref(null);
const newComment = ref("");
const newCommentLoading = ref(false);
const newCommentSend = ref(false);
const newCommentError = ref(false);

const product = computed(() => {
  return store.getters[getterTypes.GET_PRODUCT_BY_ID](route.params.id) || {};
});

const loading = computed(() => !product.value.name);

const similarProducts = computed(
  () => store.getters[getterTypes.GET_PRODUCTS_SIMILAR_PRODUCTS_LIST]
);
const similarProductsLoading = computed(
  () => store.getters[getterTypes.GET_PRODUCTS_SIMILAR_PRODUCTS_LOADING]
);
const similarProductsError = computed(
  () => store.getters[getterTypes.GET_PRODUCTS_SIMILAR_PRODUCTS_ERROR]
);
const cartLoading = computed(() => store.getters[getterTypes.GET_CART_LOADING]);

const fetchData = () => {
  console.log("Fetching product and similar products");
  store.dispatch(actionTypes.FETCH_PRODUCT, route.params.id);
  store.dispatch(actionTypes.FETCH_PRODUCTS_SIMILAR_PRODUCTS, route.params.id);
};

const onRate = (rate) => {
  newRate.value = rate;
};

const onNewCommentSend = () => {
  newCommentLoading.value = true;
  newCommentError.value = false;

  store
    .dispatch(actionTypes.POST_PRODUCTS_RATING, {
      rating: newRate.value,
      comment: newComment.value,
    })
    .then(() => {
      newCommentSend.value = true;
    })
    .catch(() => {
      newCommentError.value = true;
    })
    .finally(() => {
      newCommentLoading.value = false;
    });
};

const onBuyProduct = () => {
  store.dispatch(actionTypes.POST_CART_PRODUCT, product.value);
};

onMounted(() => {
  fetchData();
});

watch(similarProducts, (newVal) => {
  console.log("similarProducts updated:", newVal);
});
</script>

<style lang="scss" scoped></style>
