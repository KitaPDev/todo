import { Cancel, CheckCircle } from "@mui/icons-material";
import { ButtonGroup, Card, IconButton, TextField } from "@mui/material";
import { useState } from "react";

export interface NewTodoItemCardProps {
  onCancel: () => void;
  onSubmit: (description: string) => void;
}

export default function NewTodoItemCard(props: NewTodoItemCardProps) {
  const [description, setDescription] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = () => {
    if (!description) {
      setErrMsg("Description is required");
      return;
    }

    props.onSubmit(description);
  };

  return (
    <Card className="flex gap-2 p-4 items-center">
      <TextField
        label="Description"
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        size="small"
        error={Boolean(errMsg)}
        helperText={errMsg}
        fullWidth
      />
      <ButtonGroup>
        <IconButton size="small" onClick={props.onCancel}>
          <Cancel color="error" />
        </IconButton>
        <IconButton size="small" onClick={handleSubmit}>
          <CheckCircle color="success" />
        </IconButton>
      </ButtonGroup>
    </Card>
  );
}
