import React, { useState } from 'react';
import '../styles/CareersPage.css';

const CareersPage = () => {
  const [activeTab, setActiveTab] = useState('openings');
  const [expandedJob, setExpandedJob] = useState(null);
  
  const jobOpenings = [
    {
      id: 1,
      title: "Senior React Developer",
      department: "Frontend Engineering",
      location: "Remote / New York",
      type: "Full-Time",
      description: "We're looking for an experienced React developer to help build and maintain our matrimonial platform's user interfaces, focusing on creating seamless user experiences for our millions of users.",
      responsibilities: [
        "Develop and maintain responsive, performant React components",
        "Collaborate with designers to implement UI/UX designs",
        "Optimize application for maximum speed and scalability",
        "Work with backend developers to integrate APIs",
        "Implement state management solutions using Redux or Context API"
      ],
      requirements: [
        "4+ years of experience with React.js",
        "Strong understanding of JavaScript, HTML5, and CSS3",
        "Experience with responsive design and mobile-first approaches",
        "Knowledge of state management patterns",
        "Experience with RESTful APIs and GraphQL"
      ]
    },
    {
      id: 2,
      title: "UI/UX Designer",
      department: "Design",
      location: "Mumbai / Remote",
      type: "Full-Time",
      description: "Join our design team to create intuitive and culturally sensitive user interfaces for our matrimonial platform. Help us create meaningful connections through thoughtful design.",
      responsibilities: [
        "Create wireframes, prototypes, and high-fidelity mockups",
        "Conduct user research and usability testing",
        "Design responsive interfaces that work across devices",
        "Create design systems and component libraries",
        "Collaborate with developers to ensure proper implementation"
      ],
      requirements: [
        "3+ years of UI/UX design experience",
        "Proficiency in design tools like Figma or Adobe XD",
        "Understanding of accessibility standards",
        "Experience designing for diverse user groups",
        "Knowledge of frontend technologies is a plus"
      ]
    },
    {
      id: 3,
      title: "Frontend Developer",
      department: "Frontend Engineering",
      location: "Bangalore / Hybrid",
      type: "Full-Time",
      description: "Help build the next generation of our matrimonial platform with modern frontend technologies. Focus on creating performant, accessible, and beautiful user interfaces.",
      responsibilities: [
        "Implement responsive UI components using React",
        "Write clean, maintainable, and testable code",
        "Optimize application performance",
        "Work with UX designers to implement designs accurately",
        "Stay updated with emerging frontend technologies"
      ],
      requirements: [
        "2+ years of experience with React.js",
        "Strong JavaScript fundamentals",
        "Experience with CSS preprocessors like SASS/LESS",
        "Knowledge of version control systems (Git)",
        "Understanding of cross-browser compatibility issues"
      ]
    }
  ];

  const toggleJob = (id) => {
    setExpandedJob(expandedJob === id ? null : id);
  };

  const benefits = [
    { 
      icon: "💪", 
      title: "Health & Wellness", 
      description: "Comprehensive health insurance, mental wellness programs, and gym memberships." 
    },
    { 
      icon: "🌴", 
      title: "Flexible Time Off", 
      description: "Generous paid time off policy to help you rest, recharge, and celebrate life's important moments." 
    },
    { 
      icon: "💻", 
      title: "Remote Work", 
      description: "Flexible work arrangements with options to work remotely or from our modern offices." 
    },
    { 
      icon: "📚", 
      title: "Learning & Development", 
      description: "Budget for conferences, courses, and books to help you grow professionally." 
    },
    { 
      icon: "💰", 
      title: "Competitive Salary", 
      description: "Above-market compensation with equity options and regular performance reviews." 
    },
    { 
      icon: "🚀", 
      title: "Career Growth", 
      description: "Clear career progression paths and mentorship opportunities." 
    }
  ];

  return (
    <div className="careers-page">
      <div className="careers-hero">
        <div className="careers-hero-content">
          <h1>Join Our Team</h1>
          <p>Help us connect hearts and build meaningful relationships through technology.</p>
          <button className="cta-button">View Open Positions</button>
        </div>
      </div>

      <section className="careers-mission">
        <div className="container">
          <h2>Our Mission</h2>
          <p>
            At [Company Name], we're reimagining how people find life partners in the digital age. 
            We blend tradition with technology to create meaningful connections that respect cultural values 
            while embracing modern approaches to relationships.
          </p>
          <div className="mission-stats">
            <div className="stat-item">
              <span className="stat-number">10M+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">20+</span>
              <span className="stat-label">Countries</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500K+</span>
              <span className="stat-label">Successful Matches</span>
            </div>
          </div>
        </div>
      </section>

      <section className="careers-content">
        <div className="container">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'openings' ? 'active' : ''}`}
              onClick={() => setActiveTab('openings')}
            >
              Open Positions
            </button>
            <button 
              className={`tab ${activeTab === 'benefits' ? 'active' : ''}`}
              onClick={() => setActiveTab('benefits')}
            >
              Benefits & Perks
            </button>
            <button 
              className={`tab ${activeTab === 'culture' ? 'active' : ''}`}
              onClick={() => setActiveTab('culture')}
            >
              Our Culture
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'openings' && (
              <div className="openings-content">
                <div className="jobs-list">
                  {jobOpenings.map(job => (
                    <div key={job.id} className="job-card">
                      <div className="job-header" onClick={() => toggleJob(job.id)}>
                        <div className="job-title-info">
                          <h3>{job.title}</h3>
                          <div className="job-meta">
                            <span>{job.department}</span>
                            <span>{job.location}</span>
                            <span>{job.type}</span>
                          </div>
                        </div>
                        <div className="job-expand">
                          <span className={`expand-icon ${expandedJob === job.id ? 'expanded' : ''}`}>
                            {expandedJob === job.id ? '−' : '+'}
                          </span>
                        </div>
                      </div>
                      
                      {expandedJob === job.id && (
                        <div className="job-details">
                          <p className="job-description">{job.description}</p>
                          
                          <div className="job-section">
                            <h4>Responsibilities:</h4>
                            <ul>
                              {job.responsibilities.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="job-section">
                            <h4>Requirements:</h4>
                            <ul>
                              {job.requirements.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <button className="apply-button">Apply Now</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'benefits' && (
              <div className="benefits-content">
                <div className="benefits-intro">
                  <h3>We take care of our team</h3>
                  <p>We believe that happy employees create the best products. That's why we offer a comprehensive benefits package designed to support your wellbeing, growth, and work-life balance.</p>
                </div>
                
                <div className="benefits-grid">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="benefit-card">
                      <div className="benefit-icon">{benefit.icon}</div>
                      <h4>{benefit.title}</h4>
                      <p>{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'culture' && (
              <div className="culture-content">
                <div className="culture-grid">
                  <div className="culture-text">
                    <h3>Our Values</h3>
                    <ul className="values-list">
                      <li>
                        <strong>Respect for Traditions</strong>
                        <p>We honor cultural values while embracing modern approaches.</p>
                      </li>
                      <li>
                        <strong>Innovation with Purpose</strong>
                        <p>We build technology that enhances human connections, not replaces them.</p>
                      </li>
                      <li>
                        <strong>Privacy & Trust</strong>
                        <p>We handle user data with the utmost care and transparency.</p>
                      </li>
                      <li>
                        <strong>Inclusion</strong>
                        <p>We celebrate diversity and create products that work for everyone.</p>
                      </li>
                    </ul>
                  </div>
                  <div className="culture-image">
                    <div className="image-placeholder">Team Culture Image</div>
                  </div>
                </div>
                
                <div className="testimonials">
                  <h3>What Our Team Says</h3>
                  <div className="testimonial-slider">
                    <div className="testimonial-card">
                      <p>"Working here has been incredible. I get to solve interesting technical challenges while knowing my work is helping people find meaningful relationships."</p>
                      <div className="testimonial-author">
                        <span className="author-name">Priya S.</span>
                        <span className="author-role">Senior React Developer, 3 years</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="careers-cta">
        <div className="container">
          <h2>Ready to make an impact?</h2>
          <p>Join our team and help build technology that brings people together.</p>
          <button className="cta-button">View All Openings</button>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;