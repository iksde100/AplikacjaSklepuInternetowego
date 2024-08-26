<template>
  <div class="view promotion-view montaga-regular">
    <UiLoader v-show="promotionLoading" />
    <div v-show="promotionVisible">
      <UiPromotionTile class="promotion" :promotion="promotionData" />
      <div class="container">
        <p class="description">{{ promotionData.longDescription }}</p>
        <div class="finish">Promotion ends: {{ finish }}</div>
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

<script>
import { UiLoader, UiProductTile, UiPromotionTile } from "@/components";
import moment from "moment";
import { mapGetters } from "vuex";
import * as getterTypes from "@/store/getter-types";
import * as actionTypes from "@/store/action-types";

export default {
  name: "PromotionView",
  components: {
    UiProductTile,
    UiPromotionTile,
    UiLoader,
  },
  computed: {
    ...mapGetters({
      promotionData: getterTypes.GET_PROMOTION_DATA,
      promotionLoading: getterTypes.GET_PROMOTION_LOADING,
      promotionError: getterTypes.GET_PROMOTION_ERROR,
    }),
    promotionVisible() {
      return !this.promotionLoading && !this.promotionError;
    },
    finish() {
      return (
        this.promotionData.id &&
        (this.promotionData.finishCondition ||
          moment(this.promotionData.finishDate).format("DD MM YYYY"))
      );
    },
  },
  created() {
    this.$store.dispatch(actionTypes.FETCH_PROMOTION, this.$route.params.id);
  },
};
</script>
<style lang="scss" scoped></style>
