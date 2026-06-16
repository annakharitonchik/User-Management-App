import { useState, useEffect } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import AppRoutes from "./components/AppRoutes.jsx";
axios.defaults.withCredentials = true;
import { LoaderCircle } from "lucide-react";

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(apiUrl + "/api/auth/me", {
          headers: { Authorization: localStorage.getItem("token") },
        });

        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div
        className="min-h-dvh flex items-center justify-center
      text-gray-300 text-3xl font-semibold"
      >
        <LoaderCircle className="h-12 w-12 animate-spin text-gray-300" />
        <p>Loading...</p>
      </div>
    );
  }
  return user ? (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <AppRoutes
        user={user}
        setUser={setUser}
        error={error}
        setError={setError}
      />
    </Router>
  ) : (
    <div className="flex justify-between">
      <div className="flex flex-col mx-auto">
        <Router>
          <Navbar user={user} setUser={setUser} />
          <AppRoutes
            user={user}
            setUser={setUser}
            error={error}
            setError={setError}
          />
        </Router>
      </div>
      <div className="hidden lg:flex bg-[#2b3178] w-1/2 min-h-screen"></div>
    </div>
  );
}
export default App;
