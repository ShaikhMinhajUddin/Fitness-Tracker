// Notification.js
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = ({ showNotification, stopNotification }) => {
  return (
    <div className="flex justify-center mt-4">
      {showNotification && (
        <div>
       
        </div>
      )}
    </div>
  );
};

export default Notification;
