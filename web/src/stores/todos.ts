import api from "@/api";
import { defineStore } from "pinia";
import { computed } from "vue";
import type { Todo } from "@/types/todo/todo";
import type { Pagination } from "@/types/ui/pagination";
import type { TodosStoreState } from "@/types/todo/todosStoreState";
import { useWindowChecker } from "@/composable/useWindowChecker";

export const useTodosListStore = defineStore("todosList", {
  state: (): TodosStoreState => {
    return {
      todos: [],
      activeTodoId: null,
      pagination: {
        page: 1,
        perPage: getInitialPerPage(),
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
    getPagination: (state): Pagination => {
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

const getInitialPerPage = () => {
  const { isLargeDesktop } = useWindowChecker();
  return isLargeDesktop.value ? 12 : 6;
};
