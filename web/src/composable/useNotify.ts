import { useNotificationsStore } from "@/stores/notifications.js";

export const useNotify = () => {
  const store = useNotificationsStore();

  const { addNotify: showNotify } = store;

  return { showNotify };
};
