import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Home from './components/Home';
import './App.css';
import AddUser from './components/AddUser';
import OurStory from './components/OurStory';
import Contact from './components/Contact';
import GalleryPage from './components/GalleryPage';
import CookiePolicy from './components/CookiePolicy';
import CookieBanner from './components/CookieBanner';
import { loadStripe } from "@stripe/stripe-js";
import PrivacyPolicy from './components/PrivacyPolicy';
import HelpCenter from './components/HelpCenter';
import SafetyTips from './components/SafetyTips';
import { FaQq } from 'react-icons/fa';
import FAQs from './components/FAQs';
import TeamPage from './components/TeamPage';
import TermsServicePage from './components/TermsServicePage';
import SuccessStoriesPage from './components/SuccessStoriesPage';
import CareersPage from './components/CareersPage';
import Head from './components/Head';
import Footer from './components/Footer';
import SearchFilter from './components/SearchFilter';
import Payment from './components/Payment';
import AdminProfile from './components/AdminProfile';


// Stripe setup
const stripePromise = loadStripe("your-stripe-public-key");

// Simple auth check
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;

};

function App() {
  // Move state inside the component
  const [price, setPrice] = useState(20.0);
  const [recipeTitle, setRecipeTitle] = useState("Delicious Recipe");
  const recipeId = "12345"; // Replace with actual recipe ID

  return (
    <>
    <Router>
    <Head/>
      <CookieBanner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/admin/profile' element={<AdminProfile/>} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/addUser' element={<AddUser />} />
        <Route path='/search' className="search-page" element={<SearchFilter />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<OurStory />} />
        <Route path='/gallery' element={<GalleryPage />} />
        <Route path='/cookie-policy' element={<CookiePolicy />} />
        <Route path='/privacy' element={<PrivacyPolicy/>}/>
        <Route path='/help' element={<HelpCenter/>}/>
        <Route path='/safety' element={<SafetyTips/>}/>
        <Route path='/faq' element={<FAQs/>}/>
        <Route path='/team' element={<TeamPage/>}/>
        <Route path='/terms' element={<TermsServicePage/>}/>
        <Route path='/success-stories' element={<SuccessStoriesPage/>}/>
        <Route path='/careers' element={<CareersPage/>}/>
        <Route path='/create-order' element={<Payment/>}>
               
           </Route>
      </Routes>
      <Footer/>
    </Router>

    </>
  );
}

export default App;

