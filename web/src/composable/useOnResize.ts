import { onUnmounted } from "vue";

export const useOnResize = (handler: () => any) => {
  const callback = () => {
    console.log("1");
    handler();
  };

  window.addEventListener("resize", callback);

  onUnmounted(() => window.removeEventListener("resize", callback));
};
