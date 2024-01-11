export enum TodoStatus {
  Todo = "Todo",
  InProgress = "In Progress",
  Done = "Done",
}

export type TodoItem = {
  id: string; // UUID
  description: string;
  status: TodoStatus;
  createdAt: Date;
};
