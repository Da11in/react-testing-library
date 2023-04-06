import { useCallback, useEffect } from "react";

import { Box, Center, Heading, Spinner } from "@chakra-ui/react";
import { List } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getTodoState } from "../../store/todoReducer";
import { patchTodo, deleteTodo, getAllTodos } from "../../store/actions";

import type { PatchTodoDTO } from "../../types/PatchTodoDTO";
import TodoItem from "../TodoItem/TodoItem";

const USER_ID = 1;

const TodoList = () => {
  const dispatch = useAppDispatch();
  const { loading, list, error } = useAppSelector(getTodoState);

  useEffect(() => {
    dispatch(getAllTodos(USER_ID));
  }, [dispatch]);

  const handleCompleteTodo = useCallback(
    (arg: PatchTodoDTO) => {
      dispatch(patchTodo(arg));
    },
    [dispatch]
  );

  const handleDeleteTodo = useCallback(
    (id: number) => {
      dispatch(deleteTodo(id));
    },
    [dispatch]
  );

  return (
    <Box>
      <Heading mb={10} textAlign="center">
        Todo list
      </Heading>
      <Box
        height={500}
        overflowY="scroll"
        backgroundColor="gray.100"
        p={5}
        borderRadius={10}
        boxShadow="base"
        position="relative"
      >
        {error ? (
          <Center height="100%" color="red.500">
            Error: {error}
          </Center>
        ) : (
          <List>
            {list.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                completed={todo.completed}
                title={todo.title}
                onComplete={handleCompleteTodo}
                onDelete={handleDeleteTodo}
              />
            ))}

            {loading && (
              <Center
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                background="rgba(255,255,255, 0.2)"
              >
                <Spinner size="lg" />
              </Center>
            )}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default TodoList;
