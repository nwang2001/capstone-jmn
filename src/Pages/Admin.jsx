import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Components/admin.css'

export default function Admin() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3500/users')
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => console.log(err));
    }, []);
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
    return (
        <div className='admin'>
            <h1>User Management</h1>
            <ul>
                {users.map(user => (
                    <li key={user.userID}>
                        {user.firstName} {user.lastName} - {user.email}
                        {user.admin === 0 && ( // Assuming `0` means not an admin
                            <button
                                onClick={() => deleteUser(user.userID)}
                            >Delete</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}