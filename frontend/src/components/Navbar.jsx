import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await axios.post(apiUrl + "/api/auth/logout");
    setUser(null);
    navigate("/");
  };
  return (
    <nav>
      <div className="max-w-6xl mx-auto p-2 flex justify-between items-start gap-15">
        <Link
          to="/"
          className="text-[#2c3a92] text-3xl font-extrabold leading-none"
        >
          {"User Management App".toUpperCase()}{" "}
        </Link>
        <div>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-gray-300 hover:bg-gray-400 text-center text-black px-3 py-1 rounded whitespace-nowrap font-semibold"
            >
              Log out
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
