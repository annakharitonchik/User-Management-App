import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../components/NotFound";
const AppRoutes = ({ user, error, setUser }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home error={error} user={user} setUser={setUser} />}
      />

      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
      />

      <Route
        path="/register"
        element={user ? <Navigate to="/" /> : <Register setUser={setUser} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
