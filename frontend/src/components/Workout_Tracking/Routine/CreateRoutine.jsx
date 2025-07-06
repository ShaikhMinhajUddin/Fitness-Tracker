import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function CreateRoutine() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [routineName, setRoutineName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weights, setWeights] = useState('');
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        const response = await axios.get('http://localhost:3000/api/categories', {
          headers: {
            Authorization: `Bearer ${token}` // Pass the token in the Authorization header
          }
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchTags = async () => {
      if (selectedCategory) {
        try {
          const token = localStorage.getItem('token'); // Retrieve the token from localStorage
          const response = await axios.get(`http://localhost:3000/t/tags/${selectedCategory}`, {
            headers: {
              Authorization: `Bearer ${token}` // Pass the token in the Authorization header
            }
          });
          setTags(response.data);
        } catch (error) {
          console.error('Error fetching tags:', error);
        }
      } else {
        setTags([]);
      }
    };

    fetchTags();
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedTags([]);
  };

  const handleTagChange = (e) => {
    const tagId = e.target.value;
    if (e.target.checked) {
      setSelectedTags([...selectedTags, tagId]);
    } else {
      setSelectedTags(selectedTags.filter(tag => tag !== tagId));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const response = await axios.post('http://localhost:3000/r/post', {
        name: routineName,
        category: selectedCategory,
        tags: selectedTags,
        sets: parseInt(sets, 10),
        reps: parseInt(reps, 10),
        weights: parseInt(weights, 10) || 0,
        notes: notes,
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Pass the token in the Authorization header
        }
      });
      toast.success('Routine created successfully!');
      navigate('/db/routineList');
      setRoutineName('');
      setSets('');
      setReps('');
      setWeights('');
      setNotes('');
      setSelectedCategory('');
      setSelectedTags([]);
    } catch (error) {
      console.error('Error creating routine:', error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Error creating routine. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-4 mb-4">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6">Create Routine</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="routineName" className="block text-sm font-medium text-gray-700">Exercise Name:</label>
          <input
            type="text"
            id="routineName"
            value={routineName}
            onChange={(e) => setRoutineName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>
        {selectedCategory && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Tags:</label>
            <div className="mt-1 grid grid-cols-3 gap-4">
              {tags.map(tag => (
                <label key={tag._id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={tag._id}
                    checked={selectedTags.includes(tag._id)}
                    onChange={handleTagChange}
                    className="form-checkbox h-5 w-5 text-indigo-600"
                  />
                  <span className="text-sm">{tag.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        <div>
          <label htmlFor="sets" className="block text-sm font-medium text-gray-700">Sets:</label>
          <input
            type="number"
            id="sets"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            inputMode="numeric"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="reps" className="block text-sm font-medium text-gray-700">Reps:</label>
          <input
            type="number"
            id="reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            inputMode="numeric"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="weights" className="block text-sm font-medium text-gray-700">Weights:</label>
          <input
            type="number"
            id="weights"
            value={weights}
            onChange={(e) => setWeights(e.target.value)}
            inputMode="numeric"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes:</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Routine
        </button>
      </form>
    </div>
  );
}

export default CreateRoutine;
