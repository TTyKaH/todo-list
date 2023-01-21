import { defineStore } from "pinia";
import { computed } from "vue";
export const useNotificationsStore = defineStore("notifications", {
  state: () => {
    return {
      notifications: [
        {
          message: "error",
          type: "error",
        },
        {
          message: "success",
          type: "success",
        },
        {
          message: "neutral",
          type: "neutral",
        },
      ],
    };
  },
  getters: {
    getNotifications: (state) => {
      return computed(() => state.notifications);
    },
  },
  actions: {
    addNotify() {},
  },
});
