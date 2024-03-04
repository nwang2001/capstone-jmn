import React from 'react'
import './Sign.css'

export default function Sign() {
    return (
        <div className="signup-page">
            <div className="form">
                <form className="register-form">
                    <input type="text" placeholder="first name" />
                    <input type="text" placeholder="last name" />
                    <input type="password" placeholder="password" />
                    <input type="password" placeholder="confirm password" />
                    <input type="text" placeholder="email address" />
                    <button>create</button>
                    <p className="message">
                        Already registered? <a href="/Login">Sign In</a>
                    </p>
                </form>
            </div>
            {/* <div className='img-holder'>
                <img className='image' src='../../images/signup.jpeg' />
            </div> */}
        </div>
    )
}