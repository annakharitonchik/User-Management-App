import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Mail, User, Lock, MailCheck } from "lucide-react";
const apiUrl = import.meta.env.VITE_API_URL;
const Register = ({ setUser }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showEmailAlert, setShowEmailAlert] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(apiUrl + "/api/auth/register", form);
      localStorage.setItem("token", res.data.token);
      setShowEmailAlert(true);
      setTimeout(() => {
        setUser(res.data.user);
        navigate("/");
      }, 3000);
    } catch (error) {
      if (error.response?.status === 403 || error.response?.status === 401) {
        setError("You are blocked");
        return;
      }
      setError("Registration failed");
    }
  };

  return (
    <>
      {showEmailAlert && (
        <div
          className="
    fixed top-5  lg:left-1/4 left-1/2 -translate-x-1/2
    bg-white shadow-lg rounded-xl
    px-5 py-4 z-10
    w-90 max-w-sm
    text-center
  "
        >
          <p className="font-semibold">
            <MailCheck className=" inline text-[#2c3a92]" /> Check your email
          </p>
          <p className="text-sm text-gray-500">Verification link was sent</p>
        </div>
      )}
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
              <div className="border  border-gray-300 flex items-center justify-between mb-4 pl-2 pr-4 rounded-md">
                <div className="flex flex-col flex-1 w-full">
                  <label className="text-gray-400 text-sm">Name</label>
                  <input
                    type="text"
                    className=" text-black w-full outline-none text-lg"
                    value={form.name}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        name: event.target.value,
                      })
                    }
                  />
                </div>
                <User className="text-gray-300 ml-3" size={28} />
              </div>
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
              <button className="bg-[#2c3a92] text-white p-2 w-full hover:bg-[#2b3178] text-center font-semibold rounded-md">
                Sign Up
              </button>
            </form>
            <div className="flex flex-row gap-1 self-start mt-3">
              <p className="text-gray-700">Have an account?</p>
              <Link
                to="/login"
                className="text-[#2c3a92] hover:text-[#2b3178] font-semibold "
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
