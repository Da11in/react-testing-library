import { AuthContext } from "../../contexts/AuthContext";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("Protected route", () => {
  it("user is authorized", () => {
    const providerProps = {
      user: {},
    };
  });
  it("user is not authorized", () => {
    const route = "/";

    render(
      <MemoryRouter initialEntries={[route]}>
        <AuthContext.Provider
          value={{ user: null, login: () => null, logout: () => null }}
        ></AuthContext.Provider>
      </MemoryRouter>
    );
  });
});
