import { defineStore } from "pinia";
import { computed } from "vue";

const checkTheme = () => {
  return JSON.parse(localStorage.getItem("isDarkTheme") || "false");
};

const initialState = {
  isDarkTheme: checkTheme(),
};

export const useThemeStore = defineStore("theme", {
  state: () => initialState,
  getters: {
    isDarkThemeFromStore: (state) => {
      return computed(() => state.isDarkTheme);
      return state.isDarkTheme;
    },
  },
  actions: {
    toggleTheme() {
      console.log("click");
      this.isDarkTheme = !this.isDarkTheme;
      localStorage.setItem("isDarkTheme", this.isDarkTheme);
    },
  },
});
