import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View } from '@react-pdf/renderer';
import { CSVLink } from 'react-csv';
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  SortAscendingIcon,
  SortDescendingIcon
} from '@heroicons/react/outline';

function NutritionList() {
  const [nutritions, setNutritions] = useState([]);
  const [mealTypes, setMealTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [nutritionsPerPage] = useState(5);
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMealType, setFilterMealType] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const nutritionResponse = await axios.get('http://localhost:3000/nutrition/',{
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        setNutritions(nutritionResponse.data);
        const mealTypesResponse = await axios.get('http://localhost:3000/type/mealTypes',{
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        setMealTypes(mealTypesResponse.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token'); 
      await axios.delete(`http://localhost:3000/nutrition/${id}`,{
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      setNutritions(prevNutritions => prevNutritions.filter(nutrition => nutrition._id !== id));
      toast.success('Nutrition entry deleted successfully!');
    } catch (error) {
      console.error('Error deleting nutrition entry:', error);
      toast.error('Error deleting nutrition entry!');
    }
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const csvHeaders = [
    { label: 'Meal Type', key: 'mealType' },
    { label: 'Food Items', key: 'name' },
    { label: 'Quantity', key: 'quantity' },
    { label: 'Calories', key: 'calories' },
    { label: 'Carbohydrates', key: 'carbohydrates' },
    { label: 'Proteins', key: 'proteins' },
    { label: 'Fats', key: 'fats' },
    { label: 'Created At', key: 'createdAt' },
    { label: 'Updated At', key: 'updatedAt' }
  ];

  const PDFReport = () => (
    <Document>
    <Page>
      <View style={{ flexDirection: 'row', borderBottom: '1px solid #ccc', paddingBottom: 5, backgroundColor: 'black', color:'orange', padding: '8px 3px', borderStyle:'solid', borderWidth:'5px', borderRadius:'3px', }}>
        <Text style={{ flex: 1, fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>Meal Type</Text>
        <Text style={{ flex: 2, fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>Food Items</Text>
        <Text style={{ flex: 1, fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>Quantity</Text>
        <Text style={{ flex: 1, fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>Calories</Text>
        <Text style={{ flex: 1, fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>Carbohydrates</Text>
        <Text style={{ flex: 1, fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>Proteins</Text>
        <Text style={{ flex: 1, fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>Fats</Text>
        <Text style={{ flex: 1, fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>Created At</Text>
        <Text style={{ flex: 1, fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>Updated At</Text>
      </View>
      {/* Render PDF content here */}
      {filteredNutritions.map(item => (
        <View key={item._id} style={{ flexDirection: 'row', borderBottom: '1px solid #ccc', paddingBottom: 5, paddingTop: 5, backgroundColor: (filteredNutritions.indexOf(item) % 2 === 0) ? '#ffffff' : '#f9f9f9' }}>
          <Text style={{ flex: 1, fontSize: 10, textAlign: 'center' }}>{mealTypes.find(mealType => mealType._id === item.mealType)?.name}</Text>
          <Text style={{ flex: 2, fontSize: 10, textAlign: 'center' }}>{item.name}</Text>
          <Text style={{ flex: 1, fontSize: 10, textAlign: 'center' }}>{item.quantity}</Text>
          <Text style={{ flex: 1, fontSize: 10, textAlign: 'center' }}>{item.calories}</Text>
          <Text style={{ flex: 1, fontSize: 10, textAlign: 'center' }}>{item.carbohydrates}</Text>
          <Text style={{ flex: 1, fontSize: 10, textAlign: 'center' }}>{item.proteins}</Text>
          <Text style={{ flex: 1, fontSize: 10, textAlign: 'center' }}>{item.fats}</Text>
          <Text style={{ flex: 1, fontSize: 10, textAlign: 'center', paddingRight: '2px' }}>{formatDateTime(item.createdAt)}</Text>
          <Text style={{ flex: 1, fontSize: 10, textAlign: 'center' }}>{formatDateTime(item.updatedAt)}</Text>
        </View>
      ))}
    </Page>
  </Document>
  
  );

  const TableBody = () => (
    <tbody>
        {currentNutritions.map(item => (
            <tr key={item._id} className="bg-white hover:bg-gray-100 border-b border-gray-300">
                <td className="px-4 py-2 border-r border-gray-300">{mealTypes.find(mealType => mealType._id === item.mealType)?.name}</td>
                <td className="px-4 py-2 border-r border-gray-300">{item.name}</td>
                <td className="px-4 py-2 border-r border-gray-300">{item.quantity}</td>
                <td className="px-4 py-2 border-r border-gray-300">{item.calories}</td>
                <td className="px-4 py-2 border-r border-gray-300">{item.carbohydrates}</td>
                <td className="px-4 py-2 border-r border-gray-300">{item.proteins}</td>
                <td className="px-4 py-2 border-r border-gray-300">{item.fats}</td>
                <td className="px-4 py-2 border-r border-gray-300">{formatDateTime(item.createdAt)}</td>
                <td className="px-4 py-2 border-r border-gray-300">{formatDateTime(item.updatedAt)}</td>
                <td className="px-4 py-2 ">
                    <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 focus:outline-none"
                    >
                        <TrashIcon className="w-6 h-6" />
                    </button>
                    <Link to={`/db/editNutrition/${item._id}`}>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2 focus:outline-none mt-2">
                            <PencilIcon className="w-6 h-6" />
                        </button>
                    </Link>
                </td>
            </tr>
        ))}
    </tbody>
  );


  const csvData = useMemo(() => {
    return nutritions.map(item => ({
      ...item,
      mealType: mealTypes.find(mealType => mealType._id === item.mealType)?.name, // Map mealType name instead of ID
      createdAt: formatDateTime(item.createdAt),
      updatedAt: formatDateTime(item.updatedAt),
    }));
  }, [nutritions, mealTypes]);
  

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (column) => {
    setSortOrder(column === sortColumn && sortOrder === 'asc' ? 'desc' : 'asc');
    setSortColumn(column);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e) => {
    setFilterMealType(e.target.value);
  };

  const filteredNutritions = useMemo(() => {
    return nutritions.filter(nutrition => {
      const matchSearchTerm = [
        nutrition.name,
        nutrition.quantity,
        nutrition.calories,
        nutrition.carbohydrates,
        nutrition.proteins,
        nutrition.fats,
        formatDateTime(nutrition.createdAt),
        formatDateTime(nutrition.updatedAt)
      ].some(field => {
        if (typeof field === 'number') {
          return field.toString().toLowerCase().includes(searchTerm.toLowerCase());
        } else {
          return field.toLowerCase().includes(searchTerm.toLowerCase());
        }
      });

      const matchMealType = filterMealType === '' || nutrition.mealType === filterMealType;
      return matchSearchTerm && matchMealType;
    });
  }, [nutritions, searchTerm, filterMealType]);

  const sortedNutritions = useMemo(() => {
    return filteredNutritions.sort((a, b) => {
      const aValue = (a[sortColumn] || '').toString().toLowerCase();
      const bValue = (b[sortColumn] || '').toString().toLowerCase();
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
  }, [filteredNutritions, sortColumn, sortOrder]);

  const indexOfLastNutrition = currentPage * nutritionsPerPage;
  const indexOfFirstNutrition = indexOfLastNutrition - nutritionsPerPage;
  const currentNutritions = sortedNutritions.slice(indexOfFirstNutrition, indexOfLastNutrition);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-red-500">Error: {error.message}</div>;
  }

  const SortableHeader = ({ column, children }) => {
    const isCurrentColumn = sortColumn === column;
    return (
      <th
        className="px-4 py-2 cursor-pointer whitespace-nowrap border-b border-gray-300"
        onClick={() => handleSort(column)}
      >
        {children}
        <SortAscendingIcon
          className={`w-4 h-4 inline ml-1 ${isCurrentColumn && sortOrder === 'asc' ? 'text-blue-500' : 'text-gray-400'}`}
        />
        <SortDescendingIcon
          className={`w-4 h-4 inline ml-1 ${isCurrentColumn && sortOrder === 'desc' ? 'text-blue-500' : 'text-gray-400'}`}
        />
      </th>
    );
  };

  return (
    <div className="flex items-center justify-center  bg-gray-100">
      <ToastContainer />
      <div className="max-w-4xl w-full mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Nutrition List</h1>
        <div className="flex flex-col md:flex-row justify-between gap-1 mb-4">
          <div className="flex flex-col md:flex-row items-center mb-2 md:mb-0">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 mr-2 mb-2 md:mb-0"
            />
            <select
              value={filterMealType}
              onChange={handleFilter}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 mb-2 md:mb-0"
            >
              <option value="">Filter by Meal Type</option>
              {mealTypes.map(mealType => (
                <option key={mealType._id} value={mealType._id}>{mealType.name}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => navigate('/db/createNutrition')}
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-600 focus:outline-none"
          >
            <PlusIcon className="w-6 h-6 mr-2" />
            Add Nutrition
          </button>
          <CSVLink
            data={csvData}
            headers={csvHeaders}
            filename="nutrition_data.csv"
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600 focus:outline-none"
          >
            Export CSV
          </CSVLink>
          <PDFDownloadLink
            document={<PDFReport />}
            fileName="nutrition_data.pdf"
            className="bg-red-500 text-white px-4 py-2 rounded flex items-center hover:bg-red-600 focus:outline-none"
          >
            Export PDF
          </PDFDownloadLink>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 divide-y divide-gray-200">
            <thead className="divide-y divide-gray-200 bg-gray-50">
              <tr className="divide-x divide-gray-200">
                <SortableHeader column="mealType">Meal Type</SortableHeader>
                <SortableHeader column="name">Food Items</SortableHeader>
                <SortableHeader column="quantity">Quantity</SortableHeader>
                <SortableHeader column="calories">Calories</SortableHeader>
                <SortableHeader column="carbohydrates">Carbohydrates</SortableHeader>
                <SortableHeader column="proteins">Proteins</SortableHeader>
                <SortableHeader column="fats">Fats</SortableHeader>
                <SortableHeader column="createdAt">Created At</SortableHeader>
                <SortableHeader column="updatedAt">Updated At</SortableHeader>
                <th className="px-4 py-2 border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <TableBody />
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <ul className="flex list-none rounded border border-gray-300 divide-x divide-gray-300">
            <li
              className={`px-3 py-2 cursor-pointer ${currentPage === 1 ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
              onClick={() => handlePageChange(1)}
            >
              First
            </li>
            {Array.from({ length: Math.ceil(sortedNutritions.length / nutritionsPerPage) }).map(
              (_, index) => (
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
              className={`px-3 py-2 cursor-pointer ${currentPage === Math.ceil(sortedNutritions.length / nutritionsPerPage) ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
              onClick={() => handlePageChange(Math.ceil(sortedNutritions.length / nutritionsPerPage))}
            >
              Last
            </li>
          </ul>
        </div>
      </div>
   
      {/* 
      <Link to="/nutrition-analytics" className="text-blue-500 hover:underline">View Nutrition Analytics</Link>
   */}
    
    </div>
  );
}

export default NutritionList;