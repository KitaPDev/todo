import { AddBox } from "@mui/icons-material";
import { Card, IconButton } from "@mui/material";
import styles from "../../_css/todos.module.css";
import NewTodoItemCard from "./NewTodoItemCard";
import { useContext, useState } from "react";
import { TodoItem, TodoStatus } from "@/app/_lib/types";
import { TodoItemsContext } from "../_context/TodoItemsContext";
import TodoItemCard from "./TodoItemCard";
import { v4 as uuidv4 } from "uuid";

export interface ColumnProps {
  status: TodoStatus;
}

export default function Column(props: ColumnProps) {
  const { todoItems, setTodoItems } = useContext(TodoItemsContext);

  const [isShowNewTodo, setIsShowNewTodo] = useState(false);

  const handleSubmitNewTodo = (description: string) => {
    const newItem: TodoItem = {
      id: uuidv4(),
      description: description,
      status: props.status,
      createdAt: new Date(),
    };

    setTodoItems([newItem, ...todoItems]);
    setIsShowNewTodo(false);
  };

  const handleTransferTodo = (id: string) => {
    for (let i = 0; i < todoItems.length; i++) {
      if (todoItems[i].id !== id) continue;

      if (todoItems[i].status === TodoStatus.Todo) {
        todoItems[i].status = TodoStatus.InProgress;
      } else if (todoItems[i].status === TodoStatus.InProgress) {
        todoItems[i].status = TodoStatus.Done;
      }

      break;
    }

    setTodoItems([...todoItems]);
  };

  const handleDeleteTodo = (id: string) => {
    const index = todoItems.findIndex((item) => item.id === id);
    if (index === -1) return;

    todoItems.splice(index, 1);
    setTodoItems([...todoItems]);
  };

  return (
    <div className={styles.column}>
      <Card className={styles.categoryHeader}>
        {props.status.toString()}
        <div
          className={`${styles.dot} ${
            styles[props.status.toString().toLowerCase().replaceAll(" ", "")]
          }`}
        />
        <IconButton
          className="ml-auto"
          size="small"
          onClick={() => setIsShowNewTodo(true)}
        >
          <AddBox />
        </IconButton>
      </Card>

      {/* New Todo Card */}
      {isShowNewTodo && (
        <NewTodoItemCard
          onCancel={() => setIsShowNewTodo(false)}
          onSubmit={handleSubmitNewTodo}
        />
      )}

      {/* Displayed TodoItems list */}
      <div className="flex flex-col gap-2">
        {todoItems
          .filter((item) => item.status === props.status)
          .map((item, i) => (
            <TodoItemCard
              key={i}
              todoItem={item}
              onTransfer={handleTransferTodo}
              onDelete={handleDeleteTodo}
            />
          ))}
      </div>
    </div>
  );
}
