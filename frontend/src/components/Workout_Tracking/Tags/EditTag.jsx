import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditTag = () => {
  const { id } = useParams(); 
  const [tagName, setTagName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTag = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/t/${id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setTagName(response.data.name);
      } catch (error) {
        setError('There was an error fetching the tag. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTag();
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/t/${id}`, { name: tagName },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTagName('');
      navigate('/db/tagList');
      toast.success('Tag updated successfully!');
    } catch (error) {
      setError('There was an error updating the tag. Please try again later.');
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-4 mb-4">
      <ToastContainer /> 
      <h2 className="text-2xl font-bold mb-6 ">Edit Tag</h2>
      <form onSubmit={handleFormSubmit} className="space-y-4 p-4">
        <div>
          <label htmlFor="tagName" className="block text-sm font-medium text-gray-700">Tag Name:</label>
          <input
            type="text"
            id="tagName"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"

      >
          Update
        </button>
      </form>
    </div>
  );
}

export default EditTag;
