import type { Todo } from "@/types/todo/todo";
import type { Pagination } from "@/types/ui/pagination";
import type { ListSettings } from "@/types/ui/listSettings";

export interface TodosStoreState {
  todos: Todo[];
  activeTodoId: number | null;
  pagination: Pagination;
  listSettings: ListSettings;
}
