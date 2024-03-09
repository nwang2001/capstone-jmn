import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const formattedIngredients = input.split(',').map((ingredient) => ingredient.trim()).join(',');
    navigate(`/searched/${formattedIngredients}`);
  };

  return (
    <div>
      <FormStyle onSubmit={submitHandler}>
        <h1>Create A Happy Pantry</h1>
        <h2>Discover New Recipes with Your Pantry's Ingredients!</h2>
        <input
          onChange={(e) => setInput(e.target.value)}
          type='text'
          value={input}
          placeholder="Enter ingredients..."
        />
        <label>Enter Your Ingredients (comma-separated)</label>
      </FormStyle>
    </div>
  );
}

const FormStyle = styled.form`
  margin: 0rem 20rem;

  div {
    position: relative;
    width: 100%;
  }

  h1 {
    display: block;
    margin: 30px 0px;
    font-size: 2.6rem;
    font-weight: 800;
    color: #FB7300;
    text-shadow: 3px 3px 3px #82B300;
    width: 100%;
    text-align: center;
  }

  h2 {
    display: block;
    margin: 30px 0px;
    font-size: 1.5rem;
    font-weight: 800;
    color: #82B300;
    width: 100%;
    text-align: center;
  }

  input {
    border: 2px solid #454545;
    background: linear-gradient(35deg, #494949);
    font-size: 1rem;
    color: black;
    padding: 1rem 3rem;
    border-radius: 1rem;
    outline: none;
    width: 100%;
  }

  label {
    display: block;
    margin: 10px auto;
    text-align: center;
  }

`;

export default Search;
