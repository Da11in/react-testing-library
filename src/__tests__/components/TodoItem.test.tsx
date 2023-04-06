import { render, screen } from "@testing-library/react";
import TodoItem from "../../components/TodoItem/TodoItem";
import { List } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";

const providedProps = {
  id: 1,
  title: "Title",
  completed: true,
  onComplete: jest.fn(),
  onDelete: jest.fn(),
};

describe("Todo item", () => {
  it("render todo item", () => {
    render(
      <List>
        <TodoItem {...providedProps} />
      </List>
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  it("Click on item buttons", () => {
    render(
      <List>
        <TodoItem {...providedProps} />
      </List>
    );

    userEvent.click(screen.getByTestId("complete-button"));

    expect(providedProps.onComplete).toBeCalledTimes(1);
    expect(providedProps.onComplete).toBeCalledWith({
      id: providedProps.id,
      completed: !providedProps.completed,
    });
    expect(providedProps.onDelete).toBeCalledTimes(0);
  });

  it("Click on delete button", () => {
    render(
      <List>
        <TodoItem {...providedProps} />
      </List>
    );

    userEvent.click(screen.getByTestId("delete-button"));

    expect(providedProps.onComplete).toBeCalledTimes(0);
    expect(providedProps.onDelete).toBeCalledTimes(1);
    expect(providedProps.onDelete).toBeCalledWith(providedProps.id);
  });
});
