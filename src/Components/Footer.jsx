import React from 'react';
import './Footer.css'
import { Link } from 'react-router-dom';
import Logo from './Assets/logohappypantry.png';
import instagram_icon from './Assets/instagram-icon.webp'
import facebook_icon from './Assets/facebook-icon.png'
import twitter_icon from './Assets/youtube-icon.png'

export default function Footer() {
  return (
    <div className='footer'>
      <div className="footer-section">
        <div className='footer-logo'>
            <Link to="/"><img src={Logo} alt="Happy Pantry logo" /></Link>
        </div>
        <div className="footer-socials">
          <h2>Follow Our Journey</h2>
        <div className="footer-icons">
            <img src={instagram_icon} alt="instagram" />
            <img src={facebook_icon} alt="facebook" />
            <img src={twitter_icon} alt="twitter" />
      </div>
      </div>
        <div className="footer-links">
        <h2>Links</h2>
      <ul>
        <li><Link style={{textDecoration: 'none', color: '#FB7300'}} to="/">About Us</Link></li>
        <li><Link style={{textDecoration: 'none', color: '#FB7300'}} to="/Event">Volunteer</Link></li>
        <li><Link style={{textDecoration: 'none', color: '#FB7300'}} to="/">FAQs</Link></li>    
        <li><Link style={{textDecoration: 'none', color: '#FB7300'}} to="/Map">Find A Pantry</Link></li>    
        <li><Link style={{textDecoration: 'none', color: '#FB7300'}} to="/Account">Keep Up With Us</Link></li>    
      </ul>
      </div>
      </div>
    <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024 - All Rights Reserved</p>
    </div>
    </div>
  )
}
