import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import { ListItem, HStack, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import type { PatchTodoDTO } from "../../types/PatchTodoDTO";

type TodoItemProps = {
  id: number;
  title: string;
  completed: boolean;
  onComplete: (arg: PatchTodoDTO) => void;
  onDelete: (id: number) => void;
};

const TodoItem: React.FC<TodoItemProps> = (props): React.ReactElement => {
  const { id, title, completed, onComplete, onDelete } = props;

  return (
    <ListItem margin={3} data-testid={`todo-item-${id}`}>
      <HStack spacing={5}>
        <IconButton
          data-testid={`complete-button-${id}`}
          aria-label="mark item as completed"
          icon={<CheckIcon color={completed ? "green.500" : "gray.500"} />}
          onClick={() => onComplete({ id, completed: !completed })}
        />

        <Text
          width="100%"
          textDecoration={completed ? "line-through" : "none"}
          color={completed ? "green.500" : "default"}
          data-testid={`todo-item-text-${id}`}
        >
          {title}
        </Text>

        <IconButton
          aria-label="delete item"
          data-testid={`delete-button-${id}`}
          icon={<DeleteIcon />}
          onClick={() => onDelete(id)}
        />
      </HStack>
    </ListItem>
  );
};

export default React.memo(TodoItem);
