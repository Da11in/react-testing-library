import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { Outlet, useNavigate } from "react-router-dom";

// TODO:
// сделать форму логина
// добавить валидацию по клику на сабмит
// по нажатию на сабмит загружать пользователя
// редирект на домашнюю страницу
// добавить редакс и пользователя в него

const App = () => {
  const navigate = useNavigate();

  const { user, loading } = useAuth();

  useEffect(() => {
    console.log("App use effect");
    if (user === null && !loading) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
  }

  return <Outlet />;
};

export default App;
