import React, { useState } from 'react';

const SafetyTips = () => {
  const [expandedTip, setExpandedTip] = useState(null);
  
  const safetyTips = [
    {
      id: 1,
      category: "Profile Verification",
      title: "Verify Before You Trust",
      shortDesc: "Always verify the authenticity of profiles before sharing personal information.",
      icon: "🔍",
      color: "#4299e1",
      details: [
        "Look for verified badges or verification checkmarks on profiles",
        "Be cautious of profiles with very few photos or incomplete information",
        "Research their social media presence if possible (with their consent)",
        "Consider video calls before meeting in person to confirm identity"
      ]
    },
    {
      id: 2,
      category: "Meeting Safety",
      title: "First Meeting Precautions",
      shortDesc: "Take necessary precautions when planning to meet someone in person.",
      icon: "🤝",
      color: "#38b2ac",
      details: [
        "Always meet in public places with plenty of people around",
        "Inform friends or family about your meeting details",
        "Share your live location with a trusted person",
        "Arrange your own transportation to and from the meeting",
        "Keep first meetings short (coffee or lunch rather than dinner)"
      ]
    },
    {
      id: 3,
      category: "Privacy Protection",
      title: "Guard Your Personal Information",
      shortDesc: "Be mindful about sharing personal and financial information online.",
      icon: "🔒",
      color: "#ed8936",
      details: [
        "Never share financial information or documents with matches",
        "Avoid sharing your home address until trust is established",
        "Be cautious about sharing workplace details early in conversations",
        "Use the platform's messaging system initially before moving to personal contact",
        "Consider using a Google Voice number instead of your personal number"
      ]
    },
    {
      id: 4,
      category: "Red Flags",
      title: "Recognize Warning Signs",
      shortDesc: "Be alert to common red flags that may indicate potential scams or deception.",
      icon: "⚠️",
      color: "#e53e3e",
      details: [
        "Reluctance to video chat or meet in person",
        "Requests for money or financial assistance of any kind",
        "Inconsistent information or stories that change over time",
        "Overly romantic or intense communication very early in the relationship",
        "Pressure to move communication off the platform quickly",
        "Vague or evasive answers to direct questions about their life"
      ]
    },
    {
      id: 5,
      category: "Communication",
      title: "Healthy Communication Practices",
      shortDesc: "Establish clear boundaries and practice respectful communication.",
      icon: "💬",
      color: "#805ad5",
      details: [
        "Trust your instincts - if something feels wrong, it probably is",
        "Maintain boundaries and don't feel pressured to respond immediately",
        "Be honest about your intentions and expectations",
        "Report inappropriate behavior to the platform immediately",
        "Block and report users who make you uncomfortable"
      ]
    }
  ];

  const toggleExpand = (id) => {
    if (expandedTip === id) {
      setExpandedTip(null);
    } else {
      setExpandedTip(id);
    }
  };

  return (
    <div className="matrimonial-safety-container">
      <header className="safety-header">
        <h1 className="safety-title">Stay Safe While Finding Love</h1>
        <p className="safety-subtitle">Your safety is our priority. Review these important guidelines before connecting with potential matches.</p>
      </header>

      <div className="safety-tips-grid">
        {safetyTips.map(tip => (
          <div 
            className={`safety-tip-card ${expandedTip === tip.id ? 'expanded' : ''}`} 
            key={tip.id}
            style={{ '--card-accent-color': tip.color }}
            onClick={() => toggleExpand(tip.id)}
          >
            <div className="tip-card-header">
              <div className="tip-icon" style={{ backgroundColor: tip.color }}>
                {tip.icon}
              </div>
              <div className="tip-title-section">
                <span className="tip-category">{tip.category}</span>
                <h3 className="tip-title">{tip.title}</h3>
              </div>
              <span className="expand-icon">{expandedTip === tip.id ? '−' : '+'}</span>
            </div>
            
            <p className="tip-short-desc">{tip.shortDesc}</p>
            
            {expandedTip === tip.id && (
              <div className="tip-details">
                <ul>
                  {tip.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="safety-footer">
        <div className="safety-report-section">
          <h3>Report Concerns</h3>
          <p>If you encounter suspicious behavior, please report it immediately through our platform or contact our support team.</p>
          <button className="report-button">Report a Concern</button>
        </div>
        <div className="safety-resources">
          <h3>Additional Resources</h3>
          <ul>
            <li><a href="#">Dating Safety Guidelines</a></li>
            <li><a href="#">Online Privacy Protection</a></li>
            <li><a href="#">Identifying Scams</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SafetyTips;