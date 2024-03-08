import React from 'react';
import Slider from '../Components/Slider';
import Team from '../Components/Team';
import About from '../Components/About'
import Newsletter from '../Components/Newsletter'
import RecipeHome from '../Components/RecipeHome'
import Hero from '../Components/Hero';

export default function Home() {
  return (
    <div>
      <div className="hero-section">
        <Hero />
        <Team />
        <About />
        <RecipeHome />
        <Slider />
        <Newsletter />
      </div>
    </div>
  )
}
