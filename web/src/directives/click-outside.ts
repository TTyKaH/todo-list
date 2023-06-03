export const clickOutside = {
  beforeMount: (el, binding) => {
    el.clickHandler = (event) => {
      if (!(el == event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.addEventListener("click", el.clickHandler);
  },
  unmounted: (el) => {
    document.removeEventListener("click", el.clickHandler);
  },
};
