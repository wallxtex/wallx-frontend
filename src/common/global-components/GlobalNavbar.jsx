import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Bell,
  ScanLine,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
} from "lucide-react";
import logo from "../../assets/webp/wallx_final.webp";
import notifications from "./data/notification";

// Mock data — replace with real user/notification data once available.
const painter = { name: "Sagar", initials: "S" };


const GlobalNavbar = () => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [lang, setLang] = useState("EN");

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Close either dropdown when clicking outside of it.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 h-20 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 flex justify-center items-center">
      <div className="flex justify-between items-center w-11/12 mx-auto max-w-screen-2xl pl-14 md:pl-0">
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start">
          <Link
            to="/painter/dashboard"
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
          {/* Scan quick action — decorative only, no functionality */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-11 h-11 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Scan"
          >
            <ScanLine className="w-5 h-5" />
          </motion.button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setNotifOpen((o) => !o);
                setProfileOpen(false);
              }}
              className="relative flex items-center justify-center w-11 h-11 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#d82b2b]" />
              )}
            </motion.button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-black">
                      Notifications
                    </p>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="px-4 py-3 border-b border-gray-50 last:border-b-0 hover:bg-gray-50"
                      >
                        <div className="flex items-start gap-2">
                          {n.unread && (
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#d82b2b] flex-shrink-0" />
                          )}
                          <div className={n.unread ? "" : "pl-3.5"}>
                            <p className="text-sm font-medium text-black">
                              {n.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {n.detail}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile menu */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setProfileOpen((o) => !o);
                setNotifOpen(false);
              }}
              className="flex items-center gap-2 pl-2 pr-1 sm:pr-3 h-11 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="Account menu"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                {painter.initials}
              </div>
              <span className="hidden sm:flex flex-col items-start leading-tight">
                <span className="text-sm text-gray-700 font-medium">
                  Hi, {painter.name}
                </span>
                <span className="text-[11px] text-gray-400">Painter</span>
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
                  <div className="px-4 py-3 border-b border-gray-100 sm:hidden">
                    <p className="text-sm font-medium text-black">
                      Hi, {painter.name}
                    </p>
                    <p className="text-xs text-gray-400">Painter</p>
                  </div>

                  <Link
                    to="/painter/profile"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <User className="w-4 h-4 text-gray-500" />
                    Profile
                  </Link>
                  <Link
                    to="/painter/settings"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Settings className="w-4 h-4 text-gray-500" />
                    Settings
                  </Link>
                  <Link
                    to="/painter/help"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <HelpCircle className="w-4 h-4 text-gray-500" />
                    Help
                  </Link>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#d82b2b] hover:bg-red-50 border-t border-gray-100">
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
