import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaHeart, FaUsers, FaShieldAlt, FaHome, FaImages, FaPhone, FaSignInAlt } from 'react-icons/fa';
import '../styles/Footer.css';
const Footer=()=>{
    return (
        <>
            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                    <h3 className="text-xl font-bold mb-4">About Us</h3>
                    <ul className="space-y-2">
                        <li><Link to="/about" className="hover:text-rose-300">Our Story</Link></li>
                        <li><Link to="/team" className="hover:text-rose-300">Team</Link></li>
                        <li><Link to="/careers" className="hover:text-rose-300">Careers</Link></li>
                    </ul>
                    </div>
                    
                    <div>
                    <h3 className="text-xl font-bold mb-4">Membership</h3>
                    <ul className="space-y-2">
                    <li><Link to="/contact" className="hover:text-rose-300">Contact Us</Link></li>
                        <li><Link to="/success-stories" className="hover:text-rose-300">Success Stories</Link></li>
                    </ul>
                    </div>
                    
                    <div>
                    <h3 className="text-xl font-bold mb-4">Support</h3>
                    <ul className="space-y-2">
                        <li><Link to="/help" className="hover:text-rose-300">Help Center</Link></li>
                        <li><Link to="/safety" className="hover:text-rose-300">Safety Tips</Link></li>
                        <li><Link to="/faq" className="hover:text-rose-300">FAQs</Link></li>
                    </ul>
                    </div>
                    
                    <div>
                    <h3 className="text-xl font-bold mb-4">Legal</h3>
                    <ul className="space-y-2">
                        <li><Link to="/privacy" className="hover:text-rose-300">Privacy Policy</Link></li>
                        <li><Link to="/terms" className="hover:text-rose-300">Terms of Service</Link></li>
                        <li><Link to="/cookie-policy" className="hover:text-rose-300">Cookie Policy</Link></li>
                    </ul>
                    </div>
                </div>
                
                <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                    <p>&copy; {new Date().getFullYear()} Matrimony Connect. All rights reserved.</p>
                </div>
                </div>
            </footer>      
        
        </>
    );

};

export default Footer;