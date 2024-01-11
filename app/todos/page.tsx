"use client";

import styles from "../_css/todos.module.css";
import Column from "./_components/Column";
import { TodoItem, TodoStatus } from "../_lib/types";
import { TodoItemsContext } from "./_context/TodoItemsContext";
import { useEffect, useState } from "react";
import { useSessionStorage } from "usehooks-ts";

export default function TodosPage() {
  const storedItems = JSON.parse(window.sessionStorage.todoItems) || [];

  const [todoItems, setTodoItems] = useState<TodoItem[]>(storedItems);
  const [_, setStoredItems] = useSessionStorage<TodoItem[]>(
    "todoItems",
    storedItems
  );

  useEffect(() => setStoredItems([...todoItems]), [setStoredItems, todoItems]);

  return (
    <div className={styles.container}>
      <TodoItemsContext.Provider value={{ todoItems, setTodoItems }}>
        <Column status={TodoStatus.Todo} />
        <Column status={TodoStatus.InProgress} />
        <Column status={TodoStatus.Done} />
      </TodoItemsContext.Provider>
    </div>
  );
}
