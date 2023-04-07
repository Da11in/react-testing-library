import { setupServer } from "msw/node";
import TodoList from "../../components/TodoList/TodoList";
import { renderWithProviders } from "../../store/testUtils";
import { screen, act, waitForElementToBeRemoved, waitFor } from "@testing-library/react";
import { getAllTodos, postTodo } from "../../store/actions";
import { mockTodos } from "../../mocks/data/todoData";
import { todoHandlers } from "../../mocks/handlers/todoHandlers";
import userEvent from "@testing-library/user-event";

const server = setupServer(...todoHandlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Todo List", () => {
  it("Initial todo list render", () => {
    renderWithProviders(<TodoList />);

    expect(screen.getByTestId("todo-list-loader")).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it("Render todo list after all items are received", () => {
    const preloadedTodosState = { loading: false, list: mockTodos };

    renderWithProviders(<TodoList />, { preloadedState: { todos: preloadedTodosState } });

    expect(screen.queryByTestId("todo-list-loader")).not.toBeInTheDocument();
    expect(screen.getAllByRole("listitem").length).toBe(mockTodos.length);
  });

  it("Dispatch fetch todo action", async () => {
    const { store } = renderWithProviders(<TodoList />);

    await act(() => store.dispatch(getAllTodos(1)));

    expect(screen.getAllByRole("listitem").length).toBe(mockTodos.length);
  });

  it("Renders an error when fetch all todos is failed", () => {
    const preloadedTodosState = { loading: false, list: [], error: "Network error" };

    renderWithProviders(<TodoList />, { preloadedState: { todos: preloadedTodosState } });

    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem").length).toBe(0);
    expect(screen.queryByTestId("todo-list-loader")).not.toBeInTheDocument();
  });

  it("Todo item becomes completed", async () => {
    const preloadedTodosState = { loading: false, list: mockTodos };
    const testItem = mockTodos[0];

    renderWithProviders(<TodoList />, {
      preloadedState: { todos: preloadedTodosState },
    });

    expect(screen.getByTestId(`todo-item-${testItem.id}`)).toBeInTheDocument();
    expect(screen.getByTestId(`complete-button-${testItem.id}`)).toBeInTheDocument();
    expect(screen.getByTestId(`todo-item-text-${testItem.id}`)).toHaveStyle(
      `color: var(--chakra-colors-chakra-body-text)`
    );

    userEvent.click(screen.getByTestId(`complete-button-${testItem.id}`));

    await waitForElementToBeRemoved(() => screen.queryByTestId("todo-list-loader"));

    expect(screen.getByTestId(`todo-item-text-${testItem.id}`)).toHaveStyle(
      `color: var(--chakra-colors-green-500)`
    );
  });

  it("Todo item becomes deleted", async () => {
    const preloadedTodosState = { loading: false, list: mockTodos };
    const testItem = mockTodos[0];

    renderWithProviders(<TodoList />, {
      preloadedState: { todos: preloadedTodosState },
    });

    expect(screen.getByTestId(`todo-item-${testItem.id}`)).toBeInTheDocument();
    expect(screen.getByTestId(`delete-button-${testItem.id}`)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(`delete-button-${testItem.id}`));

    await waitForElementToBeRemoved(() => screen.queryByTestId(`todo-item-${testItem.id}`));

    expect(screen.queryByTestId(`todo-item-${testItem.id}`)).not.toBeInTheDocument();
  });

  it("Adds new todo item", async () => {
    const preloadedTodosState = { loading: false, list: [] };
    const {
      store: { dispatch },
    } = renderWithProviders(<TodoList />, { preloadedState: { todos: preloadedTodosState } });

    expect(screen.queryAllByRole("listitem").length).toBe(0);

    await waitFor(() => dispatch(postTodo({ userId: 1, title: "New item", completed: false })));

    expect(screen.getByText("New item")).toBeInTheDocument();
  });
});
