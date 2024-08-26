import { login, logout, getCurrentUser } from "@/utils/api";
import * as actionTypes from "./action-types";
import * as getterTypes from "./getter-types";
import * as mutationTypes from "./mutation-types";

const user = {
  state: {
    userData: null,
    userLoading: false,
  },
  mutations: {
    [mutationTypes.SET_CURRENT_USER](state, userData) {
      state.userData = userData;
    },
    [mutationTypes.SET_CURRENT_USER_LOADING](state, isLoading) {
      state.userLoading = isLoading;
    },
  },
  getters: {
    [getterTypes.GET_CURRENT_USER](state) {
      return state.userData;
    },
    [getterTypes.GET_CURRENT_USER_LOADING](state) {
      return state.userLoading;
    },
  },
  actions: {
    [actionTypes.LOGIN]({ commit }, { email, password }) {
      commit(mutationTypes.SET_CURRENT_USER_LOADING, true);
      login({ email, password })
        .then((userData) => {
          commit(mutationTypes.SET_CURRENT_USER, userData);
        })
        .finally(() => {
          commit(mutationTypes.SET_CURRENT_USER_LOADING, false);
        });
    },
    [actionTypes.LOGOUT]({ commit }) {
      commit(mutationTypes.SET_CURRENT_USER, null);
      return logout();
    },
    [actionTypes.FETCH_CURRENT_USER]({ commit, getters }) {
      if (getters.GET_CURRENT_USER) {
        return Promise.resolve();
      }
      commit(mutationTypes.SET_CURRENT_USER_LOADING, true);
      return getCurrentUser()
        .then((userData) => {
          commit(mutationTypes.SET_CURRENT_USER, userData);
        })
        .finally(() => {
          commit(mutationTypes.SET_CURRENT_USER_LOADING, false);
        });
    },
  },
};

export default user;
