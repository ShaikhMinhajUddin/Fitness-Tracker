import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const EditProfile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        profileImage: ''
    });
    const [message, setMessage] = useState('');
    const [preview, setPreview] = useState('');
    const [showPassword, setShowPassword] = useState(false); 

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/user/users/${userId}`);
                const { username, email, profileImage } = res.data;
                setFormData({
                    username: username || '',
                    email: email || '',
                    password: '', // Do not pre-fill password for security reasons
                    profileImage: profileImage || ''
                });
                setPreview(profileImage ? `http://localhost:3000/${profileImage}` : '');
            } catch (err) {
                console.error('Error fetching user data:', err);
            }
        };

        fetchUserData();
    }, [userId]);

    const { username, email, password } = formData;

    const onChange = e => {
        if (e.target.name === 'profileImage') {
            const file = e.target.files[0];
            setFormData({ ...formData, profileImage: file });
            setPreview(URL.createObjectURL(file));
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async e => {
        e.preventDefault();
        const data = new FormData();
        data.append('username', formData.username);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('profileImage', formData.profileImage);

        try {
            const res = await axios.put(`http://localhost:3000/user/users/${userId}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/');
            setMessage(res.data.message);
           
        } catch (err) {
            console.error('Error updating profile:', err);
            setMessage(err.response?.data?.error || 'Error updating profile');
        }
    };

    return (
        <div className="w-auto min-h-screen bg-cover" style={{backgroundImage: "url('https://img.freepik.com/premium-photo/illustration-fitness-equipments-design-background_916191-36137.jpg?w=996')"}}>
            <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-4 text-center text-gray-100">Update Profile</h2>
                <form onSubmit={onSubmit} className="max-w-md mx-auto bg-white rounded-lg shadow-md">
                    <div className="mb-4 px-6 py-4">
                        {preview && (
                            <img
                                src={preview}
                                alt="Profile Preview"
                                className="w-full h-64 object-cover mb-4"
                            />
                        )}
                        <input
                            type="file"
                            name="profileImage"
                            accept="image/*"
                            onChange={onChange}
                            className="block w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4 px-6">
                        <label className="block text-gray-700 font-semibold mb-2">Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={onChange}
                            className="block w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4 px-6">
                        <label className="block text-gray-700 font-semibold mb-2">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            className="block w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4 px-6">
                        <label className="block text-gray-700 font-semibold mb-2">Password:</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={password}
                                onChange={onChange}
                                className="block w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
                                required
                            />
                              <button
                                 type="button"
                                 onClick={togglePasswordVisibility}
                                 className="absolute top-0 right-0 mr-4 mt-3 text-gray-600"
                                 >
                                 {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>

                        </div>
                    </div>
                    <div className="px-6 py-6">
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
                        >
                            Update Profile
                        </button>
                    </div>
                </form>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </div>
        </div>
    );
};

export default EditProfile;
