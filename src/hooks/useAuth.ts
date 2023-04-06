import axios from "axios";
import { useState } from "react";
import type { User } from "../types/User";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.get<User>("https://jsonplaceholder.typicode.com/users/1");
      setUser(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return { user, login, logout, loading };
};
