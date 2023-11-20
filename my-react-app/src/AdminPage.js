// AdminPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        iin: '',
        name: '',
        surname: '',
        middlename: '',
        username: '',
        address: '',
        phone_number: '',
        email: '',
        driver_license: '',
        role: '',
        password: '',
    });

    useEffect(() => {
        // Fetch the list of users from the backend
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/users/?skip=0&limit=10');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddUser = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to add a new user
            const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            console.log('Response:', response);

            if (response.ok) {
                // Update the list of users after adding a new user
                fetchUsers();
                // Reset the form data
                setFormData({
                    iin: '',
                    name: '',
                    surname: '',
                    middlename: '',
                    username: '',
                    address: '',
                    phone_number: '',
                    email: '',
                    driver_license: '',
                    role: '',
                    password: '',
                });
            } else {
                console.error('Failed to add user:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            // Send a DELETE request to delete a user by ID
            const response = await fetch(`https://plankton-app-b4yn3.ondigitalocean.app/users/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Update the list of users after deleting a user
                fetchUsers();
            } else {
                console.error('Failed to delete user:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="admin-page">
            <h1>Admin Page</h1>
            <Link to="/adminVehicles">Manage Vehicles</Link>

            {/* Add User Form */}
        
            

            <form onSubmit={handleAddUser}>
                <label>
                    IIN:
                    <input
                        type="text"
                        name="iin"
                        value={formData.iin}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Surname:
                    <input
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Middlename:
                    <input
                        type="text"
                        name="middlename"
                        value={formData.middlename}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Phone Number:
                    <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Driver License:
                    <input
                        type="text"
                        name="driver_license"
                        value={formData.driver_license}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Role:
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Add User</button>
            </form>

          {/* List of Users */}
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} {user.surname} ({user.email}) {user.role}
                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPage;
