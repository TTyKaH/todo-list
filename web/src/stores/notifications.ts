import { defineStore } from "pinia";
import { computed } from "vue";
import type { Notification } from "@/types/ui/notification";

interface State {
  notifications: Notification[];
  lastAddedId: LastId;
  notifyLivingTime: NotificationLivingTime;
}

type LastId = null | number;

type NotificationLivingTime = number;

export const useNotificationsStore = defineStore("notifications", {
  state: (): State => {
    return {
      notifications: [
        // {
        //   message: "error",
        //   type: "error",
        //   id: 0,
        // },
        // {
        //   message: "success",
        //   type: "success",
        //   id: 0,
        // },
        // {
        //   message: "neutral",
        //   type: "neutral",
        //   id: 0,
        // },
      ],
      lastAddedId: null,
      notifyLivingTime: 4000, // ms
    };
  },
  getters: {
    getNotifications: (state) => {
      return computed<Notification[]>(() => state.notifications);
    },
  },
  actions: {
    addNotify(type: string, message: string) {
      // чистим значение последнего индекса, если в очереди нет уведомлений
      if (!this.notifications.length) {
        this.lastAddedId = null;
      }
      // если в пуле нет уведомлений, то первому присваиваем нулевой индекс
      if (!this.lastAddedId) {
        this.lastAddedId = 0;
      }

      // увеличиваем индекс и пушим уведомление
      if (this.lastAddedId) {
        this.lastAddedId++;
      }
      this.notifications.push({
        message: message,
        type: type,
        id: this.lastAddedId,
      });

      this.setDelayedDeletion(this.lastAddedId);
    },
    setDelayedDeletion(id: number) {
      setTimeout(() => {
        const elementIdx = this.notifications.findIndex(
          (notification) => notification.id === id
        );
        this.notifications.splice(elementIdx, 1);
      }, this.notifyLivingTime);
    },
  },
});
