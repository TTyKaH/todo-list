import type { Todo } from "@/types/todo/todo";
import type { Task } from "@/types/todo/task";
import type { SelectOption } from "@/types/ui/selectOption";

export const TODO_DEFAULT_FORM_VALUE: Todo = {
  title: "",
  priority: "",
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

export const priorities: SelectOption[] = [
  {
    text: "Low",
    value: "low",
  },
  {
    text: "Middle",
    value: "middle",
  },
  {
    text: "Hight",
    value: "hight",
  },
];
