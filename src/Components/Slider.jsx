import React from 'react';
import 'react-slideshow-image/dist/styles.css';
import { Fade } from 'react-slideshow-image';
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
        <Fade autoplay={true} duration={2000} indicators={false} infinite={true} arrows={false}>
        {slideImages.map((each, index) => (
          <img key={index} style={{...divStyle, 'object-fit': 'cover'}} src={each} alt='slider'/>
        ))}
        </Fade>
    </div>
  )
}
