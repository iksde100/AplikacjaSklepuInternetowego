<template>
  <div :style="containerStyle" class="promotion-tile montaga-regular">
    <h3>{{ promotion.header }}</h3>
    <p>{{ promotion.description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    promotion: Object,
  },
  computed: {
    containerStyle() {
      const { image, colorFrom, colorTo, color } = this.promotion;
      let imageUrl;

      try {
        imageUrl = require(`@/assets/${image}`);
      } catch (e) {} // eslint-disable-line
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
    },
  },
};
</script>

<style lang="scss" scoped></style>
