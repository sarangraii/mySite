import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaHeart, FaUsers, FaShieldAlt, FaHome, FaImages, FaPhone, FaSignInAlt } from 'react-icons/fa';
import '../styles/Home.css';
import homeimage from '../Images/home.jpg';
import img1 from '../Images/home2.jpeg';
import img2 from '../Images/img2.jpg';
import img3 from '../Images/img3.jpeg';



const Home = () => {
  const testimonials = [
    {
      id: 1,
      name: "Mahima & Mayank",
      message: "We connected on this platform and after 1 year of knowing each other, we tied the knot. Thank you for helping us find each other!",
      date: "Married on February 2024",
      image: img1
    },
    {
      id: 2,
      name: "Anjali & Rohit",
      message: "Finding my soulmate was never this easy. We instantly connected and are now happily married!",
      date: "Married on January 2023",
      image: img2
    },
    {
      id: 3,
      name: "Yashi & Sarang",
      message: "Thanks to this platform, we found love and happiness. Forever grateful!",
      date: "Married on June 2022",
      image: img3
    }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">

      
      {/* Hero Section */}
      <header className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={homeimage} 
            alt="Happy couple" 
            className="w-full h-full object-cover opacity-80 container-fluid"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        
        <div className="container mx-auto px-6 z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Find Your Perfect <span className="text-rose-400">Match</span>
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Join thousands of happy couples who found their soulmate on our platform. Start your journey to forever today.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to="/register" className="bg-rose-500 hover:bg-rose-600 text-btn font-bold py-3 px-8 rounded-full transition duration-300 link-btn">
              Register Free
            </Link>
            <Link to="/search" className="btn-hover bg-r  font-bold py-3 px-8 rounded-full transition duration-300 link-btn">
              Search Profiles
            </Link>
          </div>
        </div>
      </header>

      {/* Quick Search Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Search</h2>
          
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Looking for</label>
                <select className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500">
                  <option>Bride</option>
                  <option>Groom</option>
                  <option>Divorce Bride</option>
                  <option>Divorce Groom</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Age</label>
                <div className="flex gap-2">
                  <select className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500">
                    {Array.from({ length: 43 }, (_, i) => i + 18).map(age => (
                      <option key={age}>{age}</option>
                    ))}
                  </select>
                  <span className="self-center">to</span>
                  <select className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500">
                    {Array.from({ length: 43 }, (_, i) => i + 18).map(age => (
                      <option key={age}>{age}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Religion</label>
                <select className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500">
                  <option>Any</option>
                  <option>Hindu</option>
                  <option>Muslim</option>
                  <option>Christian</option>
                  <option>Sikh</option>
                  <option>Buddhist</option>
                  <option>Jain</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div className="self-end">
                <button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 flex items-center justify-center">
                  <FaSearch className="mr-2" /> Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-rose-500 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Profiles</h3>
              <p className="text-gray-600">All profiles undergo a verification process to ensure authenticity.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-rose-500 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Perfect Matches</h3>
              <p className="text-gray-600">Our advanced algorithm finds compatible matches based on your preferences.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-rose-500 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Privacy Control</h3>
              <p className="text-gray-600">Manage who sees your profile and control your privacy settings.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSearch className="text-rose-500 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Advanced Search</h3>
              <p className="text-gray-600">Filter profiles based on multiple criteria to find your ideal match.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
               
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((story) => (
        <div key={story.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src={story.image} 
            alt="Happy couple" 
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{story.name}</h3>
            <p className="text-gray-600 mb-4">"{story.message}"</p>
            <p className="text-sm text-gray-500">{story.date}</p>
          </div>
        </div>
      ))}
    </div>
          <div className="text-center mt-10">
            <Link to="/success-stories" className="text-rose-500 hover:text-rose-600 font-medium">
              View more success stories →
            </Link>
          </div>
        </div>
      </section>

      {/* Join Now CTA */}
      <section className="py-16 bg-rose-500 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Match?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of singles who have found their life partner on our platform.
          </p>
          <Link to="/register" className="bg-white text-rose-500 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition duration-300 inline-block link-btn">
            Create Your Profile Now
          </Link>
        </div>
      </section>

      
    </div>
  );
};

export default Home;