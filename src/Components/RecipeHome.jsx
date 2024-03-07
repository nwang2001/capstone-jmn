import React from 'react';
import Recipe from '../Components/Assets/recipes.jpg';
import './RecipeHome.css'

export default function RecipeHome() {
  return (
    <div className='recipe-section' id='section-recipe'>
        <div className="recipe-left">
            <h2>Not sure what to make for dinner?</h2>
            <p>Turn your pantry into a 'Happy Pantry'! Discover the magic of our innovative feature – simply input all the ingredients lurking in your pantry, and watch as we whip up delightful, personalized recipes just for you. Say goodbye to mealtime monotony and hello to a world of culinary creativity. Let your Happy Pantry be the source of endless inspiration. Click now to transform your everyday ingredients into extraordinary, delicious meals!</p>
            <a href="Recipe"><button>Unlock Recipe Magic!</button></a>
        </div>
        <div className="recipe-right">
            <img src={Recipe} alt="Recipe pyramid" />
        </div>
    </div>
  )
}
