import { getPromotion, getProduct } from '@/utils/api';
import * as actionTypes from './action-types';
import * as getterTypes from './getter-types';
import * as mutationTypes from './mutation-types';

const promotions = {
  state: {
    promotionData: {},
    promotionLoading: false,
    promotionError: null,
  },
  mutations: {
    [mutationTypes.SET_PROMOTION_DATA](state, newPromotion) {
      state.promotionData = newPromotion;
    },
    [mutationTypes.SET_PROMOTION_LOADING](state, isLoading) {
      state.promotionLoading = isLoading;
    },
    [mutationTypes.SET_PROMOTION_ERROR](state, error) {
      state.promotionError = error;
    },
  },
  getters: {
    [getterTypes.GET_PROMOTION_DATA](state) {
      return state.promotionData;
    },
    [getterTypes.GET_PROMOTION_LOADING](state) {
      return state.promotionLoading;
    },
    [getterTypes.GET_PROMOTION_ERROR](state) {
      return state.promotionError;
    },
  },
  actions: {
    [actionTypes.FETCH_PROMOTION]({ state, commit, getters }, promotionId) {
      if (state.promotionLoading || state.promotionData.id === promotionId) return;

      commit(mutationTypes.SET_PROMOTION_LOADING, true);
      commit(mutationTypes.SET_PROMOTION_DATA, {});

      const handleError = () => {
        commit(mutationTypes.SET_PROMOTION_ERROR, 'Server error');
        commit(mutationTypes.SET_PROMOTION_LOADING, false);
      };

      const handlePromotion = (data) => {
        const fetchPromises = data.items.map((productId) => getProduct(productId));

        Promise.all(fetchPromises).then((values) => {
          const returnData = { ...data, items: values };

          commit(mutationTypes.SET_PROMOTION_DATA, returnData);
          commit(mutationTypes.SET_PROMOTION_LOADING, false);
        })
          .catch(handleError);
      };

      const promotionsList = getters[getterTypes.GET_PROMOTIONS_LIST];
      const promotionFromStore = promotionsList.find(
        (promotion) => promotion.id === promotionId,
      );

      if (promotionFromStore) {
        handlePromotion(promotionFromStore);
      } else {
        getPromotion(promotionId)
          .then(handlePromotion)
          .catch(handleError);
      }
    },
  },
};

export default promotions;
