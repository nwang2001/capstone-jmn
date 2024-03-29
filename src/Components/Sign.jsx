import React from 'react';
import './Sign.css';
import { useNavigate } from 'react-router-dom';

import SignImg from './Assets/signup.jpeg'


export default function Sign() {
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        const fName = document.getElementById('fName').value;
        const lName = document.getElementById('lName').value;
        const password = document.getElementById('password').value;
        const passwordC = document.getElementById('passwordC').value;
        const email = document.getElementById('email').value;

        if (password === passwordC) {
            fetch('https://capstone-bknd.onrender.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: fName,
                    lastName: lName,
                    password: password,
                    email: email
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.message !== "User Register Success") {
                        alert('exist')
                    } else {
                        console.log(data)
                        localStorage.clear()
                        localStorage.setItem('ID', data.user.userID)
                        localStorage.setItem('username', data.user.firstName)
                        navigate('/Account');
                    }
                })
        } else {
            console.log('Registering failed.')
        }
    }

    return (
        <div className="signup-page">
            <img src={SignImg} alt="sign up" />
            <div className="form">
                <form className="register-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="first name" id='fName' />
                    <input type="text" placeholder="last name" id='lName' />
                    <input type="password" placeholder="password" id='password' />
                    <input type="password" placeholder="confirm password" id='passwordC' />
                    <input type="text" placeholder="email address" id='email' />
                    <button type='submit'>create account</button>
                    <p className="message">
                        Already registered? <a href="/Login">Sign In</a>
                    </p>
                </form>
            </div>
        </div>
    )
}