import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './admin.css';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
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
    const [isAddingUser, setIsAddingUser] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/users/all');
        const data = await response.json();
        setUsers(data);
    };
    const openUpdateModal = (user) => {
        setEditingUser(user);
        setFormData({ ...user }); // Spread user data into formData
        setIsUpdateModalVisible(true);
    };
    const closeUpdateModal = () => {
        setEditingUser(null);
        setIsUpdateModalVisible(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        const response = await fetch('https://plankton-app-b4yn3.ondigitalocean.app/users/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            fetchUsers();
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
        }
        setIsAddingUser(false);
    };

    const handleSaveUserUpdate = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`https://plankton-app-b4yn3.ondigitalocean.app/users/${editingUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify(editingUser)
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error: ${response.status}. ${errorData.message}`);
            }
    
            const updatedUser = await response.json();
            setUsers(users.map(user => user.id === editingUser.id ? updatedUser : user));
            setIsUpdateModalVisible(false);
            setEditingUser(null);
    
        } catch (error) {
            console.error('Error saving user update:', error);
        }
    };
    
    
    const handleDeleteUser = async (id) => {
        const response = await fetch(`https://plankton-app-b4yn3.ondigitalocean.app/users/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            fetchUsers();
        }
    };
    return (
        <div className="admin-page">
            <h1>Admin Page</h1>
            <div className="link-container">
                <Link to="/adminVehicles" className="link-button">Manage Vehicles</Link>
                <Link to="/adminRoutes" className="link-button">Manage Routes</Link>
                <Link to="/adminAuctions" className="link-button">Manage Auctions</Link>
                <Link to="/Reports" className="link-button">Reports</Link>
            </div>
            
            <h1>All Users</h1>
            <button className="link-button-red" onClick={() => setIsAddingUser(!isAddingUser)}>
                {isAddingUser ? '-' : '+'}
            </button>

            {isAddingUser && (
                <form onSubmit={ handleAddUser}>
                <div class="form-group">
                    <label for="iin">IIN:</label>
                    <input
                    type="text"
                    id="iin"
                    name="iin"
                    value={formData.iin}
                    onChange={handleInputChange}
                    />
                </div>
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    />
                </div>
                <div class="form-group">
                    <label for="name">Surame:</label>
                        <input
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={handleInputChange}
                        />
                </div>
                <div class="form-group">
                    <label for="name">Middlename:</label>
                        <input
                            type="text"
                            name="middlename"
                            value={formData.middlename}
                            onChange={handleInputChange}
                        />
                </div>
                <div class="form-group">
                    <label for="name">Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                </div>
                <div class="form-group">
                    <label for="name">Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                </div>
                <div class="form-group">
                    <label for="name">Phone Number:</label>
                        <input
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleInputChange}
                        />
                </div>
                <div class="form-group">
                    <label for="name">Email:</label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                </div>
                <div class="form-group">
                    <label for="name">Driver License:</label>
                        <input
                            type="text"
                            name="driver_license"
                            value={formData.driver_license}
                            onChange={handleInputChange}
                        />
                </div>
                <div class="form-group">
                    <label for="role">Role:</label>
                    <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    >
                    <option value="driver">Driver</option>
                    <option value="maintainer">Maintainer</option>
                    <option value="fueler">Fueler</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="name">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                </div>
                <button type="submit">Add User</button>
            </form>
            )}
            <div class="scrollmenu">
            {/* List of Users */}
                <table>
                <thead>
                    <tr>
                    <th>ID</th>

                    <th>IIN</th>
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Address</th>
                    <th>Phone number</th>
                    <th>Email</th>
                    <th>Driver license</th>
                    <th>Role</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                    <tr key={user.id} >
                        <td>{user.id}</td>
                        <td>{user.iin}</td>
                        <td>{user.name} {user.surname}</td>
                        <td>{user.username}</td>
                        <td>{user.address}</td>
                        <td>{user.phone_number}</td>
                        <td>{user.email}</td>
                        <td>{user.driver_license}</td>
                        <td>{user.role}</td>
                        <td>
                            <button className="update-button" onClick={() => openUpdateModal(user)}>Update</button>
                            <button className="delete-button" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            {isUpdateModalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeUpdateModal}>&times;</span>
                        <h2>Edit User</h2>
                        <form onSubmit={handleSaveUserUpdate}>
                            {/* Update Form Fields */}
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={editingUser.name}
                                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="surname">Surname:</label>
                                <input
                                    type="text"
                                    id="surname"
                                    name="surname"
                                    value={editingUser.surname}
                                    onChange={(e) => setEditingUser({ ...editingUser, surname: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="middlename">Middle Name:</label>
                                <input
                                    type="text"
                                    id="middlename"
                                    name="middlename"
                                    value={editingUser.middlename}
                                    onChange={(e) => setEditingUser({ ...editingUser, middlename: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={editingUser.username}
                                    onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address:</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={editingUser.address}
                                    onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone_number">Phone Number:</label>
                                <input
                                    type="text"
                                    id="phone_number"
                                    name="phone_number"
                                    value={editingUser.phone_number}
                                    onChange={(e) => setEditingUser({ ...editingUser, phone_number: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={editingUser.email}
                                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="driver_license">Driver License:</label>
                                <input
                                    type="text"
                                    id="driver_license"
                                    name="driver_license"
                                    value={editingUser.driver_license}
                                    onChange={(e) => setEditingUser({ ...editingUser, driver_license: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="role">Role:</label>
                                <select
                                    id="role"
                                    name="role"
                                    value={editingUser.role}
                                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                                >
                                    <option value="">Select Role</option>
                                    <option value="driver">Driver</option>
                                    <option value="maintainer">Maintainer</option>
                                    <option value="fueler">Fueler</option>
                                    {/* Add other roles as needed */}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="text"
                                    id="password"
                                    name="password"
                                    value={editingUser.password}
                                    onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                                />
                            </div>
                            <button type="submit">Save Updates</button>


                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
