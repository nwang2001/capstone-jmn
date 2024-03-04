import React from 'react';
import 'react-slideshow-image/dist/styles.css';
import { Fade } from 'react-slideshow-image';
import './Slider.css';
import foodbank from '../Components/Assets/foodbank.jpg';
import volunteer from '../Components/Assets/Volunteer.jpg';
import events from '../Components/Assets/events.jpg';

const slideImages = [ foodbank, volunteer, events ];

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '550px',
    width: '100%',
    margin: '0px'
}

export default function Slider() {

  return (
    <div className='slider-section'>
        <h1>Welcome, valued members of Happy Pantry!</h1>
        <p>Happy Pantry: Where Community Thrives, Nourishing Lives Together. Join us with an account that unlocks a world of possibilities – save events that spark joy, discover and save delightful recipes from pantry staples, and easily locate nearby food banks. We're more than a website; we're your passport to a vibrant, connected community.</p>
        <div className="intro">
        <button>Login</button>
        <button>Sign Up</button>
        </div>
        <Fade autoplay={true} duration={2000} indicators={false} infinite={true} arrows={false}>
        {slideImages.map((each, index) => (
          <img key={index} style={{...divStyle, 'object-fit': 'cover'}} src={each} alt='slider'/>
        ))}
        </Fade>
    </div>
  )
}
