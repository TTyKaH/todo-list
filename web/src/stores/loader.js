import { defineStore } from "pinia";
export const useLoaderStore = defineStore("loader", {
  state: () => {
    return {
      isLoading: false,
    };
  },
  actions: {
    toggleLoader(isShowLoader = false) {
      isShowLoader
        ? (this.isLoading = isShowLoader)
        : setTimeout(() => {
            this.isLoading = isShowLoader;
          }, 500);
    },
  },
});
