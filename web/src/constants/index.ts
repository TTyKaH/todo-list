import type { Todo } from "@/types/todo/todo";
import type { Task } from "@/types/todo/task";
import type { SelectOption } from "@/types/ui/selectOption";
import type { Pagination } from "@/types/ui/pagination";
import { getInitialPerPage } from "@/utils/index"

export const TODO_DEFAULT_FORM_VALUE: Todo = {
  title: "",
  priorityId: null,
  description: "",
  tasks: [
    {
      description: "",
      status: false,
    },
  ],
  taskIdsForDeleting: [],
};

export const TASK_FIELDS: Task = {
  status: false,
  description: "",
};

export const PRIORITIES: SelectOption[] = [
  {
    id: 1,
    value: "low",
  },
  {
    id: 2,
    value: "middle",
  },
  {
    id: 3,
    value: "hight",
  },
];

export const DEFAULT_LIST_SETTINGS = {
  search: "",
  priorityId: null,
};

export const DEFAULT_PAGINATION: Pagination = {
  page: 1,
  perPage: getInitialPerPage(),
  listLength: 0,
};

export const PER_PAGE_OPTIONS: SelectOption[] = [
  {
    id: 1,
    value: 6,
  },
  {
    id: 2,
    value: 12,
  },
  {
    id: 3,
    value: 18,
  },
  {
    id: 4,
    value: 24,
  },
];

export const PER_PAGE_OPTIONS_LARGE: SelectOption[] = [
  {
    id: 1,
    value: 12,
  },
  {
    id: 2,
    value: 16,
  },
  {
    id: 3,
    value: 20,
  },
  {
    id: 4,
    value: 24,
  },
];
