import React, { useState } from 'react';
import styled from 'styled-components';
import {FaSearch} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Search() {
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const submitHandler = (e) => {
      e.preventDefault();  

    };

  return (
    <div>
      <FormStyle onSubmit={submitHandler}>
        <FaSearch></FaSearch>
        <input 
        onChange={(e) => setInput(e.target.value)}
        type='text' 
        value={input}/>
      </FormStyle>
      </div>
  )
}

const FormStyle = styled.form`
    margin: 0rem 20rem;

    div {
    position: relative;
    width: 100%;
    }

    input{
        border: 2px solid #454545;
        background: linear-gradient(35deg, #494949);
        font-size: 1.5rem;
        color: black;
        padding: 1rem 3rem;
        border-radius: 1rem;
        outline: none;
        width: 100%;
    }
    svg {
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(100%, -50%);
    }
`;

export default Search;
