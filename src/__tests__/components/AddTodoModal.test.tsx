import { screen } from "@testing-library/react";
import AddTodoModal from "../../components/AddTodoModal/AddTodoModal";
import { renderWithProviders } from "../../store/testUtils";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { todoHandlers } from "../../mocks/handlers/todoHandlers";

const server = setupServer(...todoHandlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Add todo modal", () => {
  it("Render Add Todo modal initial state", () => {
    renderWithProviders(<AddTodoModal />);

    const openBtn = screen.getByTestId("open-modal-button");

    expect(openBtn).toBeInTheDocument();
    expect(openBtn).toBeDisabled();
  });

  it("Open Add todo modal on click", () => {
    const preloadedTodosState = { loading: false, list: [] };

    renderWithProviders(<AddTodoModal />, { preloadedState: { todos: preloadedTodosState } });

    expect(screen.getByTestId("open-modal-button")).toBeEnabled();

    userEvent.click(screen.getByTestId("open-modal-button"));

    expect(screen.getByText("Add new task here")).toBeInTheDocument();
  });
});
