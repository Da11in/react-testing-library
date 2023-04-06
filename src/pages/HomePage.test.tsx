import { cleanup, render, screen } from "@testing-library/react";
import HomePage from "./HomePage";

afterEach(cleanup);

describe("Home page", () => {
  it("Initial render with loading", () => {
    render(<HomePage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  // it("Loaded list of todos", async () => {
  //   render(<HomePage />);

  //   const todoTable = await screen.findByRole("table");
  //   const todoTableItems = await screen.findAllByTestId(/todo-table-item/i);

  //   expect(todoTable).toBeInTheDocument();
  //   expect(todoTableItems.length).toBeGreaterThan(0);
  // });
});
