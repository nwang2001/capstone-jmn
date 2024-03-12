import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

function Searched() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`https://capstone-bknd.onrender.com/searched/${name}`);
        if (!response.ok) {
          throw new Error(`Error fetching recipe details: ${response.statusText}`);
        }

        const searchData = await response.json();
        console.log('Search Data:', searchData); // Log the fetched data to the console
        setSearchedRecipes(searchData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        // Handle error state or display a message to the user
      }
    };

    fetchDetails();
  }, [name]);

  console.log('Searched Recipes:', searchedRecipes); // Log the state to the console

  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
        <h1>Recipes With Your Happy Pantry Ingredients</h1>

      {Array.isArray(searchedRecipes) &&
        searchedRecipes.map((item) => (
          <Card key={item.id}>
            <Link to={`/recipe/${item.id}`}>
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
            </Link>
          </Card>
        ))}
    </Grid>

  );
}

const Grid = styled(motion.div)`
margin: 13rem auto 5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;

  h1 {
    display: block;
    margin: 30px;
    font-size: 3rem;
    font-weight: 800;
    color: #FB7300;
    text-shadow: 3px 3px 3px #82B300;
    width: 80%;
    text-align: center;
    align-items: center;
}
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Searched;
