import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { LogOut, ChevronDown } from "lucide-react";
import logo from "../../assets/webp/wallx_final.webp";
import { useAuth } from "../../auth/AuthContext";
import { tokenStorage } from "../../utils/helpers/handlers/tokenStorage";
import toast from "react-hot-toast";

const GlobalNavbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const { logout, token, role } = useAuth();
  const navigate = useNavigate();

  const profileRef = useRef(null);
  
  const [currentUser, setCurrentUser] = useState({ name: "User", initials: "U", role: role || "User" });

  useEffect(() => {
    if (token) {
      const { payload } = tokenStorage.getPayload(token);
      if (payload && payload.name) {
        setCurrentUser({
          name: payload.name,
          initials: payload.name.charAt(0).toUpperCase(),
          role: payload.role || role || "User"
        });
      }
    }
  }, [token, role]);

  // Close profile dropdown when clicking outside of it.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/painter-login");
  };

  return (
    <nav className="sticky top-0 z-50 h-20 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 flex justify-center items-center">
      <div className="flex justify-between items-center w-11/12 mx-auto max-w-screen-2xl pl-14 md:pl-0">
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start">
          <Link
            to="/painter-portal/dashboard"
            className="flex items-center cursor-pointer select-none"
          >
            <img
              src={logo}
              alt="WallX Logo"
              className="h-10 sm:h-12 lg:h-14 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-1 sm:gap-2">

          {/* Profile menu */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setProfileOpen((o) => !o);
              }}
              className="flex items-center gap-2 pl-2 pr-1 sm:pr-3 h-11 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="Account menu"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                {currentUser.initials}
              </div>
              <span className="hidden sm:flex flex-col items-start leading-tight">
                <span className="text-sm text-gray-700 font-medium">
                  Hi, {currentUser.name}
                </span>
                <span className="text-[11px] text-gray-400 capitalize">{currentUser.role}</span>
              </span>
              <ChevronDown className="hidden sm:block w-4 h-4 text-gray-400" />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
                >
                  {/* User Info - shown on small screens */}
                  <div className="px-4 py-3 border-b border-gray-100 sm:hidden">
                    <p className="text-sm font-medium text-black">
                      Hi, {currentUser.name}
                    </p>
                    <p className="text-xs text-gray-400 capitalize">{currentUser.role}</p>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#d82b2b] hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default GlobalNavbar;
