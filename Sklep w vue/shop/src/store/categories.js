import { getCategories } from "@/utils/api";
import * as actionTypes from "./action-types";
import * as getterTypes from "./getter-types";
import * as mutationTypes from "./mutation-types";

const categories = {
  state: {
    categoriesList: [],
    categoriesLoading: false,
    categoriesError: null,
  },
  mutations: {
    [mutationTypes.SET_CATEGORIES_LIST](state, newList) {
      state.categoriesList = newList;
    },
    [mutationTypes.SET_CATEGORIES_LOADING](state, isLoading) {
      state.categoriesLoading = isLoading;
    },
    [mutationTypes.SET_CATEGORIES_ERROR](state, error) {
      state.categoriesError = error;
    },
  },
  getters: {
    [getterTypes.GET_CATEGORIES_LIST](state) {
      return state.categoriesList;
    },
    [getterTypes.GET_CATEGORIES_LOADING](state) {
      return state.categoriesLoading;
    },
    [getterTypes.GET_CATEGORIES_ERROR](state) {
      return state.categoriesError;
    },
  },
  actions: {
    [actionTypes.FETCH_CATEGORIES]({ state, commit }) {
      if (state.categoriesLoading || state.categoriesList.length) return;

      commit(mutationTypes.SET_CATEGORIES_LOADING, true);
      getCategories()
        .then((data) => {
          commit(mutationTypes.SET_CATEGORIES_LIST, data);
        })
        .catch(() => {
          commit(mutationTypes.SET_CATEGORIES_ERROR, "Server error");
        })
        .finally(() => {
          commit(mutationTypes.SET_CATEGORIES_LOADING, false);
        });
    },
  },
};

export default categories;
