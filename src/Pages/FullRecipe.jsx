import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

function FullRecipe() {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('instructions');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3500/recipe/${id}`);
        if (!response.ok) {
          throw new Error('Error fetching recipe details');
        }

        const detailData = await response.json();
        setDetails(detailData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDetails();
  }, [id]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button
          className={activeTab === 'instructions' ? 'active' : ''}
          onClick={() => setActiveTab('instructions')}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === 'ingredients' ? 'active' : ''}
          onClick={() => setActiveTab('ingredients')}
        >
          Ingredients
        </Button>
        {activeTab === 'instructions' && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}
        {activeTab === 'ingredients' && (
          <ul>
            {details.ingredients &&
              details.ingredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin: 13rem auto 5rem;
  display: block;
  width: 80%;

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  h2 {
    display: block;
    margin: 50px auto;
    font-size: 3rem;
    font-weight: 800;
    color: #FB7300;
    text-shadow: 3px 3px 3px #82B300;
    text-align: center;
  }

  img {
    display: block;
    margin: 0 auto;
  }

  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
    margin: 0 auto;
  }

  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin: 2rem auto 1rem;
  font-weight: 600;
  `;

const Info = styled.div`
  margin: 0rem auto;
  width: 70%;
`;

export default FullRecipe;
