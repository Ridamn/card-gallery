import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Hero() {
  const { user } = useAuth();

  return (
    <section className="py-10 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
        Card Gallery
      </h1>

      <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
        Discover, organize and share customizable cards built with
        React, TypeScript and Supabase.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        {user ? (
          <Link
            to="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
          >
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
            >
              Get Started
            </Link>

            <Link
              to="/register"
              className="border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-xl transition"
            >
              Create Account
            </Link>
          </>
        )}
      </div>
    </section>
  );
}

export default Hero;