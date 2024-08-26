<template>
  <div class="home-view__container montaga-regular">
    <UiLoader v-show="promotionsLoading" />
    <ServerError v-show="errorVisible" @click.native="fetchPromotions" />
    <div v-show="promotionsVisible">
      <router-link
        v-for="promotion in promotionsList"
        :to="`/promotion/${promotion.id}`"
        :key="promotion.id"
        class="promotion"
      >
        <UiPromotionTile :promotion="promotion" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { UiLoader, UiPromotionTile } from "@/components";
import ServerError from "@/components/ServerError.vue";
import * as actionTypes from "@/store/action-types";
import * as getterTypes from "@/store/getter-types";

const store = useStore();

const promotionsList = computed(() => store.getters[getterTypes.GET_PROMOTIONS_LIST]);
const promotionsLoading = computed(() => store.getters[getterTypes.GET_PROMOTIONS_LOADING]);
const promotionsError = computed(() => store.getters[getterTypes.GET_PROMOTIONS_ERROR]);

const promotionsVisible = computed(() => !promotionsLoading.value && !promotionsError.value);
const errorVisible = computed(() => !promotionsLoading.value && promotionsError.value);

const fetchPromotions = () => {
  store.dispatch(actionTypes.FETCH_PROMOTIONS);
};

onMounted(() => {
  fetchPromotions();
});
</script>

<style scoped lang="scss"></style>
