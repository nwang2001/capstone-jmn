import React from 'react';
import Slider from '../Components/Slider';
import Team from '../Components/Team';
import About from '../Components/About'
import Newsletter from '../Components/Newsletter'


export default function Home() {
  return (
    <div>
      <div className="hero-section">
        <Slider />
        <Team />
        <About />
        <Newsletter />
      </div>
    </div>
  )
}
