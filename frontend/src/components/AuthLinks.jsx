import React from "react";
import { Link } from "react-router-dom";
const AuthLinks = () => {
  return (
    <nav className="bg-gray-500  p-4 text-white">
      <Link to="/register">Sign up</Link>
      <Link to="/">Forgot password</Link>
    </nav>
  );
};

export default AuthLinks;
