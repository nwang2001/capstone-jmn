import React from 'react';
import Team1 from '../Components/Assets/team1.webp';
import Team2 from '../Components/Assets/team2.webp';
import Team3 from '../Components/Assets/team3.webp';
import Team4 from '../Components/Assets/team4.webp';
import './Team.css';

export default function Team() {
  return (
    <div>
      <h1 className="team-title">Our Team</h1>
      <div className="team-container">
      <div className="team-bios">
        <h2 className="team-name">Yasmin Rodriguez</h2>
        <h3 className="team-role">Community Outreach Coordinator</h3>
        <div className="team">
            <img src={Team1} alt="example" className="team-photo" />
            <p className="team-paragraph">Yasmin is passionate about community engagement and social impact. With a background in social work, she has experience connecting with local organizations, food pantries, and community leaders. Yasmin works to build partnerships with food pantries, ensuring that the nonprofit website provides up-to-date information on nearby food resources. She also coordinates with volunteers to amplify the impact of the organization's outreach efforts.</p>
        </div>
      </div>
      <div className="team-bios">
        <h2 className="team-name">Alex Wu</h2>
        <h3 className="team-role">Events and Community Calendar Manager</h3>
        <div className="team">
            <img src={Team2} alt="example" className="team-photo" />
            <p className="team-paragraph">Alex is an event planning expert with a passion for connecting people. With a background in organizing community events, Alex manages the events section of the website. She collaborates with local businesses, cultural organizations, and community leaders to compile a comprehensive calendar of events in each city. Alex ensures that users can easily discover and participate in events that align with their interests, fostering a sense of community and connection.</p>
        </div>
      </div>
      <div className="team-bios">
        <h2 className="team-name">Andrea Villanova</h2>
        <h3 className="team-role">Recipe Developer and Content Creator</h3>
        <div className="team">
            <img src={Team3} alt="example" className="team-photo" />
            <p className="team-paragraph">Andrea is a culinary enthusiast with a background in nutrition. She is responsible for curating content related to creating recipes from pantry staples. Andrea develops and shares easy-to-follow recipes that users can prepare with the ingredients they have at home. Her goal is to promote healthy and budget-friendly meal options, making cooking accessible to everyone. Andrea also collaborates with local nutritionists to ensure the recipes align with dietary guidelines.</p>
        </div>
      </div>
      <div className="team-bios">
        <h2 className="team-name">Carlos Velez</h2>
        <h3 className="team-role">Volunteer Engagement Specialist</h3>
        <div className="team">
            <img src={Team4} alt="example" className="team-photo" />
            <p className="team-paragraph">Carlos is dedicated to fostering a sense of community and encouraging volunteerism. Having previously worked with various nonprofits, Carlos understands the importance of volunteers in driving positive change. He manages the volunteer opportunities section of the website, collaborating with local charities and NGOs to create a seamless platform for users to find and participate in meaningful volunteer work in their area.</p>
        </div>
      </div>
      </div>
    </div>
  )
}
