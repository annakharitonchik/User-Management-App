import { Link } from "react-router-dom";
import Table from "../components/Table";
const Home = ({ user, error, setUser }) => {
  return (
    <div>
      {error && <p>{error}</p>}
      {user ? (
        <Table user={user} setUser={setUser} />
      ) : (
        <div className="min-h-[80dvh] flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h2 className="text-xl mb-4 font-semibold">
              Please login or register
            </h2>

            <div className="flex flex-col gap-3">
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
        </div>
      )}
    </div>
  );
};

export default Home;
