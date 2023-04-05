import axios from "axios";
import { useEffect, useState } from "react";
import type { User } from "../types/User";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const fetchUser = async () => {
    //   const { data } = await axios.get("https://jsonplaceholder.typicode.com/users/1");
    //   setUser(data);
    // };
    // fetchUser();
    setLoading(false);
  }, []);

  return { user, loading };
};
