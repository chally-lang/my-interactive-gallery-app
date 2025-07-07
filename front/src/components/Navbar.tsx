import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow px-6 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 dark:text-white"
        >
          📸 Interactive Gallery
        </Link>

        <div className="flex space-x-4 items-center">
          <button
            onClick={toggleDarkMode}
            className="text-sm px-3 py-1 border rounded dark:text-white"
          >
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          {user ? (
            <>
              <span className="text-sm text-gray-700 dark:text-gray-200">
                Hello, {user.email}
              </span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
              <Link to="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
