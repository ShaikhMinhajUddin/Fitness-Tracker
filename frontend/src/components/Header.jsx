import React from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import ProfileDropdown from "./ProfileDropdown"; 

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-black text-white shadow-lg py-4 px-6 lg:px-8 flex justify-between items-center">
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
        <div className="flex items-center">
          <Link to="/web" className="text-white font-bold text-lg">Back to Home</Link>
        </div>
       
        <div className="hidden lg:block">
          <ProfileDropdown />
        </div>
        
        <button onClick={toggleSidebar} className="lg:hidden text-2xl focus:outline-none">
          <FaBars />
        </button>
      </div>
    </header>
  );
};

export default Header;
