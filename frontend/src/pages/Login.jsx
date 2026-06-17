import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;
import { Mail, Lock } from "lucide-react";

const Login = ({ setUser }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(apiUrl + "/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      navigate("/");
    } catch (error) {
      if (error.response?.status === 403) {
        setError("You are blocked");
        return;
      }

      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-[80dvh] flex items-center justify-center p-4 ">
      <div className="flex flex-col gap-3 w-full items-center justify-center">
        <div>
          <form
            className="bg-white p-6 rounded shadow-md w-full max-w-lg"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl mb-4 font-semibold">
              Sign Up to User Management App
            </h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="border  border-gray-300 flex items-center justify-between  mb-4 pl-2 pr-4 rounded-md">
              <div className="flex flex-col flex-1 w-full">
                <label className="text-gray-400 text-sm">E-mail</label>
                <input
                  type="email"
                  className=" text-black w-full outline-none text-lg"
                  value={form.email}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      email: event.target.value,
                    })
                  }
                />
              </div>
              <Mail className="text-gray-300 ml-3" size={28} />
            </div>
            <div className="border  border-gray-300 flex items-center justify-between  mb-6 pl-2 pr-4 rounded-md">
              <div className="flex flex-col flex-1 w-full">
                <label className="text-gray-400 text-sm">Password</label>
                <input
                  type="password"
                  className="text-black w-full outline-none text-lg"
                  value={form.password}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      password: event.target.value,
                    })
                  }
                />
              </div>
              <Lock className="text-gray-300 ml-3" size={28} />
            </div>
            <button
              className="bg-[#2c3a92] text-white p-2 w-full
            hover:bg-[#2b3178] text-center font-semibold rounded-md"
            >
              Sign In
            </button>
          </form>
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex flex-row gap-1.5">
              <p className="text-gray-700">Don't have an account?</p>
              <Link
                to="/register"
                className="text-[#2c3a92] hover:text-[#2b3178] font-semibold "
              >
                Sign Up
              </Link>
            </div>
            <Link
              to="/"
              className="text-[#2c3a92] hover:text-[#2b3178] font-semibold "
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
