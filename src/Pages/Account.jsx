import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Components/account.css';
import axios from 'axios';

export default function Account() {
    const [userData, setUserData] = useState("");
    const [addresses, setAddresses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        if (userId) {
            navigate('/Account');
            fetchUserData(userId);
            fetchAddresses(userId);
        }
        // else {
        //     navigate('/Login');
        // }
    }, []);

    const fetchUserData = (userId) => {

        axios.post(`https://capstone-bknd.onrender.com/users/firstname`, { userId })
            .then(response => setUserData(response.data.firstName))
            .catch(error => console.error('Error fetching user data:', error));
    };

    const fetchAddresses = (userId) => {
        axios.get(`https://capstone-bknd.onrender.com/users/getAddresses?userId=${userId}`)
            .then(response => setAddresses(response.data))
            .catch(error => console.error('Error fetching addresses:', error));
    };

    const handleDeleteAddress = (addressId) => {
        axios.delete(`https://capstone-bknd.onrender.com/users/deleteAddress/${addressId}`)
            .then(response => {
                // Remove the deleted address from the state
                setAddresses(addresses.filter(address => address.id !== addressId));
            })
            .catch(error => console.error('Error deleting address:', error));
    };

    const handleSignOut = () => {
        localStorage.clear();
        navigate('/Login');
    };

    return (
        <div className='account'>
            <h1>Welcome to your account, {userData}! </h1>
            {userData && (
                <div>
                    <h2>Your Saved Happy Pantries:</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addresses.map((address, index) => (
                                <tr key={index}>
                                    <td>{address.address}</td>
                                    <td>
                                        <button className="delete-btn" onClick={() => handleDeleteAddress(address.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div>
                <button className='edit'>Edit Account</button>
                <button className="sign-out-btn" onClick={handleSignOut}>Sign Out</button>
            </div>
        </div>
    );
}