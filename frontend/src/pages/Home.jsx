import React from "react";
import { Link } from "react-router-dom";
import wallpaper from "../images/wallpaper.svg";

const Home = ({ user, error }) => {
  return (
    <div>
      {error && <p>{error}</p>}
      {user ? (
        <div>
          <h2>hello {user.name}</h2>
        </div>
      ) : (
        <div className="min-h-[80vh] flex items-center justify-center p-4 gap-30">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
            <h1 className="text-xl mb-4 font-semibold">
              Please login or register
            </h1>
            <div className=" flex flex-col gap-y-4">
              <Link
                to="/login"
                className="bg-[#2c3a92] text-white p-3 rounded-md hover:bg-[#2b3178] text-center font-semibold"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="bg-gray-300 text-black p-3 rounded-md hover:bg-gray-400 text-center font-semibold"
              >
                Sign Up
              </Link>
            </div>
          </div>
          <div
            className="hidden lg:block min-h-[80vh] lg:w-1/3 bg-cover bg-center"
            style={{ backgroundImage: `url(${wallpaper})` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Home;
