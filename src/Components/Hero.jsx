import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero-wrapper">
      <div className="hero-content">
          <h1>Welcome, valued members of Happy Pantry!</h1>
          <p className="slogan">Happy Pantry: Where Community Thrives, Nourishing Lives Together. Join us with an account that unlocks a world of possibilities – save events that spark joy, discover and save delightful recipes from pantry staples, and easily locate nearby food banks. We're more than a website; we're your passport to a vibrant, connected community.</p>
        <div className="button-wrapper">
          <a href="/Login"><button className="primary-button">Login</button></a>
          <a href="Sign"><button className="secondary-button">Sign Up</button></a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
