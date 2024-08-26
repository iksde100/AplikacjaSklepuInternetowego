import { getProducts, getProduct, getSimilarProducts, postRating } from "@/utils/api";
import * as actionTypes from "./action-types";
import * as getterTypes from "./getter-types";
import * as mutationTypes from "./mutation-types";

const products = {
  state: {
    productsList: [],
    productsLoading: false,
    productsError: null,
    productsTotal: 0,
    similarProducts: {
      list: [],
      error: null,
      loading: false,
    },
  },
  mutations: {
    [mutationTypes.SET_PRODUCTS_LIST](state, newList) {
      state.productsList = newList;
    },
    [mutationTypes.SET_PRODUCTS_LOADING](state, isLoading) {
      state.productsLoading = isLoading;
    },
    [mutationTypes.SET_PRODUCTS_ERROR](state, error) {
      state.productsError = error;
    },
    [mutationTypes.SET_PRODUCTS_TOTAL](state, newTotal) {
      state.productsTotal = newTotal;
    },
    [mutationTypes.SET_PRODUCTS_SIMILAR_PRODUCTS_LIST](state, newList) {
      state.similarProducts.list = newList;
    },
    [mutationTypes.SET_PRODUCTS_SIMILAR_PRODUCTS_LOADING](state, isLoading) {
      state.similarProducts.loading = isLoading;
    },
    [mutationTypes.SET_PRODUCTS_SIMILAR_PRODUCTS_ERROR](state, error) {
      state.similarProducts.error = error;
    },
  },
  getters: {
    [getterTypes.GET_PRODUCTS_LIST](state) {
      return state.productsList;
    },
    [getterTypes.GET_PRODUCTS_LOADING](state) {
      return state.productsLoading;
    },
    [getterTypes.GET_PRODUCTS_ERROR](state) {
      return state.productsError;
    },
    [getterTypes.GET_PRODUCTS_TOTAL](state) {
      return state.productsTotal;
    },

    [getterTypes.GET_PRODUCT_BY_ID]: (state) => (productId) =>
      state.productsList.find((product) => product.id === productId),

    [getterTypes.GET_PRODUCTS_SIMILAR_PRODUCTS_LIST](state) {
      return state.similarProducts.list;
    },
    [getterTypes.GET_PRODUCTS_SIMILAR_PRODUCTS_LOADING](state) {
      return state.similarProducts.loading;
    },
    [getterTypes.GET_PRODUCTS_SIMILAR_PRODUCTS_ERROR](state) {
      return state.similarProducts.error;
    },
  },
  actions: {
    [actionTypes.FETCH_PRODUCT]({ state, commit, getters }, productId) {
      if (getters.GET_PRODUCT_BY_ID(productId)) return;
      getProduct(productId).then((newProduct) => {
        commit(mutationTypes.SET_PRODUCTS_LIST, [...state.productsList, newProduct]);
      });
    },
    [actionTypes.FETCH_PRODUCTS]({ commit }, options) {
      commit(mutationTypes.SET_PRODUCTS_LOADING, true);
      commit(mutationTypes.SET_PRODUCTS_LIST, []);

      getProducts(options)
        .then((data) => {
          if (!options || !Object.keys(options).lenght) {
            commit(mutationTypes.SET_PRODUCTS_LIST, data);
          } else {
            const { list, total } = data;
            commit(mutationTypes.SET_PRODUCTS_LIST, list);
            commit(mutationTypes.SET_PRODUCTS_LIST, total);
          }
        })
        .catch(() => {
          commit(mutationTypes.SET_PRODUCTS_ERROR, "Server error");
        })
        .finally(() => {
          commit(mutationTypes.SET_PRODUCTS_LOADING, false);
        });
    },
    [actionTypes.FETCH_PRODUCTS_SIMILAR_PRODUCTS]({ state, commit }, productId) {
      commit(mutationTypes.SET_PRODUCTS_SIMILAR_PRODUCTS_LIST, []);
      commit(mutationTypes.SET_PRODUCTS_SIMILAR_PRODUCTS_LOADING, true);
      commit(mutationTypes.SET_PRODUCTS_SIMILAR_PRODUCTS_ERROR, null);

      getSimilarProducts(productId)
        .then((data) => {
          commit(mutationTypes.SET_PRODUCTS_SIMILAR_PRODUCTS_LIST, data);
        })
        .catch(() => {
          commit(mutationTypes.SET_PRODUCTS_SIMILAR_PRODUCTS_ERROR, "Server Error");
        })
        .finally(() => {
          commit(mutationTypes.SET_PRODUCTS_SIMILAR_PRODUCTS_LOADING, false);
        });
    },
    [actionTypes.POST_PRODUCTS_RATING](conitext, { rating, comment }) {
      return postRating(rating, comment);
    },
  },
};

export default products;
