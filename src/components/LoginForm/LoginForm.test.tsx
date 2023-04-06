import React from "react";
import { act, render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

const renderWithRouter = (param: React.ReactElement) =>
  render(<MemoryRouter initialEntries={[{ pathname: "/" }]}>{param}</MemoryRouter>);

describe("Login form", () => {
  it("Initial render", () => {
    renderWithRouter(<LoginForm />);

    const emailInput = screen.getByTestId("email-input");
    const emailError = screen.queryByTestId("email-error");
    const passwordInput = screen.getByTestId("password-input");
    const passwordError = screen.queryByTestId("password-error");
    const submitButton = screen.getByTestId("submit-button");

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveValue("");

    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveValue("");

    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    expect(emailError).not.toBeInTheDocument();
    expect(passwordError).not.toBeInTheDocument();
  });

  it("User added email and password", async () => {
    renderWithRouter(<LoginForm />);

    const email = screen.getByTestId("email-input");
    const password = screen.getByTestId("password-input");
    const button = screen.getByTestId("submit-button");

    userEvent.type(email, "test@email.com");

    expect(email).toHaveValue("test@email.com");
    expect(button).toBeDisabled();

    expect(password).not.toHaveFocus();

    userEvent.tab();

    expect(password).toHaveFocus();

    await act(() => userEvent.type(password, "qwerty"));

    expect(password).toHaveValue("qwerty");
    expect(button).not.toBeDisabled();
  });

  it("User added invalid email", async () => {
    renderWithRouter(<LoginForm />);

    const email = screen.getByTestId("email-input");
    const password = screen.getByTestId("password-input");
    const button = screen.getByTestId("submit-button");

    expect(button).toBeDisabled();

    await act(() => userEvent.type(email, "qwerty"));
    await act(() => userEvent.type(password, "qwe"));

    expect(button).not.toBeDisabled();

    expect(screen.queryByTestId("email-error")).not.toBeInTheDocument();

    await act(() => userEvent.click(button));

    expect(screen.getByTestId("email-error")).toBeInTheDocument();
  });
});
