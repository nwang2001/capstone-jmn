import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Components/admin.css';

export default function Admin() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
            axios.get('http://localhost:3500/users')
                .then(res => {
                    setUsers(res.data);
                })
                .catch(err => console.log(err));
        }
    );

    const deleteUser = (userID) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            axios
                .delete(`http://localhost:3500/users/${userID}`)
                .then(res => {
                    console.log(res);
                    setUsers(users.filter(user => user.userID !== userID));
                })
                .catch(err => console.log(err));
        }
    };

    const handleSignOut = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/Login');
    };

    return (
        <div className='admin'>
            <h1>User Management</h1>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.userID}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>
                                    <button className='edit'>Edit</button>
                                {user.admin === 0 && (
                                    <button className="delete-btn" onClick={() => deleteUser(user.userID)}>Delete</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div >
                <button className="sign-out-btn" onClick={handleSignOut}>Sign Out</button>
            </div>
        </div>
    );
}