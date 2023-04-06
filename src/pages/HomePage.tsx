import { useEffect, useState } from "react";
import { Todo } from "../types/Todo";
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Heading } from "@chakra-ui/react";
import axios from "axios";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const getTodos = async () => {
      const { data } = await axios.get<Todo[]>("https://jsonplaceholder.typicode.com/todos");
      setTodos(data);
      setLoading(false);
    };
    getTodos();
  }, []);

  return (
    <Box display="flex" flexDir="column" justifyContent="center" alignItems="center" minH="100vh">
      {loading ? (
        <Heading>Loading</Heading>
      ) : (
        <>
          <TableContainer>
            <Table variant="striped">
              <Thead bgColor="telegram.100">
                <Tr>
                  <Th>ID</Th>
                  <Th>User ID</Th>
                  <Th>Title</Th>
                  <Th>Completed</Th>
                </Tr>
              </Thead>
              <Tbody maxH="80vh" overflowY="scroll">
                {todos.map((todo, index) => (
                  <Tr key={todo.id} data-testid={`todo-table-item-${index}`}>
                    <Td>{todo.id}</Td>
                    <Td>{todo.userId}</Td>
                    <Td maxW={40} textOverflow="ellipsis" overflow="hidden" wordBreak="break-all">
                      {todo.title}
                    </Td>
                    <Td>{todo.completed.toString()}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default HomePage;
