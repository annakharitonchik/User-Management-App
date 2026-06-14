import React from "react";
import { Link } from "react-router-dom";

const Home = ({ user, error }) => {
  return (
    <div>
      <div>
        {error && <p>{error}</p>}
        {user ? (
          <div>
            <h2>hello</h2>
          </div>
        ) : (
          <div>
            <h1>PLease login or register</h1>
            <div>
              <Link to="/register">Sign up</Link>
              <Link to="/">Forgot password</Link>
            </div>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
