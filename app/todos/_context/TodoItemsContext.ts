import { TodoItem } from "@/app/_lib/types";
import { createContext } from "react";

export const TodoItemsContext = createContext({
  todoItems: <TodoItem[]>[],
  setTodoItems: (items: TodoItem[]) => {},
});
