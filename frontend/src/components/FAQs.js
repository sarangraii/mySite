import React, { useState } from 'react';
import '../styles/FAQs.css'
import {Link} from 'react-router-dom'
const FAQs = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [expandedFaqs, setExpandedFaqs] = useState({});

  // FAQ Categories and Questions
  const faqData = {
    general: [
      {
        id: 'g1',
        question: 'How does your matrimonial matching system work?',
        answer: 'Our matching system uses a proprietary algorithm that considers your preferences, values, interests, and lifestyle compatibility. We analyze over 100 compatibility factors to suggest potential matches that align with what you are looking for in a life partner. As you interact with profiles, our system learns your preferences better, improving match quality over time.'
      },
      {
        id: 'g2',
        question: 'Is my personal information secure on your platform?',
        answer: 'Yes, we take your privacy very seriously. We use bank-level encryption to protect your personal data, and we never share your contact information with other users without your explicit permission. You control who can view your full profile, and you can adjust your privacy settings at any time from your account dashboard.'
      },
      {
        id: 'g3',
        question: 'How long does the verification process take?',
        answer: 'Our standard verification process typically takes 24-48 hours after you submit all required documents. Premium members receive expedited verification usually completed within 12 hours. Verification includes ID confirmation, education credentials, and employment verification where applicable.'
      },
      {
        id: 'g4',
        question: 'Can I hide my profile temporarily?',
        answer: 'Yes, you can pause your profile visibility at any time through your account settings. When paused, your profile wont appear in search results or match recommendations, but you will still have access to your account and messages. You can reactivate visibility with a single click whenever you are ready.'
      }
    ],
    membership: [
      {
        id: 'm1',
        question: 'What features are available in free vs. premium memberships?',
        answer: 'Free membership includes profile creation, limited browsing, and receiving interests. Premium membership unlocks all features including unlimited messaging, advanced filters, contact information access for matches, priority listing in search results, video calls, and personalized matchmaking assistance. We offer several premium tiers to suit different needs and budgets.'
      },
      {
        id: 'm2',
        question: 'How do I upgrade or cancel my membership?',
        answer: 'You can upgrade your membership anytime through the "Membership" section in your account settings. To cancel a premium subscription, visit your account settings, select "Manage Subscription" and follow the cancellation process. Requests must be submitted at least 48 hours before your next billing date to avoid charges.'
      },
      {
        id: 'm3',
        question: 'Do you offer any refunds if I find a match quickly?',
        answer: 'Yes, we offer a Success Match Policy. If you find your partner within the first month of your premium membership and notify us, we will refund 50% of your subscription fee. For longer subscription terms, refunds are prorated based on the remaining membership period after verification of your match success.'
      },
      {
        id: 'm4',
        question: 'Are there any hidden fees I should know about?',
        answer: 'No, we pride ourselves on transparent pricing. Your membership fee covers all features described in your chosen plan. Optional add-ons like professional profile consultations or priority customer support are clearly marked with their associated costs before purchase. All pricing is displayed inclusive of applicable taxes.'
      }
    ],
    profile: [
      {
        id: 'p1',
        question: 'What makes a successful profile on your platform?',
        answer: 'Successful profiles are authentic, comprehensive, and showcase your personality. We recommend uploading 4-6 recent photos in different settings, completing all profile sections, being specific about your preferences and deal-breakers, and writing a thoughtful bio that highlights what makes you unique. Verified profiles receive 5x more interest, so completing verification is also highly recommended.'
      },
      {
        id: 'p2',
        question: 'Can I change my preferences after creating my profile?',
        answer: 'Absolutely! You can update your preferences at any time. From your profile dashboard, select "Edit Preferences" to modify your partner criteria including age range, location, religion, lifestyle factors, and other important attributes. Your match recommendations will update within 24 hours to reflect your new preferences.'
      },
      {
        id: 'p3',
        question: 'How often should I update my profile?',
        answer: 'We recommend refreshing your profile every 2-3 months to keep it current. Update your photos, achievements, and interests as they evolve. Profiles with recent updates receive 30% more visibility in our system. Consider seasonal updates as well, as this shows you are actively engaged in your search.'
      },
      {
        id: 'p4',
        question: 'What photos are not allowed on profiles?',
        answer: 'We prohibit photos that are overly revealing, contain children as the primary subject, include contact information, show excessive filters/editing, include multiple people where your identity is unclear, or contain watermarks from other matrimonial sites. Group photos are acceptable as secondary images as long as you are clearly identifiable.'
      }
    ],
    communication: [
      {
        id: 'c1',
        question: 'When should I share my contact information with a match?',
        answer: 'We recommend exchanging contact information only after several meaningful conversations through our platform and when you feel comfortable with the match. For safety, use our integrated calling feature first, which does not reveal your actual phone number. Premium members can request contact details through our secure verification system once both parties agree.'
      },
      {
        id: 'c2',
        question: 'What if someone is being inappropriate in their messages?',
        answer: 'We have zero tolerance for inappropriate behavior. If you receive disrespectful or offensive messages, please use the "Report" button available on every conversation. Our moderation team reviews reports within 24 hours and takes appropriate action, including warnings, temporary suspensions, or permanent bans for serious violations.'
      },
      {
        id: 'c3',
        question: 'How long should I wait before meeting someone in person?',
        answer: 'There is no fixed timeline, but we recommend communicating through our platform for at least 2-3 weeks before arranging an in-person meeting. Use this time to have video calls (available in our app for premium members) to build comfort and verify compatibility. When you do meet, follow our safety guidelines by choosing public locations and informing someone you trust about your plans.'
      },
      {
        id: 'c4',
        question: 'Are there any communication etiquette guidelines I should follow?',
        answer: 'Yes, respectful communication is essential. Respond to messages within a reasonable timeframe (ideally 48 hours), ask thoughtful questions beyond what is in their profile, be honest about your intentions, respect boundaries if someone declines further communication, and avoid generic copy-pasted messages. Quality conversations focusing on compatibility factors lead to the best outcomes.'
      }
    ],
    success: [
      {
        id: 's1',
        question: 'What is your success rate for matches?',
        answer: 'Our platform has facilitated over 100,000 successful marriages over the past decade. Based on our follow-up surveys, approximately 65% of our premium members find their life partner within 6 months of active usage. Success rates vary based on profile completeness, openness to compatible matches, and level of engagement with the platform.'
      },
      {
        id: 's2',
        question: 'How can I share my success story?',
        answer: 'We love celebrating success stories! If you have found your partner through our platform, you can share your journey through the "Success Stories" section in your account. Include how you met, your journey to marriage, and a couple photo if you wish. With your permission, we may feature your story to inspire others (with an exclusive reward of a 1-year anniversary gift from us).'
      },
      {
        id: 's3',
        question: 'Do you provide any guidance for the post-matching phase?',
        answer: 'Yes, we offer relationship guidance resources through our "Journey to Marriage" section. Premium members have access to pre-marital compatibility assessments, culture-specific marriage preparation resources, and complimentary consultation sessions with relationship counselors. We also host webinars on topics like family integration, financial planning for couples, and building a strong marital foundation.'
      },
      {
        id: 's4',
        question: 'What if I need to take a break from searching?',
        answer: 'Life happens, and sometimes you need to pause your search. You can temporarily hide your profile or set your account to "Taking a Break" status, which maintains your matches and conversations but removes you from active search results. When you re ready to resume, simply reactivate your profile with all your information and connections intact.'
      }
    ]
  };

  const categories = [
    { id: 'general', label: 'General Questions' },
    { id: 'membership', label: 'Membership & Pricing' },
    { id: 'profile', label: 'Profile Creation' },
    { id: 'communication', label: 'Communication & Matches' },
    { id: 'success', label: 'Success Stories' }
  ];

  const toggleFaq = (faqId) => {
    setExpandedFaqs(prev => ({
      ...prev,
      [faqId]: !prev[faqId]
    }));
  };

  // Search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }
    
    let results = [];
    for (const category in faqData) {
      const categoryResults = faqData[category].filter(faq => 
        faq.question.toLowerCase().includes(query) || 
        faq.answer.toLowerCase().includes(query)
      );
      results = [...results, ...categoryResults];
    }
    
    setSearchResults(results);
  };

  return (
    <div className="matrimonial-faqs-container">
      <div className="faqs-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about our matrimonial service and how to make the most of your journey to finding a life partner.</p>
        
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search for questions..." 
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          <div className="search-icon">🔍</div>
        </div>
      </div>
      
      {searchQuery.length >= 3 && (
        <div className="search-results">
          <h2>Search Results</h2>
          {searchResults.length === 0 ? (
            <p className="no-results">No matching questions found. Try different keywords or browse categories below.</p>
          ) : (
            <div className="faq-list">
              {searchResults.map((faq) => (
                <div className="faq-item" key={faq.id}>
                  <div 
                    className={`faq-question ${expandedFaqs[faq.id] ? 'active' : ''}`}
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <h3>{faq.question}</h3>
                    <span className="toggle-icon">{expandedFaqs[faq.id] ? '−' : '+'}</span>
                  </div>
                  {expandedFaqs[faq.id] && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {(searchQuery.length < 3) && (
        <>
          <div className="category-tabs">
            {categories.map((category) => (
              <button 
                key={category.id}
                className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          <div className="faq-content">
            <div className="faq-list">
              {faqData[activeCategory].map((faq) => (
                <div className="faq-item" key={faq.id}>
                  <div 
                    className={`faq-question ${expandedFaqs[faq.id] ? 'active' : ''}`}
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <h3>{faq.question}</h3>
                    <span className="toggle-icon">{expandedFaqs[faq.id] ? '−' : '+'}</span>
                  </div>
                  {expandedFaqs[faq.id] && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="faq-sidebar">
              <div className="contact-support">
                <h3>Still have questions?</h3>
                <p>Our dedicated support team is here to help you with any questions or concerns.</p>
                <button className="contact-button">
                <Link to='/contact'>Contact Support</Link>
                </button>
              </div>
              
              <div className="related-resources">
                <h3>Related Resources</h3>
                <ul>
                  <li><a href="#">Matrimonial Success Guide</a></li>
                  <li><a href="#">Safety Tips for Online Meetings</a></li>
                  <li><a href="#">Profile Enhancement Workshop</a></li>
                  <li><a href="#">Cultural Compatibility Guide</a></li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
      
      <div className="footer-cta">
        <h3>Ready to begin your journey?</h3>
        <p>Join thousands of couples who found their perfect match on our platform.</p>
        <button className="cta-button">
          <Link to='/register'>Create Your Profile</Link>
          </button>
      </div>
    </div>
  );
};

export default FAQs;