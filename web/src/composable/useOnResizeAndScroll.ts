import { onUnmounted } from "vue";
import lodash from "lodash";

export const useOnResizeAndScroll = (handler: () => any) => {
  const callback = lodash.throttle(() => {
    handler();
  }, 50);

  window.addEventListener("resize", callback);
  window.addEventListener("scroll", callback, { capture: true });

  onUnmounted(() => {
    window.removeEventListener("resize", callback);
    window.removeEventListener("scroll", callback);
  });
};
