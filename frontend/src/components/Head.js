import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaHeart, FaUsers, FaShieldAlt, FaHome, FaImages, FaPhone, FaSignInAlt, FaUserShield } from 'react-icons/fa';
import '../styles/Header.css'

const Head=()=>{
    return (
        <>
        
        <nav className="navbar">
            <div className="container1">
                <Link to="/" className="logo">ShubhMilan</Link>
                <ul className="nav-links">
                <li><Link to="/" className="nav-item"><FaHome /> Home</Link></li>
                <li><Link to="/gallery" className="nav-item"><FaImages /> Gallery</Link></li>
                <li><Link to="/contact" className="nav-item"><FaPhone /> Contact Us</Link></li>
                <li><Link to="/login" className="nav-item"><FaSignInAlt /> Login</Link></li>
                </ul>
            </div>
        </nav>
        
        </>
    );

};

export default Head;