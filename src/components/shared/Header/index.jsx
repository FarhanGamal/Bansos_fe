import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; // pakai useNavigate
import { logout } from "../../../services/auth";

export default function Header() {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsSubMenuOpen(true);
  };

  const handleLogout = () => {
    logout(); // panggil service logout
    navigate("/login"); // redirect ke login
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsSubMenuOpen(false);
    }, 200);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <header className="bg-blue-300 dark:bg-gray-800 w-full">
      <nav className="border-gray-200 px-5 py-2.5">
        <div className="flex flex-wrap justify-between items-center max-w-screen-xl mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Bansos Jatijajar
            </span>
          </Link>

          {/* Logout */}
          <div className="flex items-center lg:order-2">
            <button
              onClick={handleLogout}
              className="flex items-center bg-rose-50 border-2 border-rose-200 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-rose-200 dark:hover:bg-gray-700 group"
            >
              Logout
            </button>
          </div>

          {/* Menu Utama */}
          <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  to="/"
                  className="block py-2 pr-4 pl-3 text-white rounded bg-indigo-700 lg:bg-transparent lg:text-indigo-700 lg:p-0 dark:text-white"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  to="/kriteria_2"
                  className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-indigo-700 lg:p-0 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Kriteria 2
                </Link>
              </li>

              {/* Submenu Data */}
              <li
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={toggleSubMenu}
                  className="w-full lg:w-auto block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 lg:border-0 lg:hover:text-indigo-700 lg:p-0 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                >
                  Data
                </button>

                {isSubMenuOpen && (
                  <ul className="absolute z-10 bg-white border border-gray-200 shadow-md mt-2 min-w-[160px] dark:bg-gray-800 dark:border-gray-700 transition-opacity duration-200">
                    <li>
                      <Link
                        to="/types"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Jenis Bansos
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/criterias"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Kriteria
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <Link
                  to="/analisis"
                  className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-indigo-700 lg:p-0 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Analisis
                </Link>
              </li>

              <li>
                <Link
                  to="/report"
                  className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-indigo-700 lg:p-0 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Laporan
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
