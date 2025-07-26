import React, { useState, useEffect } from 'react';
import '../styles/GalleryPage.css';
import Pre1 from '../Images/pre1.jpg';
import Pre2 from '../Images/pre2.jpg';
import Pre3 from '../Images/pre3.jpg';
import Rec1 from '../Images/rec1.jpg';
import Rec2 from '../Images/rec2.jpg';
import Rec3 from '../Images/rec3.jpg'
import Wed1 from '../Images/wed1.jpg';
import Wed2 from '../Images/wed2.jpg';
import Wed3 from '../Images/wed3.jpg'
import Eng1 from '../Images/eng1.jpg';
import Eng2 from '../Images/eng2.JPG';
import Eng3 from '../Images/eng3.jpg';

const GalleryPage = () => {
  // Sample gallery data - in a real application, this would come from an API
  const [galleries, setGalleries] = useState([
    {
      id: 1,
      title: 'Ketuman & Namrata Wedding',
      description: 'Traditional wedding ceremony in Udaipur',
      category: 'wedding',
      imageUrl: Wed1,
      featured: true
    },
    {
      id: 2,
      title: 'Ketuman & Namrata Engagement',
      description: 'A beautiful engagement ceremony in Ahemdabad',
      category: 'engagement',
      imageUrl: Eng1,
      featured: false
    },
    {
      id: 3,
      title: 'Jaydeep & Vandana Pre-wedding',
      description: 'Pre-wedding photoshoot in Mandsaur',
      category: 'pre-wedding',
      imageUrl: Pre1,
      featured: true
    },
    {
      id: 4,
      title: 'Shubham & Radhika Reception',
      description: 'Grand reception at The Rudraksh Palace',
      category: 'reception',
      imageUrl: Rec1,
      featured: false
    },
    {
      id: 5,
      title: 'Akshay & Dhanshree Wedding',
      description: 'Indian wedding ceremony in Mandsaur',
      category: 'wedding',
      imageUrl:Wed2 ,
      featured: false
    },
    {
      id: 6,
      title: 'Shubham & Radhika Engagement',
      description: 'Intimate engagement ceremony in Ujjain',
      category: 'engagement',
      imageUrl: Eng2,
      featured: true
    },
    {
      id: 7,
      title: 'Nikhil & Riya Pre-wedding',
      description: 'Romantic pre-wedding shoot in Goa',
      category: 'pre-wedding',
      imageUrl:Pre3,
      featured: false
    },
    {
      id: 8,
      title: 'Durgesh & Pooja Reception',
      description: 'Elegant reception event in Pipliya',
      category: 'reception',
      imageUrl: Rec2,
      featured: true
    },
    {
      id: 9,
      title: 'Mayank & Mahima Wedding',
      description: 'Punjabi wedding celebration in Udaipur',
      category: 'wedding',
      imageUrl: Wed3,
      featured: false
    },
    {
      id: 10,
      title: 'Hemant & Prachi Wedding',
      description: 'Indian wedding celebration in Neemuch',
      category: 'reception',
      imageUrl: Rec3,
      featured: false
    },
    {
      id: 11,
      title: 'Jaydeep & Vandna Pre-wedding',
      description: 'Romantic pre-wedding shoot in Udaipur',
      category: 'pre-wedding',
      imageUrl: Pre2,
      featured: false
    },
    {
      id: 12,
      title: 'Rohit & Aastha Engagement',
      description: 'Intimate engagement ceremony in Ratlam',
      category: 'engagement',
      imageUrl: Eng3,
      featured: true
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const categories = ['all', 'wedding', 'engagement', 'pre-wedding', 'reception'];

  const filteredGalleries = selectedCategory === 'all' 
    ? galleries 
    : galleries.filter(gallery => gallery.category === selectedCategory);

  const openLightbox = (image) => {
    setCurrentImage(image);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    const currentIndex = filteredGalleries.findIndex(gallery => gallery.id === currentImage.id);
    const nextIndex = (currentIndex + 1) % filteredGalleries.length;
    setCurrentImage(filteredGalleries[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = filteredGalleries.findIndex(gallery => gallery.id === currentImage.id);
    const prevIndex = (currentIndex - 1 + filteredGalleries.length) % filteredGalleries.length;
    setCurrentImage(filteredGalleries[prevIndex]);
  };

  if (loading) {
    return <div className="gallery-loading">Loading beautiful moments...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white" >
    
    <div className="gallery-page">
      <div className="gallery-header">
        <h1>Our Beautiful Matches</h1>
        <p>Moments that celebrate love and togetherness</p>
      </div>

      <div className="gallery-categories">
        {categories.map(category => (
          <button 
            key={category} 
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {filteredGalleries.length > 0 ? (
          filteredGalleries.map(gallery => (
            <div 
              className="gallery-item" 
              key={gallery.id}
              onClick={() => openLightbox(gallery)}
            >
              <div className="gallery-image-container">
                <img 
                  src={gallery.imageUrl} 
                  alt={gallery.title} 
                  className="gallery-image"
                />
                <div className="gallery-overlay">
                  <div className="gallery-details">
                    <h3>{gallery.title}</h3>
                    <p>{gallery.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-images">No images found in this category</div>
        )}
      </div>

      {lightboxOpen && currentImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>×</button>
            <button className="lightbox-prev" onClick={prevImage}>‹</button>
            <div className="lightbox-image-container">
              <img 
                src={currentImage.imageUrl} 
                alt={currentImage.title} 
                className="lightbox-image"
              />
              <div className="lightbox-details">
                <h3>{currentImage.title}</h3>
                <p>{currentImage.description}</p>
                <span className="lightbox-category">{currentImage.category}</span>
              </div>
            </div>
            <button className="lightbox-next" onClick={nextImage}>›</button>
          </div>
        </div>
      )}
    </div>
   
    </div>   
  );
};

export default GalleryPage;