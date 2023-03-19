import type { Todo } from "@/types/todo/todo";
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
