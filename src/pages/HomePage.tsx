import { useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";
import TodoList from "../components/TodoList/TodoList";
import AddTodoModal from "../components/AddTodoModal/AddTodoModal";

import { getAllTodos } from "../store/actions";
import { useAppDispatch } from "../store/hooks";

const USER_ID = 1;

const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllTodos(USER_ID));
  }, [dispatch]);

  return (
    <Box
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      background="linear-gradient(0deg, rgba(161,196,253,1) 0%, rgba(194,233,251,1) 100%)"
    >
      <Container>
        <TodoList />
        <AddTodoModal />
      </Container>
    </Box>
  );
};

export default HomePage;
