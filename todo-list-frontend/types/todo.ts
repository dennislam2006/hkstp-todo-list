export interface TodoList {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt?: Date;
  priority: TodoPriority;
}

export enum TodoPriority {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
}
