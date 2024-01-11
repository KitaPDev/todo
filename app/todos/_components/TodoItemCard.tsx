import { ButtonGroup, Card, IconButton, Stack } from "@mui/material";
import { TodoItem, TodoStatus } from "../../_lib/types";
import { ArrowForward, Delete, NorthEast } from "@mui/icons-material";
import Link from "next/link";

export interface TodoItemProps {
  todoItem: TodoItem;
  onTransfer: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItemCard({
  todoItem,
  onTransfer,
  onDelete,
}: TodoItemProps) {
  return (
    <Card className="min-h-max w-full">
      <Stack flexDirection="column" className="max-w-full">
        <Stack
          className="items-center justify-between pl-2"
          flexDirection={"row"}
        >
          <h2 className="text-sm">
            {new Date(todoItem.createdAt).toLocaleString()}
          </h2>

          <ButtonGroup>
            <IconButton size="small" onClick={() => onDelete(todoItem.id)}>
              <Delete />
            </IconButton>
            <IconButton
              className={`${
                todoItem.status === TodoStatus.Done && "invisible"
              }`}
              color="primary"
              onClick={() => onTransfer(todoItem.id)}
            >
              <NorthEast />
            </IconButton>
          </ButtonGroup>
        </Stack>

        <Stack
          className="justify-between p-2"
          flexDirection="column"
          gap={1}
          useFlexGap
        >
          <h1 className="text-lg break-words">{todoItem.description}</h1>
          <Link
            href={`/todos/${todoItem.id}`}
            className="text-right text-sm hover:cursor-pointer hover:bg-neutral-200 transition-all"
          >
            {todoItem.id} <ArrowForward fontSize="small" />
          </Link>
        </Stack>
      </Stack>
    </Card>
  );
}
