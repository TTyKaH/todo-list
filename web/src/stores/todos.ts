import api from "@/api";
import { defineStore } from "pinia";
import { computed } from "vue";
import type { Todo } from "@/types/todo/todo";
import type { Pagination } from "@/types/ui/pagination";
import type { ListSettings } from "@/types/ui/listSettings";

interface State {
  todos: Todo[];
  activeTodoId: number | null;
  pagination: Pagination;
  listSettings: ListSettings;
}

export const useTodosListStore = defineStore("todosList", {
  state: (): State => {
    return {
      todos: [],
      activeTodoId: null,
      pagination: {
        page: 1,
        perPage: 6,
        listLength: 0,
      },
      listSettings: {
        search: "",
        priorityId: null,
      },
    };
  },
  getters: {
    getTodos: (state) => {
      return computed<Todo[]>(() => state.todos);
    },
    getActiveTodo: (state) => {
      return state.todos.find((todo: Todo) => todo.id === state.activeTodoId);
    },
    getPagination: (state) => {
      return state.pagination;
    },
  },
  actions: {
    // TODO: use loader and notify
    async loadTodos() {
      try {
        const res = await api.todo.getTodos({
          ...this.pagination,
          ...this.listSettings,
        });

        this.todos = res.todos;
        this.pagination.listLength = res.pagination.listLength;
      } catch (err) {
        console.error(err);
      }
    },
    setActiveTodoId(id: number | null = null) {
      this.activeTodoId = id;
    },
    async setPaginationSetting(
      settingName: "page" | "perPage",
      settingValue: number
    ) {
      this.pagination[settingName] = settingValue;
      await this.loadTodos();
    },
    async setListSetting(
      settingName: "search" | "priorityId",
      value: string | number | null
    ) {
      this.listSettings[settingName] = value;
      this.pagination.page = 1;
      await this.loadTodos();
    },
  },
});
