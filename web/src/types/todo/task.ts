export interface Task {
  id?: number;
  todoId?: number;
  status: boolean;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface taskForDeleting {
  id: number | null;
  idx: number;
}
