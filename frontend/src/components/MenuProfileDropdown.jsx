import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const MenuProfileDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const { logout } = useAuth();
  let timer;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser({
        username: storedUser.username,
        profileImage: storedUser.profileImage,
      });
    }
  }, []);

  const handleLogout = () => {
    logout(); 
    navigate('/');
  };

  const handleMouseEnter = () => {
    clearTimeout(timer);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timer = setTimeout(() => {
      setDropdownOpen(false);
    }, 200); // Adjust the delay as needed
  };

  const imageSrc = user?.profileImage
    ? `http://localhost:3000/${user.profileImage}`
    : `https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg`;

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="cursor-pointer flex items-center gap-2">
        <img src={imageSrc} alt="Avatar" className="w-12 h-12 rounded-full" /> {/* Increased image size */}
        <span className="font-semibold">{user?.username}</span>
        <FaChevronDown className={`transition-transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
      </div>
      {dropdownOpen && (
        <div
          className="absolute left-0 mt-2 w-48 bg-black  shadow-lg rounded-md  z-10 border border-primary font-semibold"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            to="/profilepage"
            className="block px-4 py-2 text-gray-50  hover:bg-primary  cursor-pointer border-b border-b-primary"
          >
            Profile
          </Link>
        
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-50  hover:bg-primary  cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuProfileDropdown;
