import React, { useEffect, useState } from "react";
import { Todo } from "../types/Todo";
import {
  Box,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Skeleton,
} from "@chakra-ui/react";
import axios from "axios";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const getTodos = async () => {
      const { data } = await axios.get<Todo[]>("https://jsonplaceholder.typicode.com/todos");
      setTimeout(() => {
        setTodos(data);
        setLoading(false);
      }, 2000);
    };

    getTodos();
  }, []);

  return (
    <Box display="flex" flexDir="column" justifyContent="center" alignItems="center" minH="100vh">
      <Container maxW={1024}>
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
              {loading
                ? ["", "", "", "", "", "", "", "", ""].map((el, i) => (
                    <Tr key={i}>
                      <Td>
                        <Skeleton height={2} />
                      </Td>
                      <Td>
                        <Skeleton height={2} />
                      </Td>
                      <Td>
                        <Skeleton height={2} />
                      </Td>
                      <Td>
                        <Skeleton height={2} />
                      </Td>
                    </Tr>
                  ))
                : todos.map((todo) => (
                    <Tr key={todo.id}>
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
      </Container>
    </Box>
  );
};

export default HomePage;
