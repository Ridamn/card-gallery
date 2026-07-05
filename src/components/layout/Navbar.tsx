import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "../../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    await logout();
    setMenuOpen(false);
    navigate("/");
  }

  const navLink = (path: string) =>
    `transition hover:text-blue-600 ${
      location.pathname === path
        ? "text-blue-600 font-semibold"
        : "text-gray-700"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-black tracking-tight"
          onClick={() => setMenuOpen(false)}
        >
          Card<span className="text-blue-600">Gallery</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className={navLink("/")}>
            Home
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className={navLink("/dashboard")}
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={navLink("/login")}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl text-gray-700"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 border-t" : "max-h-0"
        }`}
      >
        <div className="bg-white shadow-md">
          <div className="flex flex-col items-center py-6 px-6 gap-5">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className={`${navLink("/")} text-lg`}
            >
              Home
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className={`${navLink("/dashboard")} text-lg`}
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="mt-2 w-full max-w-xs rounded-xl bg-red-500 py-3 text-white font-medium hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className={navLink("/login")}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center rounded-lg bg-blue-600 text-white py-2 hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
