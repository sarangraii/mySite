import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setCookie, applyConsent } from '../utils/cookieManager';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  
  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);
  
  
const acceptAll = () => {
    const preferences = {
      analytics: true,
      functional: true,
      advertising: true
    };
    
    applyConsent(preferences);
    localStorage.setItem('cookie-consent', 'all');
    setShowBanner(false);
  };
  
  
  const acceptEssential = () => {
    localStorage.setItem('cookie-consent', 'essential');
    setShowBanner(false);
    // Here you would only enable essential cookies
  };
  
  if (!showBanner) return null;
  
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-200 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0 md:mr-4">
          <p className="text-gray-700 text-sm">
            We use cookies to enhance your experience on our site. By continuing to browse, you agree to our 
            <Link to="/cookie-policy" className="text-purple-600 hover:text-purple-800"> Cookie Policy</Link>.
          </p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={acceptEssential}
            className="text-sm px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition">
            Essential Only
          </button>
          <button 
            onClick={acceptAll}
            className="text-sm px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;