import React from 'react';
import Vegan from '../Components/Vegan';
import Popular from '../Components/Popular';
import '../Components/Recipe.css';
import Search from '../Components/Search';


export default function Recipe() {
  return (
    <div className='recipes'>
      <Search />
      <Popular />
      <Vegan />
    </div>
  )
}
