import { useMemo } from "react";
import { useAuth } from "./hooks/useAuth";
import { AuthContext } from "./contexts/AuthContext";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import AppLoading from "./components/AppLoading/AppLoading";

const App = () => {
  const { user, loading, login, logout } = useAuth();

  const authContextValue = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  if (loading) {
    return <AppLoading />;
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      <AppRoutes />
    </AuthContext.Provider>
  );
};

export default App;
