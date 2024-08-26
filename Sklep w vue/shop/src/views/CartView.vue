<template>
  <div class="cart_view__container view container cart-view montaga-regular">
    <transition name="slide-fade" mode="out-in">
      <div>
        <div v-if="!paymentCompleted" key="payment">
          <p>Step: {{ step }} / 3</p>
          <div class="slider">
            <div :style="{ left }">
              <section v-if="step === 1">
                <h2>Cart</h2>
                <template v-if="cartProducts.length">
                  <p>Confirm your product list</p>
                  <ul class="products-list">
                    <li
                      v-for="({ id, image, name, price }, index) in cartProducts"
                      :key="`${id}${index}`"
                    >
                      <div class="products-list__image" :style="getImageStyle(image)"></div>
                      <h3 class="products-list__name">
                        <router-link :to="`/product/${id}`">{{ name }}</router-link>
                      </h3>
                      <h3 class="products-list__price">{{ price }}$</h3>
                      <button
                        class="cart_button montaga-regular"
                        @click="() => onRemoveCartProductClick(id)"
                        :disabled="cartLoading"
                      >
                        Remove
                      </button>
                    </li>
                    <li>
                      <h3>Total: {{ cartTotalPrice }}$</h3>
                    </li>
                  </ul>
                </template>
                <template v-if="!cartProducts.length">
                  <p>You have no products in the cart</p>
                </template>
              </section>
              <section v-if="step === 2">
                <h2>Delivery</h2>
                <p>Tell us where to deliver your products</p>
                <div class="delivery-form montaga-regular">
                  <UiInput v-model="fullname" label="Fullname" placeholder="John Doe" />
                  <UiInput v-model="address" label="Address" placeholder="Street 20/20" />
                  <UiInput v-model="city" label="City" placeholder="Warsaw" :error="errors.city" />
                  <UiInput
                    v-model="phoneNumber"
                    label="Phone number"
                    placeholder="111222333"
                    type="number"
                  />
                </div>
              </section>
              <section v-if="step === 3">
                <h2>Payment</h2>
                <p>Choose desirable payment methods</p>
                <button class="buttons montaga-regular" @click="pay" :disabled="paymentLoading">
                  <template v-if="!paymentLoading">Outside payment</template>
                  <template v-if="paymentLoading"><AppLoader small /></template>
                </button>
              </section>
            </div>
          </div>
          <div>
            <button
              class="buttons montaga-regular"
              @click="onPreviousStepClick"
              :disabled="previousDisabled"
            >
              Back
            </button>
            <button
              class="buttons montaga-regular"
              @click="onNextStepClick"
              :disabled="nextDisabled"
              type="submit"
            >
              Next
            </button>
          </div>
          <UiLoader v-show="cartLoading" />
        </div>
        <div v-else key="thanks">
          <h2>Thank you</h2>
          <p>Your purchase is completed. We have sent you details via email.</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { UiLoader, UiInput } from "@/components";
import * as actionTypes from "@/store/action-types";
import * as getterTypes from "@/store/getter-types";

const store = useStore();
const router = useRouter();

const step = ref(1);
const fullname = ref("");
const address = ref("");
const city = ref("");
const phoneNumber = ref(null);
const errors = ref({});
const paymentLoading = ref(false);
const paymentCompleted = ref(false);

const cartProducts = computed(() => store.getters[getterTypes.GET_CART_LIST]);
const cartLoading = computed(() => store.getters[getterTypes.GET_CART_LOADING]);
const cartTotalPrice = computed(() => store.getters[getterTypes.GET_CART_TOTAL_PRICE]);

const left = computed(() => `${-(step.value - 1) * 100}%`);
const previousDisabled = computed(() => cartLoading.value || step.value <= 1);
const nextDisabled = computed(
  () => cartLoading.value || step.value >= 3 || !cartProducts.value.length
);

const onPreviousStepClick = () => {
  if (step.value > 1) {
    step.value -= 1;
  }
};

const onNextStepClick = () => {
  if (step.value < 3) {
    step.value += 1;
  }
};

const getImageStyle = (image) => {
  return {
    background: `url(${require(`@/assets/${image}`)}) center center / contain no-repeat, #eee`,
  };
};

const onRemoveCartProductClick = (productId) => {
  store.dispatch(actionTypes.DELETE_CART_PRODUCT, productId);
};

const pay = () => {
  paymentLoading.value = true;

  const paymentDetails = {
    fullname: fullname.value,
    address: address.value,
    city: city.value,
    phoneNumber: phoneNumber.value,
  };

  store.dispatch(actionTypes.POST_CART_PAYMENT, paymentDetails).then(() => {
    paymentLoading.value = false;
    paymentCompleted.value = true;
  });
};
</script>

<style scoped lang="scss"></style>
