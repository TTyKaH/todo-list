export interface Task {
  id?: number;
  todoId?: number;
  status: boolean;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskForAction {
  id: number | null;
  idx: number;
}

export interface DataForAddingTaskWithPosition {
  type: "id" | "idx";
  value: number | null;
}
