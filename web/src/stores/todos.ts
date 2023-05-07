import api from "@/api";
import { defineStore } from "pinia";
import { computed } from "vue";
import type { Todo } from "@/types/todo/todo";
import type { Pagination } from "@/types/ui/pagination";
import type { TodosStoreState } from "@/types/todo/todosStoreState";
import { useToggleLoader } from "@/composable/useToggleLoader.js";
import { DEFAULT_PAGINATION, DEFAULT_LIST_SETTINGS } from "@/constants/index";

export const useTodosListStore = defineStore("todosList", {
  state: (): TodosStoreState => {
    return {
      todos: [],
      activeTodoId: null,
      pagination: { ...DEFAULT_PAGINATION },
      listSettings: { ...DEFAULT_LIST_SETTINGS },
    };
  },
  getters: {
    getTodos: (state) => {
      return state.todos;
    },
    getActiveTodo: (state) => {
      return state.todos.find((todo: Todo) => todo.id === state.activeTodoId);
    },
    getPagination: (state): Pagination => {
      return state.pagination;
    },
  },
  actions: {
    // TODO: use loader and notify
    async loadTodos( isNeedShowMore = false) {
      const { toggleLoader } = useToggleLoader();
      toggleLoader(true);

      try {
        // change page if need show more
        if (isNeedShowMore) {
          this.pagination.page = this.pagination.page + 1;
        }

        const res = await api.todo.getTodos({
          ...this.pagination,
          ...this.listSettings,
        });

        if (!isNeedShowMore) {
          // update list
          this.todos = res.todos;
        } else {
          // add received todos to list
          this.todos = [...this.todos,...res.todos];
        }
        this.pagination.listLength = res.pagination.listLength;
      } catch (err) {
        console.error(err);
      } finally {
        toggleLoader();
      }
    },
    clearStore() {
      this.todos = [];
      this.pagination =  { ...DEFAULT_PAGINATION }
      this.listSettings = { ...DEFAULT_LIST_SETTINGS }
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
