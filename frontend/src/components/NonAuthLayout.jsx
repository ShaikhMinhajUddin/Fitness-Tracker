// NonAuthLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';

const NonAuthLayout = () => (
  <div className="flex flex-col min-h-full bg-gray-100">
    <Outlet />
  </div>
);

export default NonAuthLayout;
