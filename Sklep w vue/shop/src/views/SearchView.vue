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
      <UiLoader v-show="loading" background />
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { UiPagination, UiSelect, UiLoader, UiProductTile } from "@/components";
import * as getterTypes from "@/store/getter-types";
import * as actionTypes from "@/store/action-types";

const route = useRoute();
const router = useRouter();
const store = useStore();

const name = ref(route.query.name || "");
const category = ref(route.query.category || "DESKTOP");
const sort = ref(route.query.sort || "name_asc");
const page = ref(Number(route.query.page) || 1);
const limit = 20;

const sortOptions = [
  { label: "Name asc", value: "name_asc" },
  { label: "Name desc", value: "name_desc" },
  { label: "Price asc", value: "price_asc" },
  { label: "Price desc", value: "price_desc" },
];

const products = computed(() => store.getters[getterTypes.GET_PRODUCTS_LIST]);
const productsTotal = computed(() => store.getters[getterTypes.GET_PRODUCTS_TOTAL]);
const productsLoading = computed(() => store.getters[getterTypes.GET_PRODUCTS_LOADING]);
const categories = computed(() => store.getters[getterTypes.GET_CATEGORIES_LIST]);
const categoriesLoading = computed(() => store.getters[getterTypes.GET_CATEGORIES_LOADING]);

const loading = computed(() => productsLoading.value || categoriesLoading.value);

const categoriesOptions = computed(() => {
  if (!categories.value || typeof categories.value !== "object") {
    return [];
  }

  const categoriesArray = Object.keys(categories.value);

  return [
    ...(categoriesArray.length ? [{ label: "All", value: "ALL" }] : []),
    ...categoriesArray.map((category) => ({
      label: category.charAt(0) + category.slice(1).toLowerCase(),
      value: category,
    })),
  ];
});

const totalPages = computed(() => Math.ceil(productsTotal.value / limit));

const fetchProducts = () => {
  const [sortColumn, sortOrder] = sort.value.split("_");

  const options = {
    ...(name.value && { name: name.value }),
    ...(category.value !== "ALL" && { category: category.value }),
    ...(sort.value && { _sort: sortColumn, _order: sortOrder }),
    _limit: limit,
    _page: page.value,
  };

  store.dispatch(actionTypes.FETCH_PRODUCTS, options);
};

const updateUrl = () => {
  const options = {
    ...(name.value && { name: name.value }),
    ...(category.value !== "ALL" && { category: category.value }),
    ...(sort.value && { sort: sort.value }),
    page: page.value,
  };

  router.push({ name: "SearchView", query: options }).catch(() => {});
};

const onCategoryChange = (value) => {
  name.value = route.query.name || "";
  category.value = value || "DESKTOP";
  sort.value = route.query.sort || "name_asc";
  page.value = route.query.page || 1;

  fetchProducts();
};

const onSortChange = (value) => {
  sort.value = value;
  fetchProducts();
};

watch(
  () => route.query,
  (newQuery) => {
    onCategoryChange(newQuery.category);
  },
  { immediate: true }
);

onMounted(() => {
  store.dispatch(actionTypes.FETCH_CATEGORIES).then(() => fetchProducts());
});
</script>

<style lang="scss" scoped></style>
