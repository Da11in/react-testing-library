import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
