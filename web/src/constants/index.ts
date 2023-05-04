import type { Todo } from "@/types/todo/todo";
import type { Task } from "@/types/todo/task";
import type { SelectOption } from "@/types/ui/selectOption";

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
    value: 8,
  },
  {
    id: 2,
    value: 12,
  },
  {
    id: 3,
    value: 16,
  },
  {
    id: 4,
    value: 20,
  },
  {
    id: 5,
    value: 24,
  },
];
