import { rest } from "msw";
import { mockTodos } from "../data/todoData";

export const todoHandlers = [
  rest.get("https://jsonplaceholder.typicode.com/todos", (req, res, ctx) => {
    // example of usage query params in msw
    const userId = req.url.searchParams.get("userId");

    return res(ctx.json(mockTodos));
  }),

  rest.post("https://jsonplaceholder.typicode.com/todos", (req, res, ctx) => {
    return res(ctx.json({ id: 201, title: "New item", userId: 1, completed: false }));
  }),

  rest.patch("https://jsonplaceholder.typicode.com/todos/:id", (req, res, ctx) => {
    // example of usage dynamic urls in msw
    const { id } = req.params;

    return res(ctx.json({}));
  }),

  rest.delete("https://jsonplaceholder.typicode.com/todos/:id", (req, res, ctx) => {
    // example of usage dynamic urls in msw
    const { id } = req.params;

    return res(ctx.json({}));
  }),
];
