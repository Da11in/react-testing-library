import { setupServer } from "msw/node";
import { rest } from "msw";
import type { Todo } from "../../types/Todo";
import TodoList from "../../components/TodoList/TodoList";
import { renderWithProviders } from "../../store/testUtils";
import { screen } from "@testing-library/react";

const mockTodos: Todo[] = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: "fugiat veniam minus",
    completed: false,
  },
];

const handlers = [
  rest.get("https://jsonplaceholder.typicode.com/todos", (req, res, ctx) => {
    const userId = req.url.searchParams.get("userId");

    return res(ctx.json(mockTodos));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Todo List", () => {
  it("Initial todo list render", () => {
    renderWithProviders(<TodoList />);

    expect(screen.getByTestId("todo-list-loader")).toBeInTheDocument();
  });
});
