<template>
  <div class="view promotion-view montaga-regular">
    <UiLoader v-show="promotionLoading" />
    <div v-show="promotionVisible">
      <UiPromotionTile class="promotion" :promotion="promotionData" />
      <div class="container">
        <p class="description">{{ promotionData.longDescription }}</p>
        <div class="finish">Promotion ends: {{ finish }}</div>
        <div></div>
        <div class="products">
          <UiProductTile
            v-for="product in promotionData.items"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import moment from "moment";

import { UiLoader, UiProductTile, UiPromotionTile } from "@/components";
import * as getterTypes from "@/store/getter-types";
import * as actionTypes from "@/store/action-types";

const store = useStore();
const route = useRoute();

const promotionData = computed(() => store.getters[getterTypes.GET_PROMOTION_DATA]);
const promotionLoading = computed(() => store.getters[getterTypes.GET_PROMOTION_LOADING]);
const promotionError = computed(() => store.getters[getterTypes.GET_PROMOTION_ERROR]);

const promotionVisible = computed(() => !promotionLoading.value && !promotionError.value);

const finish = computed(() => {
  return (
    promotionData.value.id &&
    (promotionData.value.finishCondition ||
      moment(promotionData.value.finishDate).format("DD MM YYYY"))
  );
});

onMounted(() => {
  store.dispatch(actionTypes.FETCH_PROMOTION, route.params.id);
});
</script>

<style lang="scss" scoped></style>
