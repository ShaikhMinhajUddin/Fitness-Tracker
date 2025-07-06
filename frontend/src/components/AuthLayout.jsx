// AuthLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet only, not BrowserRouter and Routes
import Sidebar from './Sidebar';
import Header from './Header';


const AuthLayout = ({ isSidebarOpen, toggleSidebar }) => (
  <div className="flex flex-col lg:flex-row min-h-full bg-gray-100">
    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    <div className="flex flex-col flex-1">
      <Header toggleSidebar={toggleSidebar} />
      
      <Outlet /> {/* This will render child routes */}
    </div>
  </div>
);

export default AuthLayout;
