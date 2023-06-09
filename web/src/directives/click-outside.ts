export const clickOutside = {
  // @ts-ignore
  beforeMount: (el, binding) => {
    // @ts-ignore
    el.clickHandler = (event) => {
      if (!(el == event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.addEventListener("click", el.clickHandler);
  },
  // @ts-ignore
  unmounted: (el) => {
    document.removeEventListener("click", el.clickHandler);
  },
};
