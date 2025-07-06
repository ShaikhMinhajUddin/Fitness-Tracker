import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PencilIcon, TrashIcon, PlusIcon, SortAscendingIcon, SortDescendingIcon } from '@heroicons/react/outline';


const RoutineList = () => {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterColumn, setFilterColumn] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [routinesPerPage] = useState(5);
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const [routineResponse, categoriesResponse, tagsResponse] = await Promise.all([
        axios.get('http://localhost:3000/r/', {
          headers: {
            Authorization: `Bearer ${token}` // Include token in headers
          }
        }),
        axios.get('http://localhost:3000/api/categories', {
          headers: {
            Authorization: `Bearer ${token}` // Include token in headers
          }
        }),
        axios.get('http://localhost:3000/t/tag', {
          headers: {
            Authorization: `Bearer ${token}` // Include token in headers
          }
        })
      ]);

      const routinesData = routineResponse.data.map(routine => {
        const category = categoriesResponse.data.find(cat => cat._id === routine.category);
        const tags = routine.tags.map(tagId => {
          const tag = tagsResponse.data.find(t => t._id === tagId);
          return tag ? tag.name : '';
        });

        return {
          ...routine,
          category: category ? category.name : '',
          tags: tags.join(', '),
          dates: routine.dates || []
        };
      });

      setRoutines(routinesData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/r/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      setRoutines(routines.filter(routine => routine._id !== id));
      toast.success('Routine deleted successfully!');
    } catch (error) {
      console.error('Error deleting routine:', error);
      toast.error('Error deleting routine.');
    }
  };

  const formatDateTime = useCallback((dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }, []);

  const handleEdit = (id) => {
    navigate(`/db/editRoutine/${id}`);
  };

  const handleCreate = () => {
    navigate('/db/createRoutine');
  };

  const handleFilterColumnChange = (e) => {
    setFilterColumn(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const prepareWeightData = (routines) => {
    return routines.map(routine => ({
      date: new Date(routine.dateTime),
      weight: routine.weights
    }));
  };

  const prepareFrequencyData = (routines) => {
    const frequencyMap = new Map();
    routines.forEach(routine => {
      const date = new Date(routine.dateTime).toLocaleDateString();
      if (frequencyMap.has(date)) {
        frequencyMap.set(date, frequencyMap.get(date) + 1);
      } else {
        frequencyMap.set(date, 1);
      }
    });
    return Array.from(frequencyMap, ([date, count]) => ({ date, count }));
  };

  const prepareHistoryData = (routines) => {
    return routines.map(routine => ({
      date: new Date(routine.dateTime),
      value: routine.sets // or reps, weights, etc.
    }));
  };

  const SortableHeader = ({ column, currentColumn, currentOrder, onClick, children }) => {
    const isCurrentColumn = currentColumn === column;
    const isAscending = isCurrentColumn && currentOrder === 'asc';
    const isDescending = isCurrentColumn && currentOrder === 'desc';

    return (
      <th
        className="px-4 py-2 cursor-pointer whitespace-nowrap border-b border-gray-300"
        onClick={() => onClick(column)}
      >
        {children}
        <SortAscendingIcon
          className={`w-4 h-4 inline ml-1 ${isAscending ? 'text-blue-500' : 'text-gray-400'}`}
        />
        <SortDescendingIcon
          className={`w-4 h-4 inline ml-1 ${isDescending ? 'text-blue-500' : 'text-gray-400'}`}
        />
      </th>
    );
  };

  const sortedRoutines = [...routines].sort((a, b) => {
    const aValue = (a[sortColumn] || '').toString().toLowerCase();
    const bValue = (b[sortColumn] || '').toString().toLowerCase();
    if (sortOrder === 'asc') {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const searchTermNormalized = searchTerm.replace(/[,\-\/\s]/g, '').toLowerCase();

  const filteredRoutines = sortedRoutines.filter(routine => {
    if (!filterColumn || filterColumn === 'all') {
      return Object.values(routine).some(value => {
        const valueNormalized = typeof value === 'string' ? value.replace(/[,\-\/\s]/g, '').toLowerCase() : value.toString().replace(/[,\-\/\s]/g, '').toLowerCase();
        if (searchTermNormalized.length < 3) {
          return valueNormalized.startsWith(searchTermNormalized);
        } else {
          return valueNormalized.includes(searchTermNormalized);
        }
      });
    } else {
      const value = routine[filterColumn];
      const valueNormalized = typeof value === 'string' ? value.replace(/[,\-\/\s]/g, '').toLowerCase() : value.toString().replace(/[,\-\/\s]/g, '').toLowerCase();
      if (searchTermNormalized.length < 3) {
        return valueNormalized.startsWith(searchTermNormalized);
      } else {
        return valueNormalized.includes(searchTermNormalized);
      }
    }
  });

  const indexOfLastRoutine = currentPage * routinesPerPage;
  const indexOfFirstRoutine = indexOfLastRoutine - routinesPerPage;
  const currentRoutines = filteredRoutines.slice(indexOfFirstRoutine, indexOfLastRoutine);

  const weightData = prepareWeightData(filteredRoutines);
  const frequencyData = prepareFrequencyData(filteredRoutines);
  const historyData = prepareHistoryData(filteredRoutines);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex items-center justify-center mt-4 mb-4 bg-gray-100">
      <div className="max-w-4xl w-full mx-auto  p-4 bg-white rounded-lg shadow-md">
        <div>
          <ToastContainer />
        </div>
        <h1 className="text-3xl font-semibold mb-4">Workout Routines</h1>
        <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 md:mr-4 w-full md:w-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search..."
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
            />
          </div>
          <div className="flex items-center mb-4 md:mb-0 md:mr-4 w-full md:w-auto">
            <label htmlFor="filterColumn" className="mr-2">Filter by:</label>
            <select
              id="filterColumn"
              value={filterColumn}
              onChange={handleFilterColumnChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All</option>
              <option value="name">Name</option>
              <option value="category">Category</option>
              <option value="tags">Tags</option>
              <option value="sets">Sets</option>
              <option value="reps">Reps</option>
              <option value="weights">Weights</option>
              <option value="notes">Notes</option>
              <option value="dateTime">Dates</option>
            </select>
          </div>
          <div>
            <button
              onClick={handleCreate}
              className="bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-600 focus:outline-none"
            >
              <PlusIcon className="w-6 h-6 mr-2" />
              Add Routine
            </button>
          </div>
        </div>

        <div className="overflow-x-auto mt-4 border border-gray-300 rounded">
          <table className="w-full table-auto text-sm md:text-base border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <SortableHeader
                  column="name"
                  currentColumn={sortColumn}
                  currentOrder={sortOrder}
                  onClick={handleSort}
                >
                  Exercise Name
                </SortableHeader>
                <SortableHeader
                  column="category"
                  currentColumn={sortColumn}
                  currentOrder={sortOrder}
                  onClick={handleSort}
                >
                  Category
                </SortableHeader>
                <SortableHeader
                  column="tags"
                  currentColumn={sortColumn}
                  currentOrder={sortOrder}
                  onClick={handleSort}
                >
                  Tags
                </SortableHeader>
                <SortableHeader
                  column="sets"
                  currentColumn={sortColumn}
                  currentOrder={sortOrder}
                  onClick={handleSort}
                >
                  Sets
                </SortableHeader>
                <SortableHeader
                  column="reps"
                  currentColumn={sortColumn}
                  currentOrder={sortOrder}
                  onClick={handleSort}
                >
                  Reps
                </SortableHeader>
                <SortableHeader
                  column="weights"
                  currentColumn={sortColumn}
                  currentOrder={sortOrder}
                  onClick={handleSort}
                >
                  Weights
                </SortableHeader>
                <SortableHeader
                  column="notes"
                  currentColumn={sortColumn}
                  currentOrder={sortOrder}
                  onClick={handleSort}
                >
                  Notes
                </SortableHeader>
                <SortableHeader
                  column="dateTime"
                  currentColumn={sortColumn}
                  currentOrder={sortOrder}
                  onClick={handleSort}
                >
                  Dates
                </SortableHeader>
                <th className="px-4 py-2 border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRoutines.map((routine) => (
                <tr key={routine._id} className="bg-white hover:bg-gray-100 border-b border-gray-300">
                  <td className="px-4 py-2 border-r border-gray-300">{routine.name}</td>
                  <td className="px-4 py-2 border-r border-gray-300">{routine.category}</td>
                  <td className="px-4 py-2 border-r border-gray-300">{routine.tags}</td>
                  <td className="px-4 py-2 border-r border-gray-300">{routine.sets}</td>
                  <td className="px-4 py-2 border-r border-gray-300">{routine.reps}</td>
                  <td className="px-4 py-2 border-r border-gray-300">{routine.weights}</td>
                  <td className="px-4 py-2 border-r border-gray-300">{routine.notes}</td>
                  <td className="px-4 py-2 border-r border-gray-300">{formatDateTime(routine.dateTime)}</td>
                  <td className="px-4 py-2  gap-2">
                    <button
                      onClick={() => handleEdit(routine._id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                    >
                      <PencilIcon className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => handleDelete(routine._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 mt-2"
                    >
                      <TrashIcon className="w-6 h-6" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4">
          <ul className="flex list-none rounded border border-gray-300">
            <li
              className={`px-3 py-2 cursor-pointer ${currentPage === 1 ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
              onClick={() => handlePageChange(1)}
            >
              First
            </li>
            {Array.from({ length: Math.ceil(filteredRoutines.length / routinesPerPage) }).map(
              (item, index) => (
                <li
                  key={index}
                  className={`px-3 py-2 cursor-pointer ${currentPage === index + 1 ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </li>
              )
            )}
            <li
              className={`px-3 py-2 cursor-pointer ${
                currentPage === Math.ceil(filteredRoutines.length / routinesPerPage) ? 'bg-gray-300' : 'hover:bg-gray-200'
              }`}
              onClick={() => handlePageChange(Math.ceil(filteredRoutines.length / routinesPerPage))}
            >
              Last
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RoutineList;
