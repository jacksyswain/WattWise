import { useEffect, useState } from "react";
import { loginUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 🔁 If already logged in, redirect
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, []);

  const handleLogin = async () => {
    setError("");
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password"
      );
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-4 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-sky-600 hover:bg-sky-700 text-white w-full py-2 rounded"
        >
          Login
        </button>

        {/* REGISTER OPTION */}
        <p className="text-sm text-center mt-4">
          New user?{" "}
          <Link
            to="/register"
            className="text-sky-600 hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
