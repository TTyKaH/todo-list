import api from "@/api";
import { defineStore } from "pinia";
import { computed } from "vue";
import type { Todo } from "@/types/todo/todo";

interface State {
  todos: Todo[];
  activeTodoId: number | null;
}

export const useTodosListStore = defineStore("todosList", {
  state: (): State => {
    return {
      todos: [],
      activeTodoId: null,
    };
  },
  getters: {
    getTodos: (state) => {
      return computed(() => state.todos);
    },
    getActiveTodo: (state) => {
      return computed((): Todo | undefined => {
        return state.todos.find((todo: Todo) => todo.id === state.activeTodoId);
      });
    },
  },
  actions: {
    // TODO: use loader and notify
    async loadTodos() {
      try {
        const res = await api.todo.getTodos();

        this.todos = res.todos;
      } catch (err) {
        console.error(err);
      }
    },
    setActiveTodoId(id: number | null = null) {
      this.activeTodoId = id;
    },
  },
});
