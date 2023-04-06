import React from "react";
import { User } from "../types/User";

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  login: () => null,
  logout: () => null,
});

export const useAuthContext = () => {
  const ctx = React.useContext(AuthContext);

  if (!ctx) {
    throw new Error("Auth context is not configured");
  }

  return ctx;
};
