
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notification from './Notification';
import Reminder from './Reminder';
import GoalSetter from './GoalSetter';
import GoalsList from './GoalsList';


const MainReminder = () => {
  const [reminders, setReminders] = useState([]);
  const [goals, setGoals] = useState([]);
  const [showNotification, setShowNotification] = useState(false);



  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('userId');
    if (userIdFromStorage) {
      setUserId(userIdFromStorage);
      fetchReminders(userIdFromStorage);
     
    }
  }, []);
  

  useEffect(() => {
   
    fetchGoals();
  }, []);


  const fetchReminders = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/remind/reminders/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setReminders(response.data);
    } catch (error) {
      console.error('Error fetching reminders:', error);
      toast.error('Failed to fetch reminders');
    }
  };

  const fetchGoals = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.get('http://localhost:3000/gl/goals',{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setGoals(response.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
      toast.error('Failed to fetch goals');
    }
  };

  const handleSetReminder = async (type, date) => {
    const newReminder = { type, date, message: `Time for your ${type}!` };
    try {
      const token = localStorage.getItem('token'); 
      await axios.post('http://localhost:3000/remind/reminders', newReminder,{
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      setReminders([...reminders, newReminder]);
      toast.success('Reminder set successfully');
      setShowNotification(true);
    } catch (error) {
      console.error('Error setting reminder:', error);
      toast.error('Failed to set reminder');
    }
  };

  const handleAddGoal = async (goal) => {
    const newGoal = { goal };
    try {
      const token = localStorage.getItem('token');
      
      // Check if a goal with the same name exists for the user
      const existingGoalsResponse = await axios.get('http://localhost:3000/gl/goals', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      // Assuming the response contains an array of existing goals
      const existingGoals = existingGoalsResponse.data;
  
      // Check if any existing goal has the same name
      const goalExists = existingGoals.some(existingGoal => existingGoal.goal === goal);
  
      if (goalExists) {
        toast.error('Goal with the same name already exists');
        return; // Exit function without adding the goal
      }
  
      // If no existing goal with the same name, proceed to add the new goal
      const response = await axios.post('http://localhost:3000/gl/goals', newGoal, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      // Update state with the newly added goal
      setGoals([...goals, response.data]);
  
      // Show success notification
      toast.success('Goal added successfully');
      setShowNotification(true);
  
    } catch (error) {
      console.error('Error adding goal:', error);
      toast.error('Failed to add goal');
    }
  };
  
  const handleDeleteGoal = async (goalId) => {
    try {
      const token = localStorage.getItem('token'); 
      await axios.delete(`http://localhost:3000/gl/goals/${goalId}`,{
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      fetchGoals();
      toast.success('Archive goal successfully');
    } catch (error) {
      console.error('Error Archive goal:', error);
      toast.error('Failed to Archive goal');
    }
  };

  const stopNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen ">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4 text-center">Fitness Notifications and Alerts</h1>
      <Reminder onSetReminder={handleSetReminder} />
      <Notification showNotification={showNotification} stopNotification={stopNotification} />
      <GoalSetter onAddGoal={handleAddGoal} />
      <GoalsList goals={goals} onDeleteGoal={handleDeleteGoal} />
    </div>
  );
};




export default MainReminder;