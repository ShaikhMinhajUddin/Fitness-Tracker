import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateProgress() {
    const navigate = useNavigate();
    const [newProgress, setNewProgress] = useState({
        weight: '',
        chest: '',
        waist: '',
        hips: '',
        runTime: '',
        benchPress: '',
        squat: '',
        deadlift: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewProgress(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddProgress = (event) => {
        const token = localStorage.getItem('token');
        event.preventDefault();
        axios.post('http://localhost:3000/progress', newProgress,{
            headers: {
              Authorization: `Bearer ${token}` 
            }
    },)
            .then(response => {
                console.log('New progress added:', response.data);
                toast.success('Progress added successfully!');
                navigate('/db/progressList');
                // Reset the form after successfully adding progress
                setNewProgress({
                    weight: '',
                    chest: '',
                    waist: '',
                    hips: '',
                    runTime: '',
                    benchPress: '',
                    squat: '',
                    deadlift: ''
                });
            })
            .catch(error => {
                console.error('Error adding new progress:', error);
                toast.error('Error adding new progress. Please try again.');
            });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            
            
            <ToastContainer />
            <form onSubmit={handleAddProgress} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-5 text-gray-800">Add Fitness Progress</h1>
                <div className="mb-4">
                    <label htmlFor="weight" className="block mb-1 text-gray-800 font-semibold">Lifting Weight (lbs):</label>
                    <input type="number" name="weight" id="weight" value={newProgress.weight} onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label htmlFor="chest" className="block mb-1 text-gray-800 font-semibold">Chest (in):</label>
                        <input type="number" name="chest" id="chest" value={newProgress.chest} onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="waist" className="block mb-1 text-gray-800 font-semibold">Waist (in):</label>
                        <input type="number" name="waist" id="waist" value={newProgress.waist} onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label htmlFor="hips" className="block mb-1 text-gray-800 font-semibold">Hips (in):</label>
                        <input type="number" name="hips" id="hips" value={newProgress.hips} onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="runTime" className="block mb-1 text-gray-800 font-semibold">Run Time (mins):</label>
                        <input type="number" name="runTime" id="runTime" value={newProgress.runTime} onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label htmlFor="benchPress" className="block mb-1 text-gray-800 font-semibold">Bench Press (lbs):</label>
                        <input type="number" name="benchPress" id="benchPress" value={newProgress.benchPress} onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="squat" className="block mb-1 text-gray-800 font-semibold">Squat (lbs):</label>
                        <input type="number" name="squat" id="squat" value={newProgress.squat} onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500" />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="deadlift" className="block mb-1 text-gray-800 font-semibold">Deadlift (lbs):</label>
                    <input type="number" name="deadlift" id="deadlift" value={newProgress.deadlift} onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500" />
                </div>
                <button type="submit" className="w-full py-2 px-6 bg-blue-600 text-white font-bold text-lg font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Add Progress</button>
            </form>
        </div>
    );
}

export default CreateProgress;
