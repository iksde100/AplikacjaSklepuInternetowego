<template>
  <div class="view search-view montaga-regular">
    <form @submit.prevent="updateUrl" v-if="categoriesOptions.length">
      <div class="search_form">
        <input class="search_input montaga-regular" placeholder="Search by name" v-model="name" />
        <UiSelect
          label="Category:"
          :options="categoriesOptions"
          :value="category"
          @getValue="onCategoryChange"
        />
        <UiSelect label="Sort by:" :options="sortOptions" :value="sort" @getValue="onSortChange" />
        <button class="button montaga-regular" type="submit">Search</button>
      </div>
      <div class="products container">
        <UiProductTile v-for="product in products" :key="product.id" :product="product" />
      </div>
      <UiPagination v-model="page" :totalPages="totalPages" @input="onSubmit" />
      <div></div>
      <div></div>
      <UiLoader v-show="loading" background />
    </form>
  </div>
</template>

<script>
import { UiPagination, UiSelect, UiLoader, UiProductTile } from "@/components";
import { mapGetters } from "vuex";
import * as getterTypes from "@/store/getter-types";
import * as actionTypes from "@/store/action-types";

export default {
  name: "SearchView",
  components: {
    UiProductTile,
    UiLoader,
    UiPagination,
    UiSelect,
  },
  data() {
    return {
      name: this.$route.query.name || "",
      category: this.$route.query.category || "DESKTOP",
      sortOptions: [
        { label: "Name asc", value: "name_asc" },
        { label: "Name desc", value: "name_desc" },
        { label: "Price asc", value: "price_asc" },
        { label: "Price desc", value: "price_desc" },
      ],
      sort: this.$route.query.sort || "name_asc",
      page: +this.$route.query.page || 1,
      limit: 20,
    };
  },
  computed: {
    ...mapGetters({
      products: getterTypes.GET_PRODUCTS_LIST,
      productsTotal: getterTypes.GET_PRODUCTS_TOTAL,
      productsLoading: getterTypes.GET_PRODUCTS_LOADING,
      categories: getterTypes.GET_CATEGORIES_LIST,
      categoriesLoading: getterTypes.GET_CATEGORIES_LOADING,
    }),
    loading() {
      return this.productsLoading || this.categoriesLoading;
    },
    categoriesOptions() {
      if (!this.categories || typeof this.categories !== "object") {
        return [];
      }

      const categoriesArray = Object.keys(this.categories);

      return [
        ...(categoriesArray.length ? [{ label: "All", value: "ALL" }] : []),
        ...categoriesArray.map((category) => ({
          label: category.charAt(0) + category.slice(1).toLowerCase(),
          value: category,
        })),
      ];
    },
    totalPages() {
      return Math.ceil(this.productsTotal / this.limit);
    },
  },
  created() {
    this.$store.dispatch(actionTypes.FETCH_CATEGORIES).then(() => this.fetchProducts());
  },
  watch: {
    $route(to, from) {
      this.onCategoryChange(to.query.category);
    },
  },
  methods: {
    onCategoryChange(value) {
      this.name = this.$route.query.name || "";
      this.category = value || "DESKTOP";
      this.sort = this.$route.query.sort || "name_asc";
      this.page = this.$route.query.page || 1;
      console.log(value);

      this.fetchProducts();
    },
    onSortChange(value) {
      this.sort = value;
      this.fetchProducts();
    },
    updateUrl() {
      const options = {
        ...(this.name && { name: this.name }),
        ...(this.category !== "ALL" && { category: this.category }),
        ...(this.sort && { sort: this.sort }),
        page: this.page,
      };
      this.$router
        .push({
          name: "SearchView",
          query: options,
        })
        .catch(() => {});
    },
    fetchProducts() {
      const [sortColumn, sortOrder] = this.sort.split("_");

      const options = {
        ...(this.name && { name: this.name }),
        ...(this.category !== "ALL" && { category: this.category }),
        ...(this.sort && { _sort: sortColumn, _order: sortOrder }),
        _limit: this.limit,
        _page: this.page,
      };

      this.$store.dispatch(actionTypes.FETCH_PRODUCTS, options);
    },
  },
};
</script>

<style lang="scss" scoped></style>
