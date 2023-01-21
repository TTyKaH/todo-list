import { defineStore } from "pinia";
export const useLoaderStore = defineStore("loader", {
  state: () => {
    return {
      isLoading: false,
    };
  },
  actions: {
    toggleLoader(isRotate = false) {
      this.isLoading = isRotate;
    },
  },
});
