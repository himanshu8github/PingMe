import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuth.store";
import { LogOut, MessageSquare, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/home"); // take user to landing page after logout
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 fixed w-full top-0 z-40 transition-colors">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-gray-900 dark:text-gray-100 text-lg font-bold">PingMe</h1>
          </Link>
        </div>

        {/* Authenticated user buttons */}
        {authUser ? (
          <div className="flex items-center gap-4">
            {location.pathname === "/chat" && (
              <Link to={"/profile"} className="btn btn-sm gap-2">
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
            )}

            {location.pathname === "/profile" && (
              <Link to={"/chat"} className="btn btn-sm gap-2">
                <MessageSquare className="w-5 h-5" />
                <span className="hidden sm:inline">Chat</span>
              </Link>
            )}

            <button className="flex gap-2 items-center" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        ) : (
          // Non-authenticated user buttons
          <div className="flex items-center gap-4">
            <Link to="/login" className="btn btn-sm">
              Login
            </Link>
            <Link to="/signup" className="btn btn-sm btn-primary">
              Signup
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
