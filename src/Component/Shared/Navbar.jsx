import logo from "../../assets/mainlogo.png";
import { Link, NavLink } from "react-router";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu toggle

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-black lg:text-white p-3 hover:border-2 hover:rounded-2xl hover:border-gray-900   ${
              isActive ? "md:border-2 rounded-2xl border-gray-900 " : ""
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/biodatas"
          className={({ isActive }) =>
            `text-black lg:text-white p-3 hover:border-2 hover:rounded-2xl hover:border-gray-900  ${
              isActive ? "border-2 rounded-2xl border-gray-900 " : ""
            }`
          }
        >
          Biodatas
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `text-black lg:text-white p-3 hover:border-2 hover:rounded-2xl hover:border-gray-900  ${
              isActive ? "border-2 rounded-2xl border-gray-900 " : ""
            }`
          }
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            `text-black lg:text-white p-3 hover:border-2 hover:rounded-2xl hover:border-gray-900  ${
              isActive ? "border-2 rounded-2xl border-gray-900 " : ""
            }`
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact-us"
          className={({ isActive }) =>
            `text-black lg:text-white p-3 hover:border-2 hover:rounded-2xl hover:border-gray-900  ${
              isActive ? "border-2 rounded-2xl border-gray-900 " : ""
            }`
          }
        >
          Contact Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div>
      <nav className="fixed bg-[#00000063] w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <div className="w-15 md:w-25 rounded-full">
              <img className="rounded-full"src={logo} alt="Logo" />
            </div>
          </Link>

          {/* Login & Registration */}
          <div className="flex md:order-2 space-x-3">
            <Link
              to="/login"
              className="p-3 border-2 rounded-2xl shadow-2xl font-bold bg-[#fa8c8f] text-white hover:bg-red-500"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="p-3 border-2 rounded-2xl shadow-2xl font-bold bg-[#fa8c8f] text-white hover:bg-red-500"
            >
              Registration
            </Link>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)} // Toggle menu
              type="button"
              className="bg-white inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Nav Links */}
          <div
            className={`${
              isOpen ? "block bg-white" : "hidden"
            } w-full lg:flex lg:w-auto lg:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 lg:p-0 mt-10 font-medium border border-gray-100 rounded-lg md:space-y-2 lg:space-x-8 lg:flex-row  md:mt-0 md:border-0 ">
              {links}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
