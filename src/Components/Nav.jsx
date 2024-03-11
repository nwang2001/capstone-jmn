import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import Logo from './Assets/logohappypantry.png';

class Nav extends Component {

  state = { clicked: false };
  handleClick = () => {
    this.setState({clicked: !this.state.clicked})
  }

  render() {
  return (
    <div className="navbar">
      <nav>
        <div className="nav-logo">
        <Link to="/"><img src={Logo} alt="Happy Pantry logo" /></Link>
        <h1>Happy Pantry</h1>
        </div>

          <ul className={ this.state.clicked ? "nav-menu" : "nav-menu active" }>
          <div class="dropdown">
      <li><Link style={{textDecoration: 'none', color: '#82B300'}} to="/">Home</Link></li>
    <div class="dropdown-content">
      <a href="#section-team">Our Team</a>
      <a href="#section-about">About Us</a>
      <a href="#section-recipe">Personal Recipes</a>
    </div>
  </div>
              <li><Link style={{textDecoration: 'none', color: '#82B300'}} to="/Map">Find A Food Bank</Link></li>  
              <li><Link style={{textDecoration: 'none', color: '#82B300'}} to="/Recipe">Recipes</Link></li>      
              <li><Link style={{textDecoration: 'none', color: '#82B300'}} to="/Login">Account</Link></li>     

          </ul>
      <div className="mobile-navbar" onClick={this.handleClick}>
      <i id='bar' className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
    </div>
    </nav>
    </div>

  );
}
}

export default Nav;
