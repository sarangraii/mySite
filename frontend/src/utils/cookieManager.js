// frontend/src/utils/cookieManager.js

/**
 * Utility functions for managing cookies and cookie consent
 */

// Set a cookie with a given name, value and options
export const setCookie = (name, value, options = {}) => {
    const defaults = {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    };
    
    const cookieOptions = { ...defaults, ...options };
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    
    if (cookieOptions.expires) {
      if (typeof cookieOptions.expires === 'number') {
        const days = cookieOptions.expires;
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        cookieOptions.expires = date;
      }
      cookieString += `;expires=${cookieOptions.expires.toUTCString()}`;
    }
    
    if (cookieOptions.path) cookieString += `;path=${cookieOptions.path}`;
    if (cookieOptions.domain) cookieString += `;domain=${cookieOptions.domain}`;
    if (cookieOptions.secure) cookieString += ';secure';
    if (cookieOptions.sameSite) cookieString += `;sameSite=${cookieOptions.sameSite}`;
    
    document.cookie = cookieString;
  };
  
  // Get a cookie value by name
  export const getCookie = (name) => {
    const match = document.cookie.match(new RegExp(`(^|;\\s*)(${name})=([^;]*)`));
    return match ? decodeURIComponent(match[3]) : null;
  };
  
  // Delete a cookie by name
  export const deleteCookie = (name, options = {}) => {
    const defaults = { path: '/' };
    const cookieOptions = { ...defaults, ...options, expires: new Date(0) };
    setCookie(name, '', cookieOptions);
  };
  
  // Enable or disable Google Analytics based on user preference
  export const setupGoogleAnalytics = (allowed = false) => {
    if (allowed) {
      // Enable Google Analytics
      window['ga-disable-UA-XXXXX-Y'] = false;
      
      // Initialize GA if not already initialized
      if (!window.gtag) {
        // Load Google Analytics script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=UA-XXXXX-Y`;
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag() { window.dataLayer.push(arguments); }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', 'UA-XXXXX-Y');
      }
    } else {
      // Disable Google Analytics
      window['ga-disable-UA-XXXXX-Y'] = true;
    }
  };
  
  // Enable or disable Facebook pixel based on user preference
  export const setupFacebookPixel = (allowed = false) => {
    if (allowed) {
      // Enable Facebook Pixel
      if (!window.fbq) {
        // Load Facebook Pixel script
        const script = document.createElement('script');
        script.innerHTML = `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', 'XXXXXXXXXXXXXXX');
          fbq('track', 'PageView');
        `;
        document.head.appendChild(script);
      }
    } else {
      // Disable Facebook Pixel
      if (window.fbq) {
        window.fbq = undefined;
      }
    }
  };
  
  // Process cookie settings based on user choices
  export const applyConsent = (preferences = {}) => {
    const { analytics = false, functional = false, advertising = false } = preferences;
    
    // Always set essential cookies
    
    // Set analytics cookies if allowed
    setupGoogleAnalytics(analytics);
    
    // Set functional cookies if allowed
    if (functional) {
      // Example: Store user preferences like language, theme
      setCookie('user_preferences', JSON.stringify({ 
        language: 'en',
        theme: 'light'
      }), { expires: 365 });
    } else {
      deleteCookie('user_preferences');
    }
    
    // Set advertising cookies if allowed
    setupFacebookPixel(advertising);
    
    // Store consent in local storage for reference
    localStorage.setItem('cookie-consent-details', JSON.stringify({
      preferences,
      timestamp: new Date().toISOString()
    }));
  };