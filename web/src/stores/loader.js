import { defineStore } from "pinia";
export const useLoaderStore = defineStore("loader", {
  state: () => {
    return {
      isLoading: false,
      minimalLoaderLivingTime: 0, // ms
    };
  },
  actions: {
    toggleLoader(isShowLoader = false) {
      isShowLoader
        ? (this.isLoading = isShowLoader)
        : setTimeout(() => {
            this.isLoading = isShowLoader;
          }, this.minimalLoaderLivingTime);
    },
  },
});
