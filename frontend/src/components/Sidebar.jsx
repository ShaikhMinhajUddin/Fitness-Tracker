import React, { useState } from 'react';
import { FaHome, FaBars, FaChevronDown, FaChevronUp, FaDumbbell, FaChartLine, FaRunning, FaUtensils, FaListAlt, FaCog, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DarkMode from "../components/Navbar/DarkMode";

import MenuProfileDropdown from './MenuProfileDropdown';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSecondDropdownOpen, setSecondDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleSecondDropdown = () => {
    setSecondDropdownOpen(!isSecondDropdownOpen);
  };

  return (
    <div className={` fixed lg:static lg:w-64 bg-gradient-to-r from-orange-500 to-orange-400 text-black flex flex-col transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 min-h-screen`}>
      <div className="p-4 flex justify-between items-center lg:hidden">
        <MenuProfileDropdown/>
       
        {/*
        <button onClick={toggleSidebar} className="text-black p-4 focus:outline-none absolute right-0" aria-label="Toggle Sidebar">
          <FaBars className="text-2xl" />
        </button>*/}
      </div>
      <div className="hidden lg:flex lg:flex-col lg:items-center lg:p-4 lg:text-2xl lg:font-bold mt-2">
        User Dashboard
      </div>
      <ul className="flex-1 p-4 space-y-4">
        <li>
          <Link to="/db/dashboard" className="flex items-center hover:bg-black hover:text-white p-2 rounded-lg transition duration-300 bg-gradient-to-r from-yellow-500 to-orange-500">
            <FaHome className="text-2xl" />
            <span className="ml-4 lg:ml-2">Dashboard</span>
          </Link>
        </li>

        {/* First Dropdown */}
        <li className="flex flex-col">
          <div className="flex items-center justify-between cursor-pointer hover:bg-black hover:text-white  p-2 rounded-lg transition duration-300 bg-gradient-to-r from-yellow-500 to-orange-500" onClick={toggleDropdown}>
            <div className="flex items-center">
              <FaDumbbell className="text-2xl" />
              <span className="ml-4 lg:ml-2">Workout Tracking</span>
            </div>
            <div>
              {isDropdownOpen ? <FaChevronUp className="text-1xl" /> : <FaChevronDown className="text-1xl" />}
            </div>
          </div>
          {isDropdownOpen && (
            <ul className="ml-8 mt-2 space-y-2">
              <li>
                <Link to="/db/routineList" className="flex items-center hover:bg-black hover:text-white  p-2 rounded-lg transition duration-300 bg-gradient-to-r from-yellow-500 to-orange-500">
                  <FaRunning className="text-2xl" />
                  <span className="ml-4 lg:ml-2">Add Workout</span>
                </Link>
              </li>
              <li>
                <Link to="/db/categoryList" className="flex items-center hover:bg-black hover:text-white  p-2 rounded-lg transition duration-300 bg-gradient-to-r from-yellow-500 to-orange-500">
                  <FaCog className="text-2xl" />
                  <span className="ml-4 lg:ml-2">Add More Category</span>
                </Link>
              </li>
              <li>
                <Link to="/db/tagList" className="flex items-center hover:bg-black hover:text-white  p-2 rounded-lg transition duration-300 bg-gradient-to-r from-yellow-500 to-orange-500">
                  <FaCog className="text-2xl" />
                  <span className="ml-4 lg:ml-2">Add More Tags</span>
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Second Dropdown */}
        <li className="flex flex-col">
          <div className="flex items-center justify-between cursor-pointer hover:bg-black hover:text-white  p-2 rounded-lg transition duration-300 bg-gradient-to-r from-yellow-500 to-orange-500" onClick={toggleSecondDropdown}>
            <div className="flex items-center">
              <FaListAlt className="text-2xl" />
              <span className="ml-4 lg:ml-2">Nutrition Tracking</span>
            </div>
            <div>
              {isSecondDropdownOpen ? <FaChevronUp className="text-1xl" /> : <FaChevronDown className="text-1xl" />}
            </div>
          </div>
          {isSecondDropdownOpen && (
            <ul className="ml-8 mt-2 space-y-2">
              <li>
                <Link to="/db/nutritionList" className="flex items-center hover:bg-black hover:text-white  p-2 rounded-lg transition duration-300 bg-gradient-to-r from-yellow-500 to-orange-500">
                  <FaUtensils className="text-2xl" />
                  <span className="ml-4 lg:ml-2">Add Nutrition</span>
                </Link>
              </li>
              <li>
                <Link to="/db/mealTypeList" className="flex items-center hover:bg-black hover:text-white  p-2 rounded-lg transition duration-300 bg-gradient-to-r from-yellow-500 to-orange-500">
                  <FaCog className="text-2xl" />
                  <span className="ml-4 lg:ml-2">Add More Meal</span>
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link to="/db/progressList" className="flex items-center hover:bg-black hover:text-white  p-2 rounded-lg transition duration-300 bg-gradient-to-r from-yellow-500 to-orange-500">
            <FaChartLine className="text-2xl" />
            <span className="ml-4 lg:ml-2">Progress Tracking</span>
          </Link>
        </li>

        <li>
          <Link to="/db/mainReminder" className="flex items-center hover:bg-black hover:text-white  p-2 rounded-lg transition duration-300 bg-gradient-to-r from-yellow-500 to-orange-500">
            <FaPlus className="text-2xl" />
            <span className="ml-4 lg:ml-2">Set Reminder</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
