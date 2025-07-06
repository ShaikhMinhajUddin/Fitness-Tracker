import React from "react";
import ProfileDropdown from "../ProfileDropdown";
import { Navlinks } from "./Navbar";  // Ensure Navlinks is exported from Navbar
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import MenuProfileDropdown from "../MenuProfileDropdown";

const ResponsiveMenu = ({ showMenu }) => {
  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-black text-white px-8 pb-6 pt-16 text-black transition-all duration-200 md:hidden rounded-r-xl shadow-md`}
    >
      <div className="card">
        <div className="flex items-center justify-start gap-3">
         
            <MenuProfileDropdown/>
         
        </div>
        <nav className="mt-12">
          <ul className="space-y-4 text-xl  ">
            {Navlinks.map(({ id, name, link }) => (
              <li key={id}>
                <ScrollLink
                  to={link}
                  spy={true}
                  smooth={true}
                  offset={-50}
                  duration={500}
                  className="mb-5 inline-block cursor-pointer hover:text-primary"
                >
                  {name}
                </ScrollLink>
              </li>
            ))}
            <li>
              <Link to="/db/dashboard" className="mb-5 inline-block">
                <button
                  data-aos="fade-up"
                  data-aos-delay="700"
                  data-aos-once="true"
                  className="primary-btn"
                >
                  Dashboard
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
