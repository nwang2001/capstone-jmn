import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Components/account.css';

export default function Account() {
    // const [firstName, setFirstName] = useState('');
    const navigate = useNavigate();

    const firstName = ({ user }) => (
        <div>
            <h2>Personal Information</h2>
            <p>Name: {user.firstName}</p>
        </div>
    );

    // useEffect(() => {
    //     axios.get('http://localhost:3500/users/firstname')
    //         .then(response => {
    //             setFirstName(response.data.firstName);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching user data:', error);
    //         });
    // }, []);

    const handleSignOut = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/Login');
    };

    return (
        <div className='account'>
            <h1>Welcome to your account! </h1>
            {firstName}
            <div >
                <button className="sign-out-btn" onClick={handleSignOut}>Sign Out</button>
            </div>
        </div>
    );
}