import React, { useState, useEffect } from 'react';
import '../styles/TermsServicePage.css';

const TermsServicePage = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Handle scrolling and back to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };
  
  // Scroll back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Last updated date
  const lastUpdated = "March 10, 2025";
  
  return (
    <div className="terms-service-page">
      <div className="terms-header">
        <h1>Terms of Service</h1>
        <p>Last Updated: {lastUpdated}</p>
      </div>
      
      <div className="terms-container">
        <div className="terms-sidebar">
          <div className="sidebar-inner">
            <h3>Table of Contents</h3>
            <ul>
              <li
                className={activeSection === 'introduction' ? 'active' : ''}
                onClick={() => scrollToSection('introduction')}
              >
                1. Introduction
              </li>
              <li
                className={activeSection === 'eligibility' ? 'active' : ''}
                onClick={() => scrollToSection('eligibility')}
              >
                2. Eligibility
              </li>
              <li
                className={activeSection === 'account' ? 'active' : ''}
                onClick={() => scrollToSection('account')}
              >
                3. Account Creation & Responsibilities
              </li>
              <li
                className={activeSection === 'privacy' ? 'active' : ''}
                onClick={() => scrollToSection('privacy')}
              >
                4. Privacy & Data Protection
              </li>
              <li
                className={activeSection === 'conduct' ? 'active' : ''}
                onClick={() => scrollToSection('conduct')}
              >
                5. User Conduct
              </li>
              <li
                className={activeSection === 'subscription' ? 'active' : ''}
                onClick={() => scrollToSection('subscription')}
              >
                6. Subscription & Payments
              </li>
              <li
                className={activeSection === 'termination' ? 'active' : ''}
                onClick={() => scrollToSection('termination')}
              >
                7. Termination
              </li>
              <li
                className={activeSection === 'liability' ? 'active' : ''}
                onClick={() => scrollToSection('liability')}
              >
                8. Limitation of Liability
              </li>
              <li
                className={activeSection === 'disputes' ? 'active' : ''}
                onClick={() => scrollToSection('disputes')}
              >
                9. Dispute Resolution
              </li>
              <li
                className={activeSection === 'modifications' ? 'active' : ''}
                onClick={() => scrollToSection('modifications')}
              >
                10. Modifications to Terms
              </li>
              <li
                className={activeSection === 'contact' ? 'active' : ''}
                onClick={() => scrollToSection('contact')}
              >
                11. Contact Us
              </li>
            </ul>
          </div>
        </div>
        
        <div className="terms-content">
          <section id="introduction">
            <h2>1. Introduction</h2>
            <p>Welcome to [Your Matrimonial Website Name] ("we," "our," or "the Service"). By accessing or using our website, mobile application, or any of our services, you agree to be bound by these Terms of Service. Please read these terms carefully before using our platform.</p>
            <p>Our mission is to help individuals find suitable life partners in a safe, respectful environment. These Terms of Service outline the rules for using our platform and the legal relationship between you and us. If you do not agree with any part of these terms, please do not use our Service.</p>
          </section>
          
          <section id="eligibility">
            <h2>2. Eligibility</h2>
            <p>To use our Service, you must be:</p>
            <ul>
              <li>At least 18 years of age</li>
              <li>Legally eligible to marry under the laws of your country or region of residence</li>
              <li>Not currently married (unless specifically using a section of our Service designed for second marriages where legally permitted)</li>
              <li>Mentally capable of entering into a legally binding agreement</li>
            </ul>
            <p>By registering for our Service, you represent and warrant that you meet all eligibility requirements. We reserve the right to terminate accounts of users who misrepresent their eligibility status.</p>
          </section>
          
          <section id="account">
            <h2>3. Account Creation & Responsibilities</h2>
            <p>When creating an account, you must provide accurate, current, and complete information. This includes but is not limited to:</p>
            <ul>
              <li>Your legal name</li>
              <li>Date of birth</li>
              <li>Gender</li>
              <li>Contact information</li>
              <li>Current marital status</li>
              <li>Educational and professional background</li>
              <li>Family information and preferences for a life partner</li>
            </ul>
            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.</p>
            <p>You acknowledge that profile verification is an important part of our Service, and you agree to comply with our verification procedures, which may include providing government-issued identification and participating in video verification calls.</p>
          </section>
          
          <section id="privacy">
            <h2>4. Privacy & Data Protection</h2>
            <p>Your privacy is important to us. Our Privacy Policy describes how we collect, use, store, and share your personal information. By using our Service, you consent to our collection and use of your data as described in our Privacy Policy.</p>
            <p>We implement various security measures to protect your personal information, but we cannot guarantee absolute security. You acknowledge that you provide your personal information at your own risk.</p>
            <p>You control who can view your profile information through our privacy settings. Please review and update these settings regularly to ensure they reflect your preferences.</p>
            <p>You grant us a non-exclusive, worldwide, royalty-free license to use, copy, modify, and display any content that you upload to our Service, solely for the purpose of operating and improving our Service.</p>
          </section>
          
          <section id="conduct">
            <h2>5. User Conduct</h2>
            <p>While using our Service, you agree not to:</p>
            <ul>
              <li>Provide false or misleading information about yourself</li>
              <li>Create multiple accounts for deceptive purposes</li>
              <li>Harass, intimidate, or threaten other users</li>
              <li>Share obscene, offensive, or illegal content</li>
              <li>Attempt to impersonate another person or entity</li>
              <li>Use our Service for commercial solicitation or advertising</li>
              <li>Engage in financial exploitation or scamming of other users</li>
              <li>Attempt to circumvent any technical measures we've put in place</li>
              <li>Use our Service to arrange marriages that violate applicable laws</li>
              <li>Share contact information to bypass our communication systems</li>
            </ul>
            <p>We reserve the right to investigate and take appropriate action against any user who violates these provisions, including removing content, suspending or terminating accounts, and reporting to law enforcement authorities.</p>
          </section>
          
          <section id="subscription">
            <h2>6. Subscription & Payments</h2>
            <p>We offer both free and premium subscription options. Premium features are available only to paying subscribers.</p>
            <p>Subscription fees are clearly displayed before purchase. By subscribing to a premium plan, you authorize us to charge the payment method provided for the subscription fee at the then-current rate.</p>
            <p>Subscriptions automatically renew at the end of each billing period unless canceled at least 24 hours before the end of the current period. You can manage or cancel your subscription through your account settings.</p>
            <p>Refunds are provided in accordance with our Refund Policy and applicable consumer protection laws. In general, no refunds are provided for partial use of services or if a user fails to find a suitable match.</p>
          </section>
          
          <section id="termination">
            <h2>7. Termination</h2>
            <p>We reserve the right to suspend or terminate your account at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.</p>
            <p>You may terminate your account at any time by following the instructions in your account settings. Upon termination:</p>
            <ul>
              <li>Your profile will no longer be visible to other users</li>
              <li>You will lose access to messages and connections</li>
              <li>We will retain your information as required by law or as outlined in our Privacy Policy</li>
              <li>Any paid subscription fees will not be refunded except as required by applicable law</li>
            </ul>
          </section>
          
          <section id="liability">
            <h2>8. Limitation of Liability</h2>
            <p>Our Service is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, regarding the operation of our Service or the information, content, or materials included on it.</p>
            <p>To the fullest extent permitted by applicable law, we disclaim all warranties, expressed or implied, including but not limited to implied warranties of merchantability and fitness for a particular purpose.</p>
            <p>We do not guarantee the accuracy of information provided by users. We are not responsible for the conduct, whether online or offline, of any user of our Service.</p>
            <p>We will not be liable for any damages of any kind arising from the use of our Service, including but not limited to direct, indirect, incidental, punitive, and consequential damages.</p>
            <p>We do not conduct criminal background checks on all users and make no representations about the conduct or character of any user.</p>
          </section>
          
          <section id="disputes">
            <h2>9. Dispute Resolution</h2>
            <p>You agree to resolve any disputes with us through binding arbitration on an individual basis. Class actions and class arbitrations are not permitted.</p>
            <p>The arbitration will be conducted by a neutral arbitrator in accordance with the arbitration rules of [Relevant Arbitration Association] and will take place in [City, Country/State].</p>
            <p>The arbitrator will decide the rights and liabilities, if any, of you and us. The dispute will not be consolidated with any other matters or joined with any other cases or parties.</p>
            <p>If you prevail in the arbitration, we will reimburse you for your filing and arbitrator fees up to a maximum of [Amount]. Each party will bear its own attorney fees unless the arbitrator awards them to a party.</p>
            <p>You may opt out of this arbitration agreement by notifying us in writing within 30 days of the date you first became subject to this arbitration provision.</p>
          </section>
          
          <section id="modifications">
            <h2>10. Modifications to Terms</h2>
            <p>We reserve the right to modify these Terms of Service at any time. We will provide notice of significant changes by posting the new Terms on our website and updating the "Last Updated" date at the top.</p>
            <p>Your continued use of our Service after such modifications constitutes your acceptance of the revised Terms. If you do not agree to the modified terms, you must stop using our Service.</p>
            <p>It is your responsibility to review these Terms periodically for changes. We recommend checking this page whenever you access our Service.</p>
          </section>
          
          <section id="contact">
            <h2>11. Contact Us</h2>
            <p>If you have any questions about these Terms of Service, please contact us at:</p>
            <p>Email: bhavnabairagi12@gmail.com</p>
            <p>Postal Address: ShubhMilan</p>
            <p>Phone: 7898171132</p>
            <p>We strive to respond to all inquiries within 2 business days.</p>
          </section>
          
          <div className={`back-to-top ${showBackToTop ? 'visible' : ''}`} onClick={scrollToTop}>
            <i className="fa fa-arrow-up"></i> Back to top
          </div>
        </div>
      </div>
      
      <div className="terms-footer">
        <div className="terms-acceptance">
          <p>By using our Service, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsServicePage;