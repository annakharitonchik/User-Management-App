import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-xl mb-4">Register</h2>
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
        <button className="bg-blue-500 text-white p-2 w-full">Register</button>
      </form>
    </div>
  );
};

export default Register;
