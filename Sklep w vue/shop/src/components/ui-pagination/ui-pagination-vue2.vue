<template>
  <div class="ui-pagination montaga-regular">
    <button
      v-for="page in pages"
      :key="page"
      :class="page === value ? 'active' : ''"
      @click="onClick(page)"
    >
      {{ page }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  computed: {
    pages() {
      // Log the total pages for debugging
      console.log("Total pages:", this.totalPages);
      return [...new Array(this.totalPages)].map((e, i) => i + 1);
    },
  },
  methods: {
    onClick(whichPage) {
      // Log the clicked page for debugging
      console.log("Clicked page:", whichPage);
      if (whichPage !== this.value) {
        this.$emit("input", whichPage);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
