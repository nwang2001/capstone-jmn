import React from 'react';
import Vegan from '../Components/Vegan';
import Popular from '../Components/Popular';
import '../Components/Recipe.css';
import Search from '../Components/Search';
import {motion} from 'framer-motion';


export default function Recipe() {
  return (
    <motion.div className='recipes'
    animate={{opacity: 1}}
    initial={{opacity: 0}}
    exit={{opacity: 0}}
    transition={{duration: 0.5}}
    >
      <Search />
      <Popular />
      <Vegan />
    </motion.div>
  );
}
