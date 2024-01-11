"use client";

import { Card, IconButton, Stack, TextField } from "@mui/material";
import { TodoItem } from "../../_lib/types";
import { useEffect, useState } from "react";
import { useSessionStorage } from "usehooks-ts";
import { Edit, Save } from "@mui/icons-material";

export default function TodoPage({ params }: any) {
  const [storedItems, setStoredItems] = useSessionStorage<TodoItem[]>(
    "todoItems",
    []
  );
  const [todoItem, setTodoItem] = useState<TodoItem>();
  const [isEditing, setIsEditing] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setTodoItem(
      storedItems.find((item) => (item as TodoItem).id === params.id)
    );
  }, [params.id, storedItems]);

  const handleChangeDescription = (description: string) => {
    if (!todoItem) return;
    todoItem.description = description;
    setTodoItem({ ...todoItem });
  };

  const handleSave = () => {
    if (!todoItem) return;

    if (!todoItem.description) {
      setErrMsg("Description is required");
      return;
    }

    for (let i = 0; i < storedItems.length; i++) {
      if (storedItems[i].id !== todoItem.id) continue;
      storedItems[i] = todoItem;
      break;
    }

    setStoredItems([...storedItems]);
    setIsEditing(false);
  };

  return (
    <div className="w-full flex justify-center">
      {todoItem && (
        <Card className="p-4 bg-neutral-200 min-w-[300px] w-1/2 relative">
          <Stack flexDirection="column" gap={1}>
            <h1 className="text-lg font-semibold">
              You are editing todo {todoItem.id}
            </h1>
            <TextField
              label="Description"
              value={todoItem.description}
              onChange={({ target }) => handleChangeDescription(target.value)}
              size="small"
              error={Boolean(errMsg)}
              helperText={errMsg}
              disabled={!isEditing}
              fullWidth
            />
            <p>id: {todoItem.id}</p>
            <p>createdAt: {new Date(todoItem.createdAt).toLocaleString()}</p>
            <p>status: {todoItem.status.toString()}</p>
          </Stack>
          {isEditing ? (
            <IconButton
              className="!absolute bottom-2 right-2"
              color="primary"
              onClick={handleSave}
            >
              <Save />
            </IconButton>
          ) : (
            <IconButton
              className="!absolute bottom-2 right-2"
              color="primary"
              onClick={() => setIsEditing(true)}
            >
              <Edit />
            </IconButton>
          )}
        </Card>
      )}
    </div>
  );
}
