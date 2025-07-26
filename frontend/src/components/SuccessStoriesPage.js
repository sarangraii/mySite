import React, { useState } from 'react';
import '../styles/SuccessStoriesPage.css';
import arr1 from '../Images/arr1.avif';
import arr2 from '../Images/arr2.jpg';
import arr3 from '../Images/arr3.jpg';
import love1 from '../Images/love1.jpg';
import love2 from '../Images/love2.webp';
import second from '../Images/second.jpg';

const SuccessStoriesPage = () => {
  const [activeStory, setActiveStory] = useState(null);
  const [filter, setFilter] = useState('all');
  
  // Sample success stories data
  const successStories = [
    {
      id: 1,
      coupleName: "Priya & Rahul",
      location: "Mumbai, India",
      marriageDate: "June 12, 2024",
      story: "We matched on Perfect Match in January 2023 and instantly connected over our shared love for travel and photography. After several video calls and family meetings, we knew we were meant to be together. Our wedding was a beautiful blend of traditions, just like our relationship. We're grateful to this platform for bringing us together!",
      matchType: "arranged",
      image: arr1,
      quote: "From matching profiles to matching souls - our journey began with a simple 'hello'.",
      testimonial: "The personality compatibility matching feature was spot on! We couldn't have found each other without it."
    },
    {
      id: 2,
      coupleName: "Sarah & David",
      location: "Maharashtra, India",
      marriageDate: "August 8, 2024",
      story: "Despite living just 20 minutes apart in Maharashtra, our paths never crossed until we matched on Perfect Match. We both were skeptical about online matrimonial services but decided to give it a try. After our first coffee date that turned into a 5-hour conversation, we knew there was something special. Our interfaith relationship has been a beautiful journey of learning and respect. Thank you for helping us find each other!",
      matchType: "love",
      image: love1,
      quote: "Different backgrounds, one beautiful love story.",
      testimonial: "The detailed preferences feature helped us find someone who shared our values despite coming from different cultures."
    },
    {
      id: 3,
      coupleName: "Aisha & Omar",
      location: "Pune, India",
      marriageDate: "November 15, 2024",
      story: "Our families had been trying to find suitable matches for both of us for years without success. When we matched on Perfect Match, both families were hesitant about an online connection. However, after our first meeting with both families present, everyone agreed it was a perfect match! Our traditional wedding was a joyous celebration of not just our union but the coming together of two families. We're now expecting our first child!",
      matchType: "arranged",
      image: arr2,
      quote: "When fate needed a little help, Perfect Match stepped in.",
      testimonial: "The family profile feature was instrumental in making both our families comfortable with this process."
    },
    {
      id: 4,
      coupleName: "Javier & Miguel",
      location: "Jaypur, India",
      marriageDate: "Agust 14, 2024",
      story: "Finding a platform that respected and celebrated our identities was a challenge until we discovered Perfect Match. The inclusive environment allowed us to be our authentic selves while searching for love. After matching in March 2023, we had our first date at a local art gallery and instantly connected. Our courthouse wedding was intimate and perfect, surrounded by supportive friends and family. We're now planning our dream honeymoon to Japan!",
      matchType: "love",
      image:love2,
      quote: "Love is love, and we found ours here.",
      testimonial: "The inclusive features and respectful community made our search for love feel dignified and hopeful."
    },
    {
      id: 5,
      coupleName: "Pooja & Ritesh",
      location: "M.P, India",
      marriageDate: "April 22, 2024",
      story: "As busy professionals in our 40s, we had almost given up on finding someone who understood our lifestyle and previous relationship experiences. Perfect Match's compatibility algorithm brought us together based on our life stages, values, and future goals. Our first video date during the pandemic turned into daily calls, and when travel restrictions lifted, Michael flew from Melbourne to Sydney. We had a beautiful beachside wedding and are now blending our families with his two children and my daughter.",
      matchType: "second",
      image:second,
      quote: "It's never too late for a new beginning.",
      testimonial: "The life stage matching feature understood what we needed at this point in our lives. Perfect for those of us getting a second chance at love."
    },
    {
      id: 6,
      coupleName: "Raj & Anita",
      location: "Ahemdabad, India",
      marriageDate: "November 17, 2024",
      story: "Both born in the Ahemdabad to Indian parents, we were looking for someone who balanced cultural traditions with modern values. Our parents had profiles on Perfect Match on our behalf, but we took over the conversations once we matched. After three months of dating and family meetings, we had a traditional roka ceremony followed by an engagement. Our wedding combined traditional Indian ceremonies with contemporary British elements, representing our shared heritage and future.",
      matchType: "arranged",
      image: arr3,
      quote: "The perfect blend of tradition and love.",
      testimonial: "The cultural compatibility features helped us find someone who understood the unique experience of being British-Indian."
    }
  ];
  
  const filteredStories = filter === 'all' 
    ? successStories 
    : successStories.filter(story => story.matchType === filter);
  
  const openStoryModal = (storyId) => {
    setActiveStory(successStories.find(story => story.id === storyId));
    document.body.style.overflow = 'hidden';
  };
  
  const closeStoryModal = () => {
    setActiveStory(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="success-stories-page">
      <div className="success-header">
        <h1>Success Stories</h1>
        <p>Real couples who found their perfect match on our platform</p>
      </div>
      
      <div className="success-filters">
        <button 
          className={`filter-button ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Stories
        </button>
        <button 
          className={`filter-button ${filter === 'arranged' ? 'active' : ''}`}
          onClick={() => setFilter('arranged')}
        >
          Arranged Marriages
        </button>
        <button 
          className={`filter-button ${filter === 'love' ? 'active' : ''}`}
          onClick={() => setFilter('love')}
        >
          Love Marriages
        </button>
        <button 
          className={`filter-button ${filter === 'second' ? 'active' : ''}`}
          onClick={() => setFilter('second')}
        >
          Second Marriages
        </button>
      </div>
      
      <div className="success-stats">
        <div className="stat-item">
          <span className="stat-number">5000+</span>
          <span className="stat-label">Successful Matches</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">98%</span>
          <span className="stat-label">Satisfaction Rate</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">150+</span>
          <span className="stat-label">Countries</span>
        </div>
      </div>
      
      <div className="success-stories-grid">
        {filteredStories.map(story => (
          <div className="story-card" key={story.id} onClick={() => openStoryModal(story.id)}>
            <div className="story-image">
              <img src={story.image} alt={`${story.coupleName}`} />
            </div>
            <div className="story-content">
              <h3>{story.coupleName}</h3>
              <p className="story-location">{story.location}</p>
              <p className="story-date">Married on {story.marriageDate}</p>
              <p className="story-quote">"{story.quote}"</p>
              <button className="read-more-btn">Read Their Story</button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredStories.length === 0 && (
        <div className="no-stories">
          <p>No stories found matching your filter. Please try another category.</p>
        </div>
      )}
      
      {activeStory && (
        <div className="story-modal">
          <div className="modal-overlay" onClick={closeStoryModal}></div>
          <div className="modal-content">
            <button className="close-modal" onClick={closeStoryModal}>×</button>
            <div className="modal-image">
              <img src={activeStory.image} alt={activeStory.coupleName} />
            </div>
            <div className="modal-details">
              <h2>{activeStory.coupleName}</h2>
              <p className="modal-location">{activeStory.location}</p>
              <p className="modal-date">Married on {activeStory.marriageDate}</p>
              <div className="modal-story">
                <h3>Our Story</h3>
                <p>{activeStory.story}</p>
              </div>
              <div className="modal-testimonial">
                <h3>What They Say About Us</h3>
                <p>"{activeStory.testimonial}"</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="share-success">
        <h2>Found Your Perfect Match Through Us?</h2>
        <p>Share your love story and inspire others on their journey to finding love</p>
        <button className="share-story-btn">Share Your Success Story</button>
      </div>
    </div>
  );
};

export default SuccessStoriesPage;