import api from "@/api";
import { defineStore } from "pinia";
import { computed } from "vue";
export const useTodosListStore = defineStore("todosList", {
  state: () => {
    return {
      // TODO: надо ли это?
      loading: false,
      todos: [],
      activeTodoId: null,
    };
  },
  getters: {
    isLoading: (state) => {
      return computed(() => state.isLoading);
    },
    getTodos: (state) => {
      return computed(() => state.todos);
    },
    getActiveTodo: (state) => {
      return state.todos.find((todo) => todo.id === state.activeTodoId);
    },
  },
  actions: {
    async loadTodos() {
      if (this.loading) return;

      try {
        this.loading = true;
        const res = await api.todo.getTodos();

        this.todos = res.todos;
      } catch (err) {
        this.products = [];
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    setActiveTodoId(id = null) {
      this.activeTodoId = id;
    },
  },
});
