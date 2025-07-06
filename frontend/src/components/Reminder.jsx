import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
import Fit from '../components/Fit.jsx'; 

const Reminder = ({ onSetReminder }) => {
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState('workout');

  const handleSetReminder = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (type && date) {
      const reminderDate = new Date(date);
      const currentTime = new Date();
      const timeDiff = reminderDate - currentTime;
  
      if (timeDiff > 0) {
        // Only set reminder if the selected date is in the future
        onSetReminder(type, date);
        const formattedDate = format(date, 'MMMM d, yyyy h:mm a');
        setTimeout(() => {
          alert(`Time for your ${type}! (${formattedDate})`);
        }, timeDiff);
      } else {
        // Show error message if the selected date is not in the future
        toast.error('Please select a future date and time');
      }
    } else {
      // Show error message if either type or date is not selected
      toast.error('Please select both type and date');
    }
  };
  
  return (
    <div className="flex flex-col items-center mt-4">
      <select
        onChange={(e) => setType(e.target.value)}
        value={type}
        className="mb-4 p-2 border rounded-lg text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
        style={{ width: '200px' }} // Custom width
      >
        <option value="workout">Workout</option>
        <option value="meal">Meal</option>
      </select>
      <Fit>
  <div style={{ maxWidth: '322px' }}> {/* Adjust the max-width to fit within the required width */}
    <DateTimePicker
      onChange={setDate}
      value={date}
      className="mb-4 p-2 border rounded-lg text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
    />
  </div>
</Fit>

      <button
        onClick={handleSetReminder}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Set Reminder
      </button>
     
    </div>
  );
};

export default Reminder;
