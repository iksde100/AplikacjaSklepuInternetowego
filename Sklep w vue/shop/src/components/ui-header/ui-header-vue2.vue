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
              :opened="popupOpened"
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

<script>
import * as actionTypes from "@/store/action-types";
import * as getterTypes from "@/store/getter-types";
import { mapGetters } from "vuex";
import UiPopupButton from "../ui-popup-button/ui-popup-button.vue";

export default {
  data() {
    return {
      popupOpened: false,
    };
  },
  components: {
    UiPopupButton,
  },

  computed: {
    ...mapGetters({
      user: getterTypes.GET_CURRENT_USER,
      userLoading: getterTypes.GET_CURRENT_USER_LOADING,
      cartProducts: getterTypes.GET_CART_LIST,
      cartLoading: getterTypes.GET_CART_LOADING,
      cartTotalPrice: getterTypes.GET_CART_TOTAL_PRICE,
    }),
  },
  methods: {
    logout() {
      this.$store.dispatch(actionTypes.LOGOUT).then(() => {
        this.$router.push("/login");
      });
    },
    togglePopup() {
      this.popupOpened = !this.popupOpened;
    },
    hidePopup() {
      this.popupOpened = false;
    },
    onCheckoutClick() {
      this.$router.push("/cart");
      this.hidePopup();
    },
  },
};
</script>
<style lang="scss" scoped></style>
