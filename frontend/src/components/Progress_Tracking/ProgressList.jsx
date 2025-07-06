import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { PencilIcon, TrashIcon, PlusIcon, SortAscendingIcon, SortDescendingIcon } from '@heroicons/react/outline';
import { PDFDownloadLink, Document, Page, Text, View } from '@react-pdf/renderer';
import { CSVLink } from 'react-csv';
import ProgressChart from './ProgressChart';

function ProgressList() {
    const [progress, setProgress] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [progressPerPage] = useState(5);
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterColumn, setFilterColumn] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            setError(null);
            const response = await axios.get('http://localhost:3000/progress/', {
                headers: {
                  Authorization: `Bearer ${token}` // Include token in headers
                }
              });
            setProgress(response.data);
        } catch (error) {
            setError('Error fetching progress data');
            console.error('Error fetching progress data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/progress/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}` // Include token in headers
                }
              });
            setProgress(progress.filter(item => item._id !== id));
            setTimeout(() => setSuccessMessage(null), 3000);
            toast.success('Progress deleted successfully');
        } catch (error) {
            console.error('Error deleting progress data:', error);
            setError('Error deleting progress data');
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

    const handleCreate = () => {
        navigate('/db/createProgress');
    };

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

    const handleFilterChange = (e) => {
        setFilterColumn(e.target.value);
    };

    const filteredProgress = progress.filter(item => {
        if (!searchTerm) {
            return true; // Return all items if searchTerm is empty
        }

        const searchTermNormalized = searchTerm.replace(/[,\-\/\s]/g, '').toLowerCase(); // Normalize search term by removing special characters and spaces

        if (!filterColumn || filterColumn === 'All') {
            // Check if any value matches the search term, including dates
            return Object.values(item).some(value => {
                const valueNormalized = typeof value === 'string' ? value.replace(/[,\-\/\s]/g, '').toLowerCase() : value.toString().replace(/[,\-\/\s]/g, '').toLowerCase(); // Normalize value by removing special characters and spaces
                if (typeof value === 'string') {
                    // Check if the string can be parsed as a date
                    const dateValue = new Date(value);
                    if (!isNaN(dateValue.getTime())) {
                        // Extract year and time from date string for filtering
                        const year = dateValue.getFullYear().toString();
                        const time = dateValue.toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        }).replace(/[,\-\/\s]/g, '').toLowerCase(); // Normalize time by removing special characters and spaces
                        return (
                            year.includes(searchTermNormalized) || // Compare with normalized searchTerm
                            time.includes(searchTermNormalized)
                        );
                    } else {
                        return valueNormalized.includes(searchTermNormalized); // Compare with normalized searchTerm
                    }
                } else if (typeof value === 'number') {
                    return valueNormalized.includes(searchTermNormalized); // Compare with normalized searchTerm
                } else {
                    return false; // Skip other types of fields
                }
            });
        } else {
            const columnValue = item[filterColumn];
            const columnValueNormalized = typeof columnValue === 'string' ? columnValue.replace(/[,\-\/\s]/g, '').toLowerCase() : columnValue.toString().replace(/[,\-\/\s]/g, '').toLowerCase(); // Normalize columnValue by removing special characters and spaces
            if (typeof columnValue === 'string') {
                // Check if the string can be parsed as a date
                const dateValue = new Date(columnValue);
                if (!isNaN(dateValue.getTime())) {
                    // Extract year and time from date string for filtering
                    const year = dateValue.getFullYear().toString();
                    const time = dateValue.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    }).replace(/[,\-\/\s]/g, '').toLowerCase(); // Normalize time by removing special characters and spaces
                    return (
                        year.includes(searchTermNormalized) || // Compare with normalized searchTerm
                        time.includes(searchTermNormalized)
                    );
                } else {
                    return columnValueNormalized.includes(searchTermNormalized); // Compare with normalized searchTerm
                }
            } else if (typeof columnValue === 'number') {
                return columnValueNormalized.includes(searchTermNormalized); // Compare with normalized searchTerm
            } else {
                return false; // Skip other types of fields
            }
        }
    });

    const sortedProgress = filteredProgress.sort((a, b) => {
        const aValue = a[sortColumn] || '';
        const bValue = b[sortColumn] || '';
        return sortOrder === 'asc'
            ? aValue.toString().localeCompare(bValue.toString())
            : bValue.toString().localeCompare(aValue.toString());
    });

    const indexOfLastProgress = currentPage * progressPerPage;
    const indexOfFirstProgress = indexOfLastProgress - progressPerPage;
    const currentProgress = sortedProgress.slice(indexOfFirstProgress, indexOfLastProgress);

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

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

    const csvHeaders = [
        { label: 'Lifting Weight', key: 'weight' },
        { label: 'Chest', key: 'chest' },
        { label: 'Waist', key: 'waist' },
        { label: 'Hips', key: 'hips' },
        { label: 'Run Time', key: 'runTime' },
        { label: 'Bench Press', key: 'benchPress' },
        { label: 'Squat', key: 'squat' },
        { label: 'Deadlift', key: 'deadlift' },
        { label: 'Date', key: 'date' }
    ];

    const PDFReport = () => (
        <Document>
            <Page>
                <View style={{ flexDirection: 'row', borderBottom: '1px solid #ccc', paddingBottom: 5, backgroundColor: 'black', color:'orange', padding: '8px 3px', borderStyle:'solid', borderWidth:'5px', borderRadius:'3px',}}>
                    <Text style={{ flex: 1, fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>Lifting Weight</Text>
                    <Text style={{ flex: 1, fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>Chest</Text>
                    <Text style={{ flex: 1, fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>Waist</Text>
                    <Text style={{ flex: 1, fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>Hips</Text>
                    <Text style={{ flex: 1, fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>Run Time</Text>
                    <Text style={{ flex: 1, fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>Bench Press</Text>
                    <Text style={{ flex: 1, fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>Squat</Text>
                    <Text style={{ flex: 1, fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>Deadlift</Text>
                    <Text style={{ flex: 1, fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>Date</Text>
                </View>
                {filteredProgress.map(item => (
                    <View key={item._id} style={{ flexDirection: 'row', borderBottom: '1px solid #ccc', paddingBottom: 5, paddingTop: 5, backgroundColor: (filteredProgress.indexOf(item) % 2 === 0) ? '#ffffff' : '#f9f9f9'}}>
                        <Text style={{ flex: 1, fontSize: 10, textAlign: 'center' }}>{item.weight}</Text>
                        <Text style={{ flex: 1, fontSize: 10, textAlign: 'center' }}>{item.chest}</Text>
                        <Text style={{ flex: 1, fontSize: 10, textAlign: 'center' }}>{item.waist}</Text>
                        <Text style={{ flex: 1, fontSize: 10, textAlign: 'center' }}>{item.hips}</Text>
                        <Text style={{ flex: 1, fontSize: 10, textAlign: 'center' }}>{item.runTime}</Text>
                        <Text style={{ flex: 1, fontSize: 10, textAlign: 'center' }}>{item.benchPress}</Text>
                        <Text style={{ flex: 1, fontSize: 10, textAlign: 'center' }}>{item.squat}</Text>
                        <Text style={{ flex: 1, fontSize: 10, textAlign: 'center' }}>{item.deadlift}</Text>
                        <Text style={{ flex: 1, fontSize: 10, textAlign: 'center' }}>{formatDateTime(item.date)}</Text>
                    </View>
                ))}
            </Page>
        </Document>
    );

    const TableBody = () => (
        <tbody>
            {currentProgress.map(item => (
                <tr key={item._id} className="bg-white hover:bg-gray-100 border-b border-gray-300">
                    <td className="px-4 py-2 border-r border-gray-300">{item.weight}</td>
                    <td className="px-4 py-2 border-r border-gray-300">{item.chest}</td>
                    <td className="px-4 py-2 border-r border-gray-300">{item.waist}</td>
                    <td className="px-4 py-2 border-r border-gray-300">{item.hips}</td>
                    <td className="px-4 py-2 border-r border-gray-300">{item.runTime}</td>
                    <td className="px-4 py-2 border-r border-gray-300">{item.benchPress}</td>
                    <td className="px-4 py-2 border-r border-gray-300">{item.squat}</td>
                    <td className="px-4 py-2 border-r border-gray-300">{item.deadlift}</td>
                    <td className="px-4 py-2 border-r border-gray-300">{formatDateTime(item.date)}</td>
                    <td className="px-4 py-2  gap-2">
                        <button
                            onClick={() => handleDelete(item._id)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 focus:outline-none"
                        >
                            <TrashIcon className="w-6 h-6" />
                        </button>
                        <Link to={`/db/editProgress/${item._id}`}>
                            <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2 focus:outline-none mt-2">
                                <PencilIcon className="w-6 h-6" />
                            </button>
                        </Link>
                    </td>
                </tr>
            ))}
        </tbody>
    );
    const csvData = filteredProgress.map(item => ({
        ...item,
        date: formatDateTime(item.date)
    }));

    return (
        <div>
            <div className="flex items-center justify-center bg-gray-100">
            <ToastContainer />
                <div className="max-w-4xl w-full mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
                    <ProgressChart data={progress} />
                </div>
            </div>

            <div className="flex items-center justify-center bg-gray-100">
                <div className="max-w-4xl w-full mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-6 text-center">Progress List</h1>
                    {successMessage && <div className="text-center mt-10 text-green-500">{successMessage}</div>}
                    <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0 md:mr-4 w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={handleSearch}
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
                            />
                        </div>
                        <div className="flex items-center mb-4 md:mb-0 md:mr-4 w-full md:w-auto">
                            <label htmlFor="filterColumn" className="mr-2">Filter by:</label>
                            <select
                                value={filterColumn}
                                onChange={handleFilterChange}
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                            >
                                <option value="All">All</option>
                                <option value="weight">Lifting Weight</option>
                                <option value="chest">Chest</option>
                                <option value="waist">Waist</option>
                                <option value="hips">Hips</option>
                                <option value="runTime">Run Time</option>
                                <option value="benchPress">Bench Press</option>
                                <option value="squat">Squat</option>
                                <option value="deadlift">Deadlift</option>
                                <option value="date">Date</option>
                            </select>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleCreate}
                                className="bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-600 focus:outline-none"
                            >
                                <PlusIcon className="w-6 h-6 mr-2" />
                                Add Progress
                            </button>
                            <CSVLink
                            data={csvData}
                            headers={csvHeaders}
                            filename="progress_data.csv"
                            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600 focus:outline-none"
                            >
                           Export CSV
                            </CSVLink>
                            <PDFDownloadLink
                                document={<PDFReport />}
                                fileName="progress_data.pdf"
                                className="bg-red-500 text-white px-4 py-2 rounded flex items-center hover:bg-red-600 focus:outline-none"
                            >
                                Export PDF
                            </PDFDownloadLink>
                        </div>
                    </div>
                    <div className="overflow-x-auto mt-4 border border-gray-300 rounded">
                        <table className="w-full table-auto text-sm md:text-base border-collapse">
                            <thead>
                                <tr className="bg-gray-100 border-b border-gray-300">
                                    <SortableHeader column="weight">Lifting Weight</SortableHeader>
                                    <SortableHeader column="chest">Chest</SortableHeader>
                                    <SortableHeader column="waist">Waist</SortableHeader>
                                    <SortableHeader column="hips">Hips</SortableHeader>
                                    <SortableHeader column="runTime">Run Time</SortableHeader>
                                    <SortableHeader column="benchPress">Bench Press</SortableHeader>
                                    <SortableHeader column="squat">Squat</SortableHeader>
                                    <SortableHeader column="deadlift">Deadlift</SortableHeader>
                                    <SortableHeader column="date">Date</SortableHeader>
                                    <th className="px-4 py-2 border-b border-gray-300">Actions</th>
                                </tr>
                            </thead>
                            <TableBody />
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
                            {Array.from({ length: Math.ceil(sortedProgress.length / progressPerPage) }).map(
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
                                    currentPage === Math.ceil(sortedProgress.length / progressPerPage) ? 'bg-gray-300' : 'hover:bg-gray-200'
                                }`}
                                onClick={() => handlePageChange(Math.ceil(sortedProgress.length / progressPerPage))}
                            >
                                Last
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProgressList;