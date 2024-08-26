<template>
  <div id="app">
    <UiHeader />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <UiFooter />
  </div>
</template>
<!-- transition obserwuje czy elementy są dodawane, 
  zmieniane lub kasowane i w zależnoci od tego dodaje
  lub kasuje różne klasy CSS   -->

<!-- mode="out-in" najpierw jest kasowany element z animacją wyjścia,
 jak animacja się zakończy, nowy element jest dodawany z animacją wejścia. -->

<!-- mode="in-out" nowy element jest dodawany z animacja 
 wejscia, jak animacja się zakończy, aktualny element 
 jest kasowany z animacją wyjścia  -->
<script setup>
import { onBeforeMount, watch } from "vue";
import { useStore } from "vuex";
import { useRouter, onBeforeRouteUpdate } from "vue-router";
import { UiHeader, UiFooter } from "./components";
import * as actionTypes from "@/store/action-types";

const store = useStore();
const router = useRouter();

onBeforeMount(() => {
  store.dispatch(actionTypes.FETCH_CURRENT_USER);
  store.dispatch(actionTypes.FETCH_CART);
});

// Scroll to top on route change
const scrollToTop = () => {
  window.scrollTo(0, 0);
};

watch(() => router.currentRoute.value.fullPath, scrollToTop);
onBeforeRouteUpdate(scrollToTop);
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.fade-enter-active {
  animation: fadeInBlur 2s;
}

.fade-leave-active {
  animation: slideLeft 2s;
}

@keyframes fadeInBlur {
  0% {
    filter: blur(20px);
    opacity: 0;
  }
  100% {
    filter: blur(0);
    opacity: 1;
  }
}

@keyframes slideLeft {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(-200px);
  }
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
