import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from "react-router-dom"; // ✅ Correct
import '../styles/HelpCenter.css';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = [
    { id: 'getting-started', name: 'Getting Started' },
    { id: 'account', name: 'Account & Profile' },
    { id: 'matches', name: 'Matches & Connections' },

    { id: 'messaging', name: 'Messaging' },
    { id: 'privacy', name: 'Privacy & Security' },
    { id: 'payments', name: 'Payments & Subscription' },
  ];

  const faqs = {
    'getting-started': [
      {
        id: 'gs1',
        question: 'How do I create an account?',
        answer: 'To create an account, click on the "Sign Up" button on the homepage. You\'ll need to provide your email address, create a password, and fill in basic profile information. You can then gradually complete your detailed profile to improve your matching results.'
      },
      {
        id: 'gs2',
        question: 'What information should I include in my profile?',
        answer: 'A complete profile has higher chances of success. Include accurate personal details, education and career information, family background, your interests, and preferences in a partner. Upload clear, recent photos that show your face well. Be honest and specific about what you\'re looking for in a relationship.'
      },
      {
        id: 'gs3',
        question: 'How can I get the best matches?',
        answer: 'To get quality matches: 1) Complete your profile 100%, 2) Upload multiple clear photos, 3) Be specific about your preferences, 4) Regularly log in and engage with the platform, 5) Respond to messages and connection requests promptly, and 6) Update your profile periodically to keep it current.'
      }
    ],
    'account': [
      {
        id: 'ac1',
        question: 'How do I edit my profile information?',
        answer: 'To edit your profile, click on your profile picture in the top right corner and select "Edit Profile" from the dropdown menu. You can update different sections of your profile by clicking on the respective tabs. Don\'t forget to save your changes before exiting.'
      },
      {
        id: 'ac2',
        question: 'Can I change my email address or phone number?',
        answer: 'Yes, you can change your email address or phone number in the Account Settings section. Go to your profile, click on "Settings", then "Account". You\'ll need to verify the new email address or phone number before the changes take effect.'
      },
      {
        id: 'ac3',
        question: 'How do I delete my account?',
        answer: 'To delete your account, go to "Settings" > "Account" > "Delete Account". Please note that this action is permanent and all your data will be removed from our system. If you\'re having issues with the platform, consider contacting our support team before deleting your account.'
      }
    ],
    'matches': [
      {
        id: 'ma1',
        question: 'How does the matching algorithm work?',
        answer: 'Our matching algorithm considers multiple factors including your preferences, interests, background, education, lifestyle choices, and relationship goals. It also learns from your interactions, such as profiles you show interest in, to better understand your preferences over time and provide more relevant matches.'
      },
      {
        id: 'ma2',
        question: 'What does it mean when someone "expresses interest"?',
        answer: 'When someone "expresses interest," it means they have viewed your profile and would like to connect with you. You\'ll receive a notification and can choose to accept or decline their interest. If you accept, you can start messaging each other to get to know one another better.'
      },
      {
        id: 'ma3',
        question: 'How can I filter my matches?',
        answer: 'You can filter matches by clicking on the "Filter" option on the matches page. You can set filters based on age, location, education, profession, religion, and more. Using specific filters helps you find more compatible matches aligned with your preferences.'
      }
    ],
    'messaging': [
      {
        id: 'me1',
        question: 'How do I start a conversation?',
        answer: 'To start a conversation, go to the profile of a match you\'re interested in and click on the "Message" button. Alternatively, you can access your connections from the "Messages" tab and select a connection to begin chatting. Start with a personalized greeting referencing specific profile details to make a good impression.'
      },
      {
        id: 'me2',
        question: 'Can I send photos in messages?',
        answer: 'Yes, you can send photos in messages after you\'ve been conversing with a match for at least 24 hours. This waiting period is designed to ensure respectful communication. To send a photo, click the attachment icon in the message input area. Please remember our community guidelines regarding appropriate content.'
      },
      {
        id: 'me3',
        question: 'How do I block someone from messaging me?',
        answer: 'To block someone, go to their profile and click on the three dots menu in the top right corner, then select "Block User". Alternatively, you can block a user directly from the chat interface by clicking the menu icon within the chat and selecting "Block". Blocked users cannot view your profile or send you messages.'
      }
    ],
    'privacy': [
      {
        id: 'pr1',
        question: 'Who can see my profile?',
        answer: 'By default, only registered users who match your preferences can see your profile. You can adjust your privacy settings to further control who sees your profile information. Options include making your profile visible only to premium members, hiding certain details from non-matches, or browsing in private mode.'
      },
      {
        id: 'pr2',
        question: 'How can I control who sees my photos?',
        answer: 'You can control photo visibility in your privacy settings. Options include making all photos visible to everyone, showing certain photos only to matches, or requiring permission before someone can view your gallery. Go to "Settings" > "Privacy" > "Photo Privacy" to adjust these preferences.'
      },
      {
        id: 'pr3',
        question: 'How is my personal information protected?',
        answer: 'We take data protection seriously. Your personal information is encrypted and stored securely. We never share your contact details with other users until you explicitly choose to do so. We implement advanced security measures to prevent unauthorized access to your data. For more details, please review our Privacy Policy.'
      }
    ],
    'payments': [
      {
        id: 'pa1',
        question: 'What are the benefits of premium membership?',
        answer: 'Premium membership includes benefits such as unlimited messaging, seeing who\'s interested in you, advanced search filters, priority profile placement, read receipts for messages, profile highlighting, and dedicated customer support. Premium members generally receive 3-4 times more responses than standard members.'
      },
      {
        id: 'pa2',
        question: 'How do I cancel my subscription?',
        answer: 'To cancel your subscription, go to "Settings" > "Subscription" > "Manage Subscription" > "Cancel Subscription". Your premium features will remain active until the end of your current billing period. You\'ll receive a confirmation email once your cancellation is processed.'
      },
      {
        id: 'pa3',
        question: 'Is there a refund policy?',
        answer: 'We offer a 7-day refund policy for new premium subscriptions if you\'re unsatisfied with the service. After this period, refunds are evaluated on a case-by-case basis. To request a refund, contact our customer support with your account details and reason for the refund request. Refunds typically process within 5-7 business days.'
      }
    ]
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredFaqs = searchQuery.trim() === '' 
    ? faqs[activeCategory] 
    : Object.values(faqs).flat().filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Help Center</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Find answers to common questions about using our matrimonial service.
        </p>
        
        <div className="mt-6 max-w-xl mx-auto relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      {searchQuery.trim() === '' ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Categories</h2>
            <nav className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeCategory === category.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </nav>
            
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Need more help?</h3>
              <p className="text-sm text-blue-700 mb-3">
                Can't find what you're looking for? Contact our support team.
              </p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-700 transition-colors">
                <Link to='/contact'>Contact Support</Link>
              </button>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {categories.find(c => c.id === activeCategory).name}
            </h2>
            <div className="space-y-4">
              {faqs[activeCategory].map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <span className="text-gray-500 ml-2">
                      {expandedFaq === faq.id ? '−' : '+'}
                    </span>
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Search Results for "{searchQuery}"
          </h2>
          
          {filteredFaqs.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <span className="text-gray-500 ml-2">
                      {expandedFaq === faq.id ? '−' : '+'}
                    </span>
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-4">No results found for your search.</p>
              <p className="text-gray-500">Try different keywords or browse the categories.</p>
              <button 
                className="mt-4 text-blue-600 hover:text-blue-800"
                onClick={() => setSearchQuery('')}
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      )}

      <div className="mt-16 border-t border-gray-200 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-green-50 p-6 rounded-lg text-center">
            <h3 className="text-lg font-medium text-green-800 mb-2">Video Tutorials</h3>
            <p className="text-green-700 mb-4">Watch our step-by-step guides to using the platform effectively.</p>
            <button className="text-green-700 font-medium hover:text-green-900">
              View Tutorials →
            </button>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg text-center">
            <h3 className="text-lg font-medium text-purple-800 mb-2">Success Stories</h3>
            <p className="text-purple-700 mb-4">Read how others found their perfect match on our platform.</p>
            <button className="text-purple-700 font-medium hover:text-purple-900">
              Read Stories →
            </button>
          </div>
          
          <div className="bg-orange-50 p-6 rounded-lg text-center">
            <h3 className="text-lg font-medium text-orange-800 mb-2">Dating Tips</h3>
            <p className="text-orange-700 mb-4">Expert advice on creating meaningful connections.</p>
            <button className="text-orange-700 font-medium hover:text-orange-900">
              Get Tips →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;