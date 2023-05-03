import { onUnmounted } from "vue";

export const useOnResizeAndScroll = (handler: () => any) => {
  const callback = () => {
    handler();
  };

  window.addEventListener("resize", callback);
  window.addEventListener("scroll", callback);

  onUnmounted(() => window.removeEventListener("resize", callback));
};
