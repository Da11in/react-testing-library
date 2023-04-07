// import { DefaultBodyType, rest } from "msw";
// import { setupServer } from "msw/node";
// import type { Todo } from "../types/Todo";
// import { screen, render, waitForElementToBeRemoved } from "@testing-library/react";
// import HomePage from "./HomePage";

// const mockTodos: Todo[] = [
//   {
//     userId: 1,
//     id: 1,
//     title: "delectus aut autem",
//     completed: false,
//   },
//   {
//     userId: 1,
//     id: 2,
//     title: "quis ut nam facilis et officia qui",
//     completed: false,
//   },
//   {
//     userId: 1,
//     id: 3,
//     title: "fugiat veniam minus",
//     completed: false,
//   },
// ];

// const server = setupServer(
//   rest.get<DefaultBodyType, {}, Todo[]>(
//     "https://jsonplaceholder.typicode.com/todos",
//     (req, res, ctx) => {
//       return res(ctx.json(mockTodos));
//     }
//   )
// );

// beforeAll(() => server.listen());
// afterAll(() => server.close());
import React from "react";

it("", () => {});

// describe("Homepage", () => {
//   it("Homepage initial render::loading", () => {
//     render(<HomePage />);
//     expect(screen.getByText(/loading/i)).toBeInTheDocument();
//   });

//   it("Homepage render::table", async () => {
//     render(<HomePage />);

//     expect(screen.getByText(/loading/i)).toBeInTheDocument();

//     await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

//     expect(screen.getByRole("table")).toBeInTheDocument();
//     expect(screen.getAllByTestId(/todo-table-item/i).length).toBe(mockTodos.length);
//   });
// });
