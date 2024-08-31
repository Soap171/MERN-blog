import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../utils/logo.png";
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative flex items-center justify-between sm:h-10 md:justify-center py-6 px-4 text-white">
      <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/" aria-label="Home">
            <img src={logo} height="40" width="40" alt="Logo" />
          </Link>
          <div className="-mr-2 flex items-center md:hidden">
            <button
              type="button"
              id="main-menu"
              aria-label="Main menu"
              aria-haspopup="true"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              onClick={toggleMenu}
            >
              <svg
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="hidden md:flex md:space-x-10">
        <Link
          to="/Technology"
          className="font-medium text-white hover:text-gray-200 transition duration-150 ease-in-out"
        >
          Technology
        </Link>
        <Link
          to="/Health"
          className="font-medium text-white hover:text-gray-200 transition duration-150 ease-in-out"
        >
          Health
        </Link>
        <Link
          to="/Education"
          className="font-medium text-white hover:text-gray-200 transition duration-150 ease-in-out"
        >
          Education
        </Link>
        <Link
          to="/Finance"
          className="font-medium text-white hover:text-gray-200 transition duration-150 ease-in-out"
        >
          Finance
        </Link>
        <div className=" md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
          <span className="inline-flex">
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium text-gray-200 hover:text-gray-200 focus:outline-none transition duration-150 ease-in-out"
            >
              Login
            </Link>
          </span>
          <span className="inline-flex rounded-md ">
            <Link
              to="/signup"
              className="inline-flex items-center px-5 py-2.5 text-white bg-gray-900 hover:bg-white hover:text-black font-medium rounded-full text-sm me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-3"
            >
              Get started
            </Link>
          </span>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 shadow-lg z-10 bg-gradient-to-r from-slate-500 to-slate-800 ">
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link
              to="/Technology"
              className="font-medium text-white hover:text-gray-200 transition duration-150 ease-in-out"
              onClick={toggleMenu}
            >
              Technology
            </Link>
            <Link
              href="/Health"
              className="font-medium text-white hover:text-gray-200 transition duration-150 ease-in-out"
              onClick={toggleMenu}
            >
              Health
            </Link>
            <Link
              to="/Education"
              className="font-medium text-white hover:text-gray-200 transition duration-150 ease-in-out"
              onClick={toggleMenu}
            >
              Education
            </Link>
            <Link
              to="/Finance"
              className="font-medium text-white hover:text-gray-200transition duration-150 ease-in-out"
              onClick={toggleMenu}
            >
              Finance
            </Link>
            <Link
              to="/login"
              className="font-medium text-white hover:text-gray-200 transition duration-150 ease-in-out"
              onClick={toggleMenu}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="font-medium text-white hover:text-gray-200 transition duration-150 ease-in-out "
              onClick={toggleMenu}
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
