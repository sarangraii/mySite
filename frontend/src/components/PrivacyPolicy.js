import React, { useState } from 'react';
import '../styles/PrivacyPolicy.css'; // Import the CSS file

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      content: `This Privacy Policy describes how we collect, use, and handle your personal information when you use our matrimonial website and services. We are committed to protecting your privacy and ensuring transparency in our data practices.`
    },
    {
      id: 'information',
      title: 'Information We Collect',
      content: `
        <h4>Personal Information</h4>
        <ul>
          <li>Profile details (name, age, date of birth, gender, contact information)</li>
          <li>Biographical information (education, occupation, income)</li>
          <li>Physical attributes and appearance</li>
          <li>Family background and religious information</li>
          <li>Lifestyle preferences and relationship expectations</li>
          <li>Photos and media content you upload</li>
        </ul>
        
        <h4>Account Information</h4>
        <ul>
          <li>Login credentials</li>
          <li>Account settings and preferences</li>
          <li>Subscription and payment details</li>
        </ul>
        
        <h4>Usage Information</h4>
        <ul>
          <li>Browsing activity and interactions with other profiles</li>
          <li>Search parameters and preferences</li>
          <li>Communication records with other users</li>
          <li>Login times and session duration</li>
          <li>Device information and IP addresses</li>
        </ul>
      `
    },
    {
      id: 'usage',
      title: 'How We Use Your Information',
      content: `
        <ul>
          <li>To create and manage your matrimonial profile</li>
          <li>To provide matching services based on compatibility factors</li>
          <li>To enable communication between potential matches</li>
          <li>To verify your identity and prevent fraudulent activities</li>
          <li>To process payments and manage subscriptions</li>
          <li>To improve our services and user experience</li>
          <li>To send you relevant notifications and updates</li>
          <li>To comply with legal obligations</li>
        </ul>
      `
    },
    {
      id: 'sharing',
      title: 'Information Sharing',
      content: `
        <h4>With Other Users</h4>
        <ul>
          <li>Information you include in your profile will be visible to other users according to your privacy settings</li>
          <li>Communication initiated by you will be shared with the intended recipient</li>
        </ul>
        
        <h4>With Third Parties</h4>
        <ul>
          <li>Service providers who help operate our platform (payment processors, hosting services, etc.)</li>
          <li>Analytics partners to improve our website performance</li>
          <li>Legal authorities when required by law or to protect our rights</li>
        </ul>
        
        <p>We do not sell your personal information to third parties for marketing purposes.</p>
      `
    },
    {
      id: 'controls',
      title: 'Your Privacy Controls',
      content: `
        <ul>
          <li>Profile visibility settings to control who can view your information</li>
          <li>Communication preferences to manage who can contact you</li>
          <li>Option to block specific users</li>
          <li>Ability to download your personal data</li>
          <li>Right to update, correct, or delete your information</li>
        </ul>
      `
    },
    {
      id: 'security',
      title: 'Data Security',
      content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, loss, or alteration. These measures include encryption, secure servers, and regular security assessments.`
    },
    {
      id: 'retention',
      title: 'Data Retention',
      content: `We retain your personal information for as long as your account is active or as needed to provide services. You may request deletion of your account at any time, after which we will delete or anonymize your personal information unless retention is required by law.`
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking Technologies',
      content: `We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can manage cookie preferences through your browser settings.`
    },
    {
      id: 'children',
      title: 'Children\'s Privacy',
      content: `Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children.`
    },
    {
      id: 'international',
      title: 'International Data Transfers',
      content: `If we transfer your information to countries outside your residence, we ensure appropriate safeguards are in place to protect your data in compliance with applicable laws.`
    },
    {
      id: 'changes',
      title: 'Changes to This Privacy Policy',
      content: `We may update this Privacy Policy periodically to reflect changes in our practices or for legal reasons. We will notify you of significant changes through our website or by email.`
    },
    {
      id: 'contact',
      title: 'Contact Information',
      content: `
        <p>If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
        <ul>
          <li>Email: tiyas9748@gmail.com</li>
          <li>Postal Address: ShubhMilan</li>
        </ul>
      `
    },
    {
      id: 'rights',
      title: 'Your Legal Rights',
      content: `
        <p>Depending on your location, you may have rights to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate data</li>
          <li>Delete your information</li>
          <li>Restrict or object to processing</li>
          <li>Data portability</li>
          <li>Withdraw consent</li>
        </ul>
        <p>Please contact us to exercise these rights.</p>
      `
    }
  ];

  return (
    <div className="privacy-policy-container">
      <div className="privacy-header">
        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="privacy-date">Last Updated: March 9, 2025</p>
      </div>

      <div>
        <p className="privacy-intro">
          Please take a moment to review our privacy policy below to understand how we collect, use, and protect your personal information.
        </p>

        <div className="privacy-sections">
          {sections.map((section) => (
            <div key={section.id} className="section-container">
              <button
                className="section-button"
                onClick={() => toggleSection(section.id)}
              >
                <span className="section-title">{section.title}</span>
                <span className={`section-icon ${activeSection === section.id ? 'open' : ''}`}>
                  {activeSection === section.id ? '−' : '+'}
                </span>
              </button>
              
              {activeSection === section.id && (
                <div 
                  className="section-content"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="privacy-footer">
          <p className="privacy-disclaimer">
            By using our matrimonial service, you agree to the terms outlined in this privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;