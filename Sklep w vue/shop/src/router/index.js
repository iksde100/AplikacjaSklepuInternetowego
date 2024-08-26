import { createRouter, createWebHistory } from "vue-router";
import {
  CartView,
  HomeView,
  PromotionView,
  LoginView,
  ProductView,
  RegisterView,
  SearchView,
  AboutView,
} from "@/views";
import { ROUTE, ROUTE_NAME, ROUTE_TITLE } from "@/constants/routes";
const routes = [
  {
    path: ROUTE.HOME,
    name: ROUTE_NAME.HOME,
    component: HomeView,
    meta: {
      title: ROUTE_TITLE.HOME,
      metatags: [{ name: "description", content: "Home page" }],
    },
  },
  {
    path: `/${ROUTE.PROMOTION}/:id`,
    name: ROUTE_NAME.PROMOTION,
    component: PromotionView,
    props: true,
    meta: {
      title: ROUTE_TITLE.PROMOTION,
    },
  },
  {
    path: `/${ROUTE.PRODUCT}/:id`,
    name: ROUTE_NAME.PRODUCT,
    component: ProductView,
    meta: {
      title: ROUTE_TITLE.PRODUCT,
    },
  },
  {
    path: ROUTE.REGISTER,
    name: ROUTE_NAME.REGISTER,
    component: RegisterView,
    meta: {
      title: ROUTE_TITLE.REGISTER,
    },
  },
  {
    path: ROUTE.LOGIN,
    name: ROUTE_NAME.LOGIN,
    component: LoginView,
    meta: {
      title: ROUTE_TITLE.LOGIN,
    },
  },
  {
    path: ROUTE.SEARCH,
    name: ROUTE_NAME.SEARCH,
    component: SearchView,
    meta: {
      title: ROUTE_TITLE.SEARCH,
    },
  },
  {
    path: ROUTE.CART,
    name: ROUTE_NAME.CART,
    component: CartView,
    meta: {
      secured: true,
      title: ROUTE_TITLE.CART,
    },
  },
  {
    path: ROUTE.ABOUT,
    name: ROUTE_NAME.ABOUT,
    component: AboutView,
    meta: {
      title: ROUTE_TITLE.ABOUT,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
