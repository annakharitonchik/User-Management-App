import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    setUser(null);
    navigate("/");
  };
  return (
    <nav className="bg-gray-500  p-4 text-white">
      <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
        <Link to="/">User-Management-App </Link>
        <div>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Log out
            </button>
          ) : (
            <>
              <Link to="/register" className="mx-2">
                Sign up
              </Link>
              <Link to="/" className="mx-2">
                Forgot password
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
