import { onUnmounted } from "vue";

export const useOnResize = (handler: () => any) => {
  const callback = () => {
    handler();
  };

  window.addEventListener("resize", callback);

  onUnmounted(() => window.removeEventListener("resize", callback));
};
