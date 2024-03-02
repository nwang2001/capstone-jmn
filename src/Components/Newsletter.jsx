import React from 'react';
import './Newsletter.css';

export default function Newsletter() {

  function handleSubmit(event) {
    event.preventDefault();


  }

  return (
    <div className='newsletter'>
      <h1>Keep up with Happy Pantry!</h1>
      <p>Subscribe to our newsletter for volunteer opportunities, events, and weekly healthy recipes!</p>
      <div>
        <form onSubmit={handleSubmit}>
        <input type="email" placeholder='Your Email Here' required/>
        </form>
        <button type='submit'>Subscribe</button>
      </div>
    </div>
  )
}

