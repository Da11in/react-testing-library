import React from "react";
import { render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";

describe("Login form", () => {
  render(<LoginForm />);

  const emailInput = screen.getByTestId("email-input");
  const passwordInput = screen.getByTestId("password-input");
  const submitButton = screen.getByTestId("submit-button");

  test("Initial render", () => {
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveValue("");

    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveValue("");

    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });
});
