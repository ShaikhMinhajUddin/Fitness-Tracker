import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditProgress() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        weight: '',
        chest: '',
        waist: '',
        hips: '',
        runTime: '',
        benchPress: '',
        squat: '',
        deadlift: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:3000/progress/${id}`,{
            headers: {
              Authorization: `Bearer ${token}` 
            }
          })
            .then(response => {
                setFormData(response.data);
            })
            .catch(error => {
                console.error('Error fetching progress data:', error);
                toast.error('Error fetching progress data.');
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:3000/progress/${id}`, formData,{
                headers: {
                  Authorization: `Bearer ${token}` 
                }
        });
            toast.success('Progress updated successfully!');
            navigate('/db/progressList');
        } catch (error) {
            console.error('Error updating progress data:', error);
            toast.error('Error updating progress. Please try again.');
        }
    };

    return (
          <div className="container mx-auto px-4 py-8">
            <ToastContainer />
            
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-5 text-gray-800">Edit Fitness Progress</h1>
                {[
                    { label: 'Lifting Weight (lbs):', name: 'weight' },
                    { label: 'Chest (in):', name: 'chest' },
                    { label: 'Waist (in):', name: 'waist' },
                    { label: 'Hips (in):', name: 'hips' },
                    { label: 'Run Time (mins):', name: 'runTime' },
                    { label: 'Bench Press (lbs):', name: 'benchPress' },
                    { label: 'Squat (lbs):', name: 'squat' },
                    { label: 'Deadlift (lbs):', name: 'deadlift' }
                ].map(({ label, name }) => (
                    <div key={name} className="mb-4">
                        <div className="grid grid-cols-2 gap-4 flex  items-center">
                        <label htmlFor={name} className="block mb-1 text-gray-800 font-semibold">{label}</label>
                        <input
                            type="number"
                            name={name}
                            id={name}
                            value={formData[name]}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                            step="0.01"
                            min="0"
                            required
                        />
                    </div>
                    </div>
                ))}
                <button
                    type="submit"
                    className="w-full py-2 px-6 bg-blue-600 text-white font-bold text-lg font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Update
                </button>
            </form>
        </div>
    );
}

export default EditProgress;
