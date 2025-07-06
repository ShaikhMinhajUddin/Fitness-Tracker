import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';


const EditRoutine = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [routine, setRoutine] = useState(null);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchRoutine = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:3000/r/${id}`, {
            headers: {
              Authorization: `Bearer ${token}` 
            }
          });
          setRoutine(response.data);
          setSelectedTags(response.data.tags);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
  
      fetchRoutine();
    }, [id]);
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:3000/api/categories', {
            headers: {
              Authorization: `Bearer ${token}` 
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
        if (routine?.category) {
          try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:3000/t/tags/${routine.category}`, {
              headers: {
                Authorization: `Bearer ${token}` 
              }
            });
            setTags(response.data);
          } catch (error) {
            console.error('Error fetching tags:', error);
          }
        }
      };
  
      fetchTags();
    }, [routine?.category]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:3000/r/${id}`, {
          ...routine,
          tags: selectedTags,
        }, {
          headers: {
            Authorization: `Bearer ${token}` // Include token in headers
          }
        });
      
        navigate('/db/routineList');
        toast.success('Routine updated successfully!');
      } catch (error) {
        console.error('Error updating routine:', error);
        toast.error('Error updating routine.');
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setRoutine((prevRoutine) => ({
        ...prevRoutine,
        [name]: value,
      }));
    };
  
    const handleCategoryChange = (e) => {
      const { value } = e.target;
      setRoutine((prevRoutine) => ({
        ...prevRoutine,
        category: value,
      }));
      setSelectedTags([]); // Clear selected tags when category changes
    };
  
    const handleTagChange = (e) => {
      const tagId = e.target.value;
      if (e.target.checked) {
        setSelectedTags([...selectedTags, tagId]);
      } else {
        setSelectedTags(selectedTags.filter((tag) => tag !== tagId));
      }
    };
  
    if (loading) {
      return <div className="text-center mt-8">Loading...</div>;
    }
  
    if (error) {
      return <div className="text-center mt-8">Error: {error.message}</div>;
    }
  
    return (
      <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-4 mb-4">
      <ToastContainer /> 
      <h2 className="text-2xl font-bold mb-6">Edit Routine</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Exercise Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={routine.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
            <select
              id="category"
              name="category"
              value={routine.category}
              onChange={handleCategoryChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags:</label>
            <div className="space-y-2">
              {tags.map((tag) => (
                <div key={tag._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={tag._id}
                    value={tag._id}
                    checked={selectedTags.includes(tag._id)}
                    onChange={handleTagChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label htmlFor={tag._id} className="ml-2 block text-sm text-gray-900">
                    {tag.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="sets" className="block text-sm font-medium text-gray-700">Sets:</label>
            <input
              type="number"
              id="sets"
              name="sets"
              value={routine.sets}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="reps" className="block text-sm font-medium text-gray-700">Reps:</label>
            <input
              type="number"
              id="reps"
              name="reps"
              value={routine.reps}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="weights" className="block text-sm font-medium text-gray-700">Weights:</label>
            <input
              type="number"
              id="weights"
              name="weights"
              value={routine.weights}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes:</label>
            <textarea
              id="notes"
              name="notes"
              value={routine.notes}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
               className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    );
  }
export default EditRoutine