import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields.");
      return;
    }

    const { error } = await login(email.trim(), password.trim());

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Welcome back!");

    navigate("/dashboard");
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center">
          Welcome Back
        </h1>

        <p className="text-gray-500 text-center mt-2">
          Login to continue managing your cards.
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5 mt-8"
        >
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;