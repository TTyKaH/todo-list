import type { Task } from "@/types/todo/task";

export interface Todo {
  id?: number;
  title: string;
  priority: string;
  description: string;
  tasks: Task[];
  createdAt?: string;
  updatedAt?: string;
}