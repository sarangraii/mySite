import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/OurStory.css';
import Founder from '../Images/sarang.jpg'
import Office from '../Images/office.webp'
import Wedding from '../Images/wedding.jpg'
import Celebration from '../Images/celebration.jpeg'

// Import your actual images when available
// For now using placeholder references
const images = {
  headerBg: "/api/placeholder/1200/300",
  founders: "/api/placeholder/600/400",
  firstOffice: "/api/placeholder/600/400",
  teamCelebration: "/api/placeholder/600/400",
  weddingCelebration: "/api/placeholder/600/400",
};

const OurStory = () => {
  return (
    <div className="bg-rose-50">
      {/* Header Section */}
      <header 
        className="relative py-20 bg-center bg-cover text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${images.headerBg})`
        }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-playfair font-bold text-rose-700 mb-4">Our Story</h1>
          <p className="text-xl text-gray-600 italic">Bringing hearts together since 2024</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Story Timeline Section */}
        <section className="space-y-16">
          {/* Beginning */}
          <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-lg shadow-md p-8">
            <div className="md:w-2/5">
              <img 
                src={Founder} 
                alt="Founders wedding picture" 
                className="w-full h-auto rounded-lg shadow"
              />
            </div>
            <div className="md:w-3/5">
              <span className="inline-block bg-rose-600 text-white px-4 py-1 rounded-full text-sm mb-4">2010</span>
              <h2 className="text-3xl font-bold mb-4">How it all began</h2>
              <p className="text-gray-700 mb-4">
                It all started with our founder,Sarang Rai, who met through a traditional matchmaking process. 
                After experiencing firsthand the challenges of finding a life partner through conventional means, 
                they envisioned a platform that would blend time-honored traditions with modern technology.
              </p>
              <p className="text-gray-700">
                Their own journey to find each other took nearly two years, filled with countless meetings arranged 
                by family members and professional matchmakers. They believed there had to be a better way - one that 
                respected cultural values while embracing the efficiency of digital solutions.
              </p>
            </div>
          </div>

          {/* Early Days */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 bg-white rounded-lg shadow-md p-8">
            <div className="md:w-2/5">
              <img 
                src={Office} 
                alt="First office" 
                className="w-full h-auto rounded-lg shadow"
              />
            </div>
            <div className="md:w-3/5">
              <span className="inline-block bg-rose-600 text-white px-4 py-1 rounded-full text-sm mb-4">2024</span>
              <h2 className="text-3xl font-bold mb-4">From idea to reality</h2>
              <p className="text-gray-700 mb-4">
                With just a small team of five passionate individuals working from a tiny apartment in Mumbai, 
                we launched our first version of the platform. Our initial goal was modest - to serve communities 
                in major metropolitan areas of India.
              </p>
              <p className="text-gray-700">
                The response was overwhelming. Within six months, we had facilitated over 15 successful matches, 
                and heartwarming success stories began pouring in. This early validation fueled our commitment to 
                expand and refine our services.
              </p>
            </div>
          </div>

          {/* Quote Section */}
          <div className="bg-rose-100 rounded-lg p-10 text-center max-w-3xl mx-auto">
            <p className="text-2xl text-rose-700 italic mb-4 relative">
              "We don't just create matches; we help write beautiful love stories that last a lifetime."
            </p>
            <p className="font-semibold">— Tiya Sharma, Co-founder</p>
          </div>

          {/* Growth */}
          <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-lg shadow-md p-8">
            <div className="md:w-2/5">
              <img 
                src={Celebration} 
                alt="Team celebration" 
                className="w-full h-auto rounded-lg shadow"
              />
            </div>
            <div className="md:w-3/5">
              <span className="inline-block bg-rose-600 text-white px-4 py-1 rounded-full text-sm mb-4">2024</span>
              <h2 className="text-3xl font-bold mb-4">Growing beyond borders</h2>
              <p className="text-gray-700 mb-4">
                As our community grew, so did our vision. We expanded our services to cater to the Indian diaspora 
                across the globe. We understood the unique challenges faced by those seeking partners with similar 
                cultural backgrounds while living abroad.
              </p>
              <p className="text-gray-700">
                This period marked significant technological advancements for our platform. We introduced compatibility 
                algorithms that considered not just preferences and backgrounds, but values and life goals - the true 
                foundation of lasting relationships.
              </p>
            </div>
          </div>

          {/* Present Day */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 bg-white rounded-lg shadow-md p-8">
            <div className="md:w-2/5">
              <img 
                src={Wedding} 
                alt="Wedding celebration" 
                className="w-full h-auto rounded-lg shadow"
              />
            </div>
            <div className="md:w-3/5">
              <span className="inline-block bg-rose-600 text-white px-4 py-1 rounded-full text-sm mb-4">2025</span>
              <h2 className="text-3xl font-bold mb-4">A global family</h2>
              <p className="text-gray-700 mb-4">
                2025, we stand proud as a leading matrimonial platform with a presence in over India, 
                helping millions find their perfect match. What sets us apart is our unwavering commitment to our 
                core values: authenticity, respect for tradition, and embracing innovation.
              </p>
              <p className="text-gray-700">
                Every successful match reinforces our mission and reminds us why we do what we do. Behind every 
                statistic is a real couple beginning their journey together - and that will always be our greatest achievement.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 py-16">
          <div className="text-center p-6">
            <p className="text-5xl font-bold text-rose-600 mb-2">1M+</p>
            <p className="text-gray-600">Happy Couples</p>
          </div>
          <div className="text-center p-6">
            <p className="text-5xl font-bold text-rose-600 mb-2">20+</p>
            <p className="text-gray-600">Countries</p>
          </div>
          <div className="text-center p-6">
            <p className="text-5xl font-bold text-rose-600 mb-2">13</p>
            <p className="text-gray-600">Years of Love</p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-rose-600 text-white text-center py-16 px-6 rounded-lg mb-16">
          <h2 className="text-4xl font-bold mb-4">Ready to Write Your Own Love Story?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join our community today and take the first step towards finding your perfect match. 
            Thousands of compatible partners are waiting to meet someone just like you.
          </p>
          <Link 
            to="/register" 
            className="inline-block bg-white text-rose-600 font-bold py-3 px-8 rounded-full hover:bg-rose-50 transition duration-300"
          >
            Create Your Profile
          </Link>
        </section>
      </main>
    </div>
  );
};

export default OurStory;