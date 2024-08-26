import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import * as getterTypes from "./store/getter-types";
import * as actionTypes from "./store/action-types";
import "@/styles/main.scss";

router.beforeEach(
  (to, from, next) =>
    new Promise(() => {
      const securedRoute = to.matched.find((record) => record.meta.secured);

      const onFail = () => {
        next({
          name: "LoginView",
          params: { nextUrl: to.fullPath },
        });
      };

      if (securedRoute) {
        store
          .dispatch(actionTypes.FETCH_CURRENT_USER)
          .then(() => {
            const currentUser = store.getters[getterTypes.GET_CURRENT_USER];
            const { requiredRole } = securedRoute.meta;

            if (requiredRole && currentUser.role !== requiredRole) {
              onFail();
            } else {
              next();
            }
          })
          .catch(onFail);
      } else {
        next();
      }
    })
);

//router guard jest to funkcja wykonywana przed
//przejściem do następnego widoku, w tym widoku początkowego
router.beforeEach((to, from, next) => {
  const matchedRoutes = to.matched.slice().reverse();
  const nearestWithTitle = matchedRoutes.find((r) => r.meta && r.meta.title);
  const nearestWithMetatags = matchedRoutes.find((r) => r.meta && r.meta.metatags);

  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  }

  [...document.querySelectorAll("[data-metatag]")].map((el) => el.parentNode.removeChild(el));

  if (!nearestWithMetatags) {
    return next();
  }

  nearestWithMetatags.meta.metatags.forEach((tagDef) => {
    const tag = document.createElement("meta");

    Object.entries(tagDef).forEach(([tagName, tagContent]) => {
      tag.setAttribute(tagName, tagContent);
    });

    tag.setAttribute("data-metatag", "");

    document.head.appendChild(tag);
  });

  return next();
});

createApp(App).use(store).use(router).mount("#app");
