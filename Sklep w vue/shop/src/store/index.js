import { createStore } from "vuex";
import promotions from "./promotions";
import promotion from "./promotion";
import user from "./user";

import products from "./products";
import categories from "./categories";
import cart from "./cart";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    promotions,
    promotion,
    user,
    products,
    categories,
    cart,
  },
  //zwróci błąd jeśli bede edytowala state inaczej niz za pomocą mutacji
  strict: process.env.NODE_ENV !== "production",
});

//state - tutaj dodaje wszystkie dane ze stanem początkowym
//getters
//mutations - odpowiada za funkcje zmieniające wartość ze state. Mutacje muszą być synchroniczne i w tym miejscu nie robie zapytań do servera
//actions - akcje które mogą byc asynchroniczne. Robie tutaj zapytania do serwera i modyfikujemy state za pomocą mutacji
//modules - lista modułów stora
