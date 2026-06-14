import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import wallpaper from "../images/wallpaper.svg";

const Register = ({ setUser }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", form);
      setUser(res.data.user);
      navigate("/");
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 gap-30">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-lg "
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl mb-4 font-semibold">
          Sign Up to User Management App
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="name"
          className="border p-2 w-full mb-3"
          value={form.name}
          onChange={(event) =>
            setForm({
              ...form,
              name: event.target.value,
            })
          }
        />
        <input
          type="email"
          placeholder="email"
          className="border p-2 w-full mb-3"
          value={form.email}
          onChange={(event) =>
            setForm({
              ...form,
              email: event.target.value,
            })
          }
        />
        <input
          type="password"
          placeholder="password"
          className="border p-2 w-full mb-3"
          value={form.password}
          onChange={(event) =>
            setForm({
              ...form,
              password: event.target.value,
            })
          }
        />
        <button className="bg-[#2c3a92] text-white p-2 w-full hover:bg-[#2b3178] text-center font-semibold">
          Sign Up
        </button>
      </form>
      <div
        className="hidden lg:block min-h-[80vh] lg:w-1/3 bg-cover bg-center"
        style={{ backgroundImage: `url(${wallpaper})` }}
      ></div>
    </div>
  );
};

export default Register;
