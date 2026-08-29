import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/webp/wallx_final.webp";
import { IoPersonOutline, IoBriefcaseOutline } from "react-icons/io5";

const MAIN_NAV_LINKS = [
  { name: "Painters", path: "/painters" },
  { name: "Dealers", path: "/dealers" },
  { name: "Services", path: "/services" },
  { name: "Products", path: "/product" },
];

const AUTH_NAV_LINKS = [
  { name: "Painter Signup", path: "/painter-signup", icon: IoPersonOutline },
  { name: "Dealer Signup", path: "/dealer-signup", icon: IoBriefcaseOutline },
];

const ALL_MOBILE_LINKS = [
  ...MAIN_NAV_LINKS,
  ...AUTH_NAV_LINKS.map(({ name, path }) => ({ name, path })),
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const hideOnDesktop =
    location.pathname === "/painter-signup" ||
    location.pathname === "/painter-verification" ||
    location.pathname === "/dealer-signup" ||
    location.pathname === "/dealer-verification";

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav
      className={`sticky top-0 z-50 h-20 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 flex justify-center items-center ${
        hideOnDesktop ? "lg:hidden" : ""
      }`}
    >
      <div className="flex justify-between items-center w-11/12 mx-auto max-w-screen-2xl">
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start">
          <Link to="/" className="flex items-center cursor-pointer select-none">
            <img
              src={logo}
              alt="WallX Logo"
              className="h-10 sm:h-12 lg:h-14 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Center: Desktop Menu */}
        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex m-0 p-0 list-none gap-10 xl:gap-16">
            {MAIN_NAV_LINKS.map((link) => {
              const isActive =
                location.pathname === link.path ||
                (link.path === "/painters" && location.pathname.startsWith("/painters")) ||
                (link.path === "/dealers" && location.pathname.startsWith("/dealers"));
              return (
                <li
                  key={link.name}
                  className="flex items-center justify-center"
                >
                  <Link
                    to={link.path}
                    className={`group relative flex items-center justify-center h-20 px-2 font-medium text-base transition-colors duration-300 ${
                      isActive
                        ? "text-[#d82b2b]"
                        : "text-gray-700 hover:text-[#d82b2b]"
                    }`}
                  >
                    {link.name}
                    {/* Red Underline Effect */}
                    <span
                      className={`absolute bottom-4 left-1/2 h-[3px] bg-[#d82b2b] rounded transition-all duration-300 -translate-x-1/2 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right: Contact Button & Hamburger */}
        <div className="flex-1 flex justify-end items-center gap-5">
          <div className="hidden lg:flex items-center gap-4 text-gray-700 font-medium text-[15px]">
            {AUTH_NAV_LINKS.map((auth, index) => {
              const IconComponent = auth.icon;
              return (
                <React.Fragment key={auth.name}>
                  {index > 0 && <span className="text-gray-300">|</span>}
                  <Link
                    to={auth.path}
                    className="flex items-center gap-2 hover:text-[#d82b2b] transition-colors duration-300"
                  >
                    <IconComponent className="text-lg" />
                    {auth.name}
                  </Link>
                </React.Fragment>
              );
            })}
          </div>

          {/* Hamburger Icon */}
          <button
            type="button"
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
            className="lg:hidden flex flex-col justify-between w-7 h-5 cursor-pointer relative z-50 ml-4 bg-transparent border-none p-0 focus:outline-none"
            onClick={toggleMenu}
          >
            {[
              isOpen ? "translate-y-2.5 rotate-45 !bg-[#d82b2b]" : "",
              isOpen ? "opacity-0" : "",
              isOpen ? "-translate-y-2 -rotate-45 !bg-[#d82b2b]" : "",
            ].map((transformClass, barIdx) => (
              <span
                key={barIdx}
                className={`h-0.5 w-full bg-gray-800 rounded-lg transition-all duration-300 ease-in-out ${transformClass}`}
              />
            ))}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <ul
          className={`
          lg:hidden
          flex m-0 p-0 list-none
          fixed top-20 left-0 w-full bg-white/98 backdrop-blur-md shadow-lg flex-col items-center justify-start transition-all duration-500 ease-out origin-top
          ${isOpen ? "opacity-100 scale-y-100 h-[calc(100vh-80px)] overflow-y-auto" : "opacity-0 scale-y-0 h-0"}
        `}
        >
          {ALL_MOBILE_LINKS.map((link) => (
            <li
              key={link.name}
              className="w-full h-20 flex items-center justify-center border-b border-gray-100"
            >
              <Link
                to={link.path}
                className="flex items-center justify-center h-full w-full px-6 text-gray-700 font-medium text-lg hover:text-[#d82b2b] hover:bg-gray-50 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
