import type { Task } from "@/types/todo/task";

export interface Todo {
  id?: number;
  title: string;
  priorityId: number | null;
  description: string;
  tasks: Task[];
  taskIdsForDeleting: number[];
  createdAt?: string;
  updatedAt?: string;
}
