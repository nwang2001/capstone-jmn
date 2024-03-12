import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginImg from './Assets/login.jpeg';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('https://capstone-bknd.onrender.com/Login', { email, password })
            .then(res => {
                console.log(res);
                if (res.data.message === "Login Successful") {
                    if (res.data.isAdmin) {
                        console.log('User is an admin.')
                        navigate('/Admin');
                    } else {
                        console.log('User is not an admin.')
                        localStorage.setItem('userId', res.data.data[0].userID);
                        navigate('/Account');
                    }
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="login-page">
            <img src={LoginImg} alt="login" />
            <div className="form">
                <form className="login-form" onSubmit={handleSubmit}>
                    <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button type="submit">login</button>
                    <p className="message">
                        Not registered? <a href="Sign">Create Account</a>
                    </p>
                </form>
            </div>
        </div>
    );
}