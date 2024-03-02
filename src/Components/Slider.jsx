import React from 'react';
import 'react-slideshow-image/dist/styles.css';
import { Fade } from 'react-slideshow-image';
import './Slider.css';
import foodbank from '../Components/Assets/foodbank2.png';
import volunteer from '../Components/Assets/Volunteer2.png';
import events from '../Components/Assets/events2.png';

const slideImages = [ foodbank, volunteer, events ];

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '500px',
    width: '100%',
    margin: '0px',
}

export default function Slider() {

  return (
    <div className='slider-section'>
        <h1>Welcome, valued members of Happy Pantry!</h1>
        <div className="intro">
        <button>Login</button>
        <button>Sign Up</button>
        </div>
        <Fade autoplay={true} duration={2000} indicators={false} infinite={true} arrows={false}>
        {slideImages.map((each, index) => (
          <img key={index} style={{...divStyle}} src={each} alt='slider'/>
        ))}
        </Fade>
    </div>
  )
}
