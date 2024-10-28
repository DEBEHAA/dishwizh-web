import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserDetails.css';

const UserDetails = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        postalCode: '',
        age: '',
        gender: '',
        professionalChef: false,
        experience: ''
    });

    const [message, setMessage] = useState('');
    const [isNewUser, setIsNewUser] = useState(true);  // To track if it's a new user entry or update

    // Fetch userId from localStorage (Make sure the localStorage has valid user data)
    const user = JSON.parse(localStorage.getItem('user'));  // Retrieving user object from local storage
    const userId = user?.id;  // Fetching the userId

    // Log userId for debugging
    console.log('User ID:', userId);

    // Fetch user details if they exist when the component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) {
                console.error('User ID not found in local storage');
                return;
            }
            try {
                const response = await axios.get(`http://localhost:5000/api/userdetails/${userId}`);
                if (response.data) {
                    setUserData(response.data);  // Populate the form with existing user data
                    setIsNewUser(false);  // It's an update, not a new entry
                } else {
                    console.log('No user data found, new entry');
                    setIsNewUser(true);  // It's a new entry, user is filling the form for the first time
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    // Handle input change for form fields
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserData({
            ...userData,
            [name]: type === 'checkbox' ? checked : value  // Handle checkbox input for professionalChef
        });
    };

    // Handle form submission to add or update user details
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        // Log user data before sending request
        console.log('Submitting user data:', userData);

        if (!userId) {
            console.error('User ID is not defined');
            return;
        }

        try {
            // If it's a new user, post the data; otherwise, update existing data
            if (isNewUser) {
                const response = await axios.post(`http://localhost:5000/api/userdetails`, { userId, ...userData });  // Create new user details
                setMessage('User details added successfully!');
            } else {
                const response = await axios.put(`http://localhost:5000/api/userdetails/${userId}`, userData);  // Update existing user details
                setMessage('User details updated successfully!');
            }
        } catch (error) {
            console.error('Error updating user details:', error.response ? error.response.data : error.message);
            setMessage('Failed to update user details.');
        }
    };

    return (
        <div className="user-details-container">
            <h1>User Details</h1>
            <form onSubmit={handleFormSubmit} className="user-details-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={userData.address}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={userData.postalCode}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={userData.age}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                        id="gender"
                        name="gender"
                        value={userData.gender}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="professionalChef">Are you a professional chef?</label>
                    <input
                        type="checkbox"
                        id="professionalChef"
                        name="professionalChef"
                        checked={userData.professionalChef}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="experience">Cooking Experience (in years)</label>
                    <input
                        type="number"
                        id="experience"
                        name="experience"
                        value={userData.experience}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">{isNewUser ? 'Add Details' : 'Update Details'}</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UserDetails;
