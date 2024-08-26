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

<script>
import * as actionTypes from "@/store/action-types";
import * as getterTypes from "@/store/getter-types";
import { mapGetters } from "vuex";

import { UiLoader, UiPromotionTile } from "@/components";
import ServerError from "@/components/ServerError.vue";
export default {
  name: "Home",
  components: {
    UiPromotionTile,
    UiLoader,
    ServerError,
  },
  computed: {
    ...mapGetters({
      promotionsList: getterTypes.GET_PROMOTIONS_LIST,
      promotionsLoading: getterTypes.GET_PROMOTIONS_LOADING,
      promotionsError: getterTypes.GET_PROMOTIONS_ERROR,
    }),
    promotionsVisible() {
      return !this.promotionsLoading && !this.promotionsError;
    },
    errorVisible() {
      return !this.promotionsLoading && this.promotionsError;
    },
  },
  created() {
    this.fetchPromotions();
  },
  methods: {
    fetchPromotions() {
      this.$store.dispatch(actionTypes.FETCH_PROMOTIONS);
    },
  },
};
</script>
<style scoped lang="scss"></style>
