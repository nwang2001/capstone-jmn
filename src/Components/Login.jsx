import React from 'react'
import './Login.css'

export default function Login() {
    return (
        <div className="login-page">
            <div className="form">
                <form className="login-form" >
                    <input type="text" placeholder="username" />
                    <input type="password" placeholder="password" />
                    <button>login</button>
                    <p className="message">
                        Not registered? <a href="Sign">Create Account</a>
                    </p>
                </form>
            </div>
        </div>
    )
}