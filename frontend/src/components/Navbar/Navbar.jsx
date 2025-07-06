import React, { useState } from "react";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";
// import ProfileDropdown from "../ProfileDropdown"; ← Removed
import { IoIosFitness } from "react-icons/io";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import '../Navlink.css';

export const Navlinks = [
  { id: 0, name: "Home", link: "home" },
  { id: 1, name: "About", link: "about" },
  { id: 2, name: "Exercise", link: "exercise" },
  { id: 3, name: "Feedback", link: "feedback" },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isAuthenticated } = useAuth();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="fixed sticky top-0 z-50 w-full shadow-md bg-black text-white duration-300">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div data-aos="fade-right" className="flex items-center gap-3 font-semibold text-gray-300 group">
            <IoIosFitness className="text-primary text-2xl animate-pulse group-hover:scale-105 duration-200" />{" "}
            Fitness Tracker
          </div>

          <nav className="hidden md:block">
            <ul className="flex items-center rounded-full gap-8">
              <li className="py-4 rounded-full">
                <Link
                  to={isAuthenticated ? "/db/dashboard" : "/login"}
                  className="inline-block text-lg font-bold hover:text-primary duration-300"
                >
                  <button
                    data-aos="fade-up"
                    data-aos-delay="700"
                    data-aos-once="true"
                    className="primary-btn rounded-full"
                  >
                    Dashboard
                  </button>
                </Link>
              </li>
              {Navlinks.map(({ id, name, link }) => (
                <li key={id} className="py-4">
                  <ScrollLink
                    to={link}
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                    className="inline-block text-lg font-semibold hover:text-primary hover:underline hover:underline-offset-8 duration-300 cursor-pointer"
                    activeClass="active-link"
                  >
                    {name}
                  </ScrollLink>
                </li>
              ))}
              {/* ProfileDropdown removed from here */}
            </ul>
          </nav>

          <div className="flex items-center gap-4 md:hidden">
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            )}
          </div>
        </div>
      </div>
      <ResponsiveMenu showMenu={showMenu} />
    </div>
  );
};

export default Navbar;
