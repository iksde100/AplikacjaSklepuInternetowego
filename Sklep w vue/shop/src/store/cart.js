import { getCart, postCartProduct, deleteCartProduct, postCartPayment } from "@/utils/api";
import * as actionTypes from "./action-types";
import * as getterTypes from "./getter-types";
import * as mutationTypes from "./mutation-types";
const cart = {
  state: {
    cartList: [],
    cartLoading: false,
    cartError: null,
  },
  mutations: {
    [mutationTypes.SET_CART_LIST](state, newPromotion) {
      state.cartList = newPromotion;
    },
    [mutationTypes.SET_CART_LOADING](state, isLoading) {
      state.cartLoading = isLoading;
    },
    [mutationTypes.SET_CART_ERROR](state, error) {
      state.cartError = error;
    },
  },
  getters: {
    [getterTypes.GET_CART_LIST](state) {
      return state.cartList;
    },
    [getterTypes.GET_CART_LOADING](state) {
      return state.cartLoading;
    },
    [getterTypes.GET_CART_ERROR](state) {
      return state.cartError;
    },
    [getterTypes.GET_CART_TOTAL_PRICE](state) {
      return state.cartList.reduce((price, product) => price + product.price, 0);
    },
  },
  actions: {
    [actionTypes.FETCH_CART]({ commit }) {
      commit(mutationTypes.SET_CART_LOADING, true);
      getCart()
        .then((data) => {
          commit(mutationTypes.SET_CART_LIST, data.products);
        })
        .catch(() => {
          commit(mutationTypes.SET_CART_ERROR, "Server error");
        })
        .finally(() => {
          commit(mutationTypes.SET_CART_LOADING, false);
        });
    },
    [actionTypes.POST_CART_PRODUCT]({ state, commit }, product) {
      commit(mutationTypes.SET_CART_LOADING, true);
      postCartProduct(product)
        .then(() => {
          commit(mutationTypes.SET_CART_LIST, [...state.cartList, product]);
        })
        .catch(() => {
          commit(mutationTypes.SET_CART_ERROR, "Server error");
        })
        .finally(() => {
          commit(mutationTypes.SET_CART_LOADING, false);
        });
    },
    [actionTypes.DELETE_CART_PRODUCT]({ state, commit }, productId) {
      commit(mutationTypes.SET_CART_LOADING, true);
      deleteCartProduct(productId)
        .then(() => {
          const productIndex = state.cartList.findIndex(({ id }) => id === productId);
          if (productIndex > -1) {
            commit(
              mutationTypes.SET_CART_LIST,
              state.cartList.filter((_, index) => index !== productIndex)
            );
          }
        })
        .catch(() => {
          commit(mutationTypes.SET_CART_ERROR, "Server error");
        })
        .finally(() => {
          commit(mutationTypes.SET_CART_LOADING, false);
        });
    },
    [actionTypes.POST_CART_PAYMENT]({ commit }, details) {
      commit(mutationTypes.SET_CART_LOADING, true);
      postCartPayment(details)
        .then(() => {
          commit(mutationTypes.SET_CART_LIST, []);
        })
        .catch(() => {
          commit(mutationTypes.SET_CART_ERROR, "Server error");
        })
        .finally(() => {
          commit(mutationTypes.SET_CART_LOADING, false);
        });
    },
  },
};

export default cart;
