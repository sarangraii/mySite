import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Contact.css'; // Import the CSS file

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/contact', formData);
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      setFormData({ name: '', email: '', mobile: '', subject: '', message: '' });
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again later.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
    
      <div className="contact-container">
        <h2 className="contact-heading">Contact Us</h2>
        <form onSubmit={handleSubmit} className="contact-form-container">
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="form-textarea"
              rows="4"
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
      </div>

      {/* ifream */}
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58896.88480710542!2d75.7878566486328!3d22.6889852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcfaa753f05d%3A0x975c63c15cb23f0b!2sUniversal%20Informatics!5e0!3m2!1sen!2sin!4v1741682271610!5m2!1sen!2sin" width="100%" height="450" Style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
     
    </div>
  );
};

export default Contact;