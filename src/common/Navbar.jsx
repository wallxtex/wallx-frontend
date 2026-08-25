import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/webp/wallx_final.webp';
import { IoLocationOutline } from "react-icons/io5";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const mainLinks = [
        { name: 'Painters', path: '/painters' },
        { name: 'Dealers', path: '/dealers' },
        { name: 'Services', path: '/services' },
        { name: 'Products', path: '/product' },
    ];

    return (
        <nav className="sticky top-0 z-50 h-20 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 flex justify-center items-center">
            <div className="flex justify-between items-center w-11/12 mx-auto max-w-screen-2xl">

                {/* Left: Logo */}
                <div className="flex-1 flex justify-start">
                    <Link to="/" className="flex items-center cursor-pointer select-none">
                        <img src={logo} alt="WallX Logo" className="h-10 sm:h-12 lg:h-14 w-auto object-contain" />
                    </Link>
                </div>

                {/* Center: Desktop Menu */}
                <div className="hidden lg:flex flex-1 justify-center">
                    <ul className="flex m-0 p-0 list-none gap-10 xl:gap-16">
                        {mainLinks.map((link, index) => (
                            <li key={index} className="flex items-center justify-center">
                                <Link
                                    to={link.path}
                                    className="group relative flex items-center justify-center h-20 px-2 text-gray-700 font-medium text-base hover:text-[#d82b2b] transition-colors duration-300"
                                >
                                    {link.name}
                                    {/* Red Underline Effect */}
                                    <span className="absolute bottom-4 left-1/2 w-0 h-[3px] bg-[#d82b2b] rounded transition-all duration-300 -translate-x-1/2 group-hover:w-full"></span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right: Contact Button & Hamburger */}
                <div className="flex-1 flex justify-end items-center gap-5">
                    {/* Location Icon */}
                    <div className="hidden lg:flex items-center justify-center w-14 h-14 text-gray-700 rounded-full hover:bg-[#d82b2b]/10 cursor-pointer transition-all duration-300">
                        <IoLocationOutline className="text-2xl" />
                    </div>

                    <Link
                        to="/contact"
                        style={{ padding: '8px 24px' }}
                        className="hidden lg:flex items-center justify-center bg-[#d82b2b] text-white font-semibold rounded-full hover:bg-[#b92525] transition-colors duration-300"
                    >
                        Book Free Site Visit
                    </Link>

                    {/* Hamburger Icon */}
                    <div
                        className="lg:hidden flex flex-col justify-between w-7 h-5 cursor-pointer relative z-50 ml-4"
                        onClick={toggleMenu}
                    >
                        <span className={`h-0.5 w-full bg-gray-800 rounded-lg transition-all duration-300 ease-in-out ${isOpen ? 'translate-y-2.5 rotate-45 !bg-[#d82b2b]' : ''}`}></span>
                        <span className={`h-0.5 w-full bg-gray-800 rounded-lg transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`h-0.5 w-full bg-gray-800 rounded-lg transition-all duration-300 ease-in-out ${isOpen ? '-translate-y-2 -rotate-45 !bg-[#d82b2b]' : ''}`}></span>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <ul className={`
          lg:hidden
          flex m-0 p-0 list-none
          fixed top-20 left-0 w-full bg-white/98 backdrop-blur-md shadow-lg flex-col items-center justify-start transition-all duration-500 ease-out origin-top
          ${isOpen ? 'opacity-100 scale-y-100 h-[calc(100vh-80px)] overflow-y-auto' : 'opacity-0 scale-y-0 h-0'}
        `}>
                    {mainLinks.map((link, index) => (
                        <li key={index} className="w-full h-20 flex items-center justify-center border-b border-gray-100">
                            <Link
                                to={link.path}
                                className="flex items-center justify-center h-full w-full px-6 text-gray-700 font-medium text-lg hover:text-[#d82b2b] hover:bg-gray-50 transition-colors duration-300"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                    <li className="w-full flex items-center justify-center p-6 mt-2 gap-4">
                        <div className="flex items-center justify-center w-14 h-14 text-gray-700 rounded-full hover:bg-[#d82b2b]/10 cursor-pointer transition-all duration-300">
                            <IoLocationOutline className="text-3xl" />
                        </div>
                        <Link
                            to="/contact"
                            style={{ padding: '12px 20px' }}
                            className="w-full bg-[#d82b2b] text-white text-center font-semibold rounded-full hover:bg-[#b92525] transition-colors duration-300 flex justify-center items-center"
                            onClick={() => setIsOpen(false)}
                        >
                            Book Free Site Visit
                        </Link>
                    </li>
                </ul>

            </div>
        </nav>
    );
};

export default Navbar;
