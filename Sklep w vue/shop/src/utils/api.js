import axios from "axios";

const MAX_DELAY = 2500;

const get = (url) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(url)
        .then((response) => {
          const total = response.headers["x-total-count"];
          if (total) {
            resolve({ list: response.data, total: parseInt(total, 10) });
          } else {
            resolve(response.data);
          }
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    }, Math.random() * MAX_DELAY);
  });

const getPromotions = () => get("/promotions");

const getPromotion = (promotionId) => get(`/promotions/${promotionId}`);

const getProduct = (productId) => get(`/products/${productId}`);

const postUser = () => get("/promotions");

const getCurrentUser = () => get("/currentUser");
const login = () => get("/currentUser");
const logout = () => get("/currentUser");

const getProducts = (options = {}) => {
  const parsedOptions = Object.entries(options).map((option) => `${option[0]}=${option[1]}`);
  return get(`/products?${parsedOptions.join("&")}`);
};
const getCategories = () => get("/categories");

const getSimilarProducts = () => get("/similarProducts");
const postRating = () => get("/categories");
const getCart = () => get("/cart");

const postCartProduct = () => get("/categories");

const deleteCartProduct = () => get("/categories");

const postCartPayment = () => get("/categories");

export {
  getPromotions,
  getPromotion,
  getProduct,
  postUser,
  getCurrentUser,
  login,
  logout,
  getProducts,
  getCategories,
  getSimilarProducts,
  postRating,
  getCart,
  postCartProduct,
  deleteCartProduct,
  postCartPayment,
};
