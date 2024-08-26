<template>
  <div class="view montaga-regular">
    <h1>Page not found</h1>
    <p>Check out our current <router-link to="/">promotions</router-link></p>
  </div>
</template>

<script>
export default {
  name: "NotFoundView",
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montaga&display=swap");

.montaga-regular {
  font-family: "Montaga", serif;
  font-weight: 400;
  font-style: normal;
}
</style>
