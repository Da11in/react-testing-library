import { render, screen } from "@testing-library/react";
import App from "./App";

it("Check default unauthorized app state", () => {
  render(<App />);
  expect(screen.getByText(/login/i)).toBeInTheDocument();
});
