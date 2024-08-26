<template>
  <nav class="the-header montaga-regular">
    <div class="the-header__items container">
      <router-link class="button montaga-regular" to="/">Home</router-link>
      <router-link class="button montaga-regular" to="/search">Search</router-link>
      <router-link class="button montaga-regular" to="/about">About</router-link>
      <div class="the-header__actions">
        <div class="auth_button montaga-regular">
          <router-link
            class="button button_login montaga-regular"
            v-show="!user && !userLoading"
            to="/login"
            tag="button"
            >Login</router-link
          >
          <router-link
            class="button button_register montaga-regular"
            v-show="!user && !userLoading"
            to="/register"
            tag="button"
            >Register</router-link
          >
        </div>
        <div class="user_menu montaga-regular">
          <div v-show="userLoading">Loading</div>
          <div v-show="user">{{ user && user.name }}</div>
          <div v-if="user" class="the-header__action">
            <UiPopupButton
              :disabled="cartLoading"
              :opened="popupOpenedRef"
              @onToggle="togglePopup"
              @onHide="hidePopup"
            >
              <template v-slot:button>
                <button class="button montaga-regular" :disabled="cartLoading">
                  <template v-if="!cartLoading">{{ cartProducts.length }} items</template>
                </button>
              </template>
              <template v-slot:popup>
                <div class="the-header__action-dropdown">
                  <template v-if="cartProducts.length">
                    <ul class="the-header__cart-products montaga-regular">
                      <li
                        v-for="({ id, name, price }, index) in cartProducts"
                        :key="`${id}${index}`"
                      >
                        <div>{{ name }}</div>
                        <div>{{ price }}$</div>
                      </li>
                      <li>
                        <div>Total:</div>
                        <div>{{ cartTotalPrice }}$</div>
                      </li>
                    </ul>
                    <button class="button montaga-regular" @click="onCheckoutClick">
                      Checkout
                    </button>
                  </template>
                  <template v-if="!cartProducts.length">
                    <p>If you add something to cart, you can see it here</p>
                  </template>
                </div>
              </template>
            </UiPopupButton>
          </div>

          <button class="button montaga-regular" v-show="user && !userLoading" @click="logout">
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import * as actionTypes from "@/store/action-types";
import * as getterTypes from "@/store/getter-types";
import UiPopupButton from "../ui-popup-button/ui-popup-button.vue";

const store = useStore();
const router = useRouter();

const popupOpenedRef = ref(false);

const user = computed(() => store.getters[getterTypes.GET_CURRENT_USER]);
const userLoading = computed(() => store.getters[getterTypes.GET_CURRENT_USER_LOADING]);
const cartProducts = computed(() => store.getters[getterTypes.GET_CART_LIST]);
const cartLoading = computed(() => store.getters[getterTypes.GET_CART_LOADING]);
const cartTotalPrice = computed(() => store.getters[getterTypes.GET_CART_TOTAL_PRICE]);

const logout = () => {
  store.dispatch(actionTypes.LOGOUT).then(() => {
    router.push("/login");
  });
};

const togglePopup = () => {
  popupOpenedRef.value = !popupOpenedRef.value;
};

const hidePopup = () => {
  popupOpenedRef.value = false;
};

const onCheckoutClick = () => {
  router.push("/cart");
  hidePopup();
};
</script>
