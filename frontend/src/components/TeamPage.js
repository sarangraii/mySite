import React, { useState } from 'react';
import '../styles/TeamPage.css';

import CEO from '../Images/founder.jpg';
import arpit from '../Images/arpit.jpg'
import Head from '../Images/Head.png';
import Mahima from '../Images/mahima.jpg';
import Sarang from '../Images/sarang.jpg';
import Ashu from '../Images/Ashu.jpg';
import Ritesh from '../Images/Ritesh.jpg';
import Jaydeep from '../Images/Jay.jpg'

const TeamPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const teamMembers = [
    {
      id: 1,
      name: 'Tiya Sharma & Bhavna Bairagi',
      role: 'Founder & CEO',
      description: 'With over 15 years of experience in matchmaking, Sarah founded Perfect Match with a vision to create meaningful connections through technology and human touch.',
      image:CEO,
      department: 'leadership'
    },
    {
      id: 2,
      name: 'Arpit Gaveshinde Sir',
      role: 'Chief Technology Officer',
      description: 'Arpit Gaveshinde Sir our engineering team, ensuring our platform delivers a seamless experience while implementing the latest innovations in matchmaking algorithms.',
      image:arpit,
      department: 'leadership'
    },
    {
      id: 3,
      name: "Priyanka Sawlani Ma'am ",
      role: 'Head of Matchmaking',
      description: 'Priyanka Sawlani brings cultural expertise and insight to our matchmaking process, helping clients navigate traditions while finding their perfect partner.',
      image: Head,
      department: 'matchmaking'
    },
    {
      id: 4,
      name: 'Ashutosh Parakh',
      role: 'Senior Relationship Counselor',
      description: 'A licensed therapist with expertise in relationship dynamics, Michael helps our clients build foundations for successful marriages.',
      image:Ashu,
      department: 'counseling'
    },
    {
      id: 5,
      name: 'Ritesh Dhanotiya',
      role: 'Client Success Manager',
      description: 'Ritesh ensures every client receives personalized attention and support throughout their journey to finding a life partner.',
      image:Ritesh,
      department: 'support'
    },
    {
      id: 6,
      name: 'Sarang Rai',
      role: 'Lead Developer',
      description: 'Sarang  the technical development of our platform, focusing on security, privacy, and innovative features.',
      image: Sarang,
      department: 'technical'
    },
    {
      id: 7,
      name: 'Mahima Chatwani',
      role: 'Marketing Director',
      description: 'Mahima develops strategies to connect our services with those seeking meaningful relationships across diverse communities.',
      image: Mahima,
      department: 'marketing'
    },
    {
      id: 8,
      name: 'Jaydeep Patidar',
      role: 'Cultural Consultant',
      description: 'Jaydeep helps bridge cultural gaps and ensures our platform respects and celebrates diverse traditions in matchmaking.',
      image:Jaydeep,
      department: 'matchmaking'
    }
  ];

  const filters = [
    { id: 'all', name: 'All Team' },
    { id: 'leadership', name: 'Leadership' },
    { id: 'matchmaking', name: 'Matchmaking' },
    { id: 'technical', name: 'Technical' },
    { id: 'support', name: 'Support' },
    { id: 'counseling', name: 'Counseling' },
    { id: 'marketing', name: 'Marketing' }
  ];

  const filteredMembers = activeFilter === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.department === activeFilter);

  return (
    <div className="team-page">
      <div className="team-header">
        <h1>Our Dedicated Team</h1>
        <p>Meet the passionate experts committed to helping you find your perfect life partner</p>
      </div>

      <div className="team-filters">
        {filters.map(filter => (
          <button 
            key={filter.id}
            className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.name}
          </button>
        ))}
      </div>

      <div className="team-grid">
        {filteredMembers.map(member => (
          <div className="team-card" key={member.id}>
            <div className="card-image">
              <img src={member.image} alt={member.name} />
            </div>
            <div className="card-content">
              <h3>{member.name}</h3>
              <h4>{member.role}</h4>
              <p>{member.description}</p>
              <div className="social-links">
                <a href="#" className="social-link">
                  <i className="fa fa-linkedin"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fa fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;