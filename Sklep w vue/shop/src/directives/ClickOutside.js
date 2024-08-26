/* eslint no-underscore-dangle: 0, no-param-reassign: 0 */
const ClickOutside = {
  bind(el, binding, vnode) {
    const handler = (e) => {
      const popup = vnode.context.popupItem;

      if (!(popup && popup.contains(e.target)) && !(el && el.contains(e.target))) {
        binding.value(e);
      }
    };

    el.__vueClickOutisde = {
      handler,
    };

    document.addEventListener("click", handler);
  },
  unbind(el) {
    document.removeEventListener("click", el.__vueClickOutisde.handler);
  },
};

export default ClickOutside;
