import api from "@/api";
import { defineStore } from "pinia";
import { computed } from "vue";
export const useTodosListStore = defineStore("todosList", {
  state: () => {
    return {
      loading: false,
      todos: [],
    };
  },
  getters: {
    isLoading: (state) => {
      return computed(() => state.isLoading);
    },
    getTodos: (state) => {
      return computed(() => state.todos);
    },
  },
  actions: {
    async loadTodos() {
      if (this.loading) return;

      try {
        this.loading = true;
        const res = await api.todo.getTodos();
        console.log(res);
        this.todos = res.todos;
      } catch (err) {
        this.products = [];
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
});
