<template>
  <div class="rating">
    <StarRating :star-size="25" />
  </div>
</template>
<script>
import StarRating from "vue-star-rating";

export default {
  components: {
    StarRating,
  },
};
</script>
<style lang="scss" scoped></style>
