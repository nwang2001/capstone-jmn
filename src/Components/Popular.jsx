import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from 'react-router-dom';
// require('dotenv').config();

function Popular() {

    const [popular, setPopular] = useState([]);
    // const APIKEY = process.env.APIKEY;

    useEffect(() => {
        fetch("http://localhost:3500/popular")
          .then((res) => res.json())
          .then((data) => {
            setPopular(data);
          })
          .catch((err) => console.log(err));
      }, []);

  return (
    <div>
            <Wrapper>
                <h3>Popular Picks</h3>
                <Splide options={{
                    perPage:3,
                    arrows: true,
                    pagination: true,
                    drag: 'free',
                    gap: '5rem'
                }}>
                {popular.map((recipe) => {
                    return (
                        <SplideSlide key={recipe.id}>
                        <Card>
                        <Link to={`/recipe/${recipe.id}`}>                            <p>{recipe.title}</p>
                            {/* <p>{recipe.id}</p> */}
                            <img src={recipe.image} alt={recipe.title} />
                            <Gradient />
                            </Link>
                        </Card>
                        </SplideSlide>
                    );
                })}
                </Splide>
            </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`;

const Card = styled.div`
    min-height: 25rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;

    img {
        border-radius: 2rem;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    p {
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 0%);
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size; 1rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Popular;
