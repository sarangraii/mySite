import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css";


function Register() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNo: "",
    gender: "",
    dob: "",
    type: "" // Added type field
  });
  // Object to store field-specific errors
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear the specific error when user starts typing in that field
    if (errors[name]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[name];
      setErrors(updatedErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Fullname validation
    if (formData.fullname.trim().length < 3) {
      newErrors.fullname = "Full name must be at least 3 characters";
    } else if (formData.fullname.trim().length > 50) {
      newErrors.fullname = "Full name cannot exceed 50 characters";
    } else if (!/^[a-zA-Z\s.'-]+$/.test(formData.fullname.trim())) {
      newErrors.fullname = "Name contains invalid characters";
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Password validation
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      newErrors.password = "Password must include at least one lowercase letter";
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = "Password must include at least one uppercase letter";
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must include at least one number";
    } else if (!/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(formData.password)) {
      newErrors.password = "Password must include at least one special character";
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    // Phone number validation
    const phoneNoClean = formData.phoneNo.replace(/[^\d]/g, '');
    if (phoneNoClean.length < 10 || phoneNoClean.length > 15) {
      newErrors.phoneNo = "Phone number must be between 10-15 digits";
    }
    
    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }
    
    // Date of birth validation
    if (!formData.dob) {
      newErrors.dob = "Please enter your date of birth";
    } else {
      const today = new Date();
      const birthDate = new Date(formData.dob);
      
      if (birthDate > today) {
        newErrors.dob = "Date of birth cannot be in the future";
      } else {
        // Calculate age
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        
        if (age < 18) {
          newErrors.dob = "You must be at least 18 years old to register";
        } else if (age > 100) {
          newErrors.dob = "Please enter a valid date of birth";
        }
      }
     }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all form fields
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }
    
    setLoading(true);
    
    try {
      // Sanitize and prepare data for submission
      const sanitizedData = {
        fullname: formData.fullname.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        phone_no: formData.phoneNo.replace(/[^\d]/g, ''), // Remove non-numeric characters
        gender: formData.gender,
        dob: formData.dob,
        type:formData.type
      };
      
      const response = await axios.post("http://localhost:5000/api/auth/register", sanitizedData);
      
      // Automatically log the user in
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
  
      navigate("/login"); // Redirect to user login


    } catch (err) {
      // Handle specific API error responses
      if (err.response?.status === 409) {
        setErrors({ ...errors, email: "This email is already registered" });
      } else if (err.response?.status === 400 && err.response?.data?.field) {
        // Handle field-specific errors from the server
        setErrors({ ...errors, [err.response.data.field]: err.response.data.message });
      } else {
        // General error
        setErrors({ 
          ...errors, 
          general: err.response?.data?.message || "Registration failed. Please try again." 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
    
      <div className="auth-card register-card">
        <div className="auth-header">
          <h2>Create Your Account</h2>
          <p>Join our matrimonial community today!</p>
        </div>
        
        <form onSubmit={handleSubmit} noValidate>
          {errors.general && <div className="error-message">{errors.general}</div>}
          
          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Enter your full name"
              value={formData.fullname}
              onChange={handleChange}
              className={errors.fullname ? "error-input" : ""}
              required
            />
            {errors.fullname && <div className="field-error">{errors.fullname}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error-input" : ""}
              required
            />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error-input" : ""}
                required
              />
              {errors.password && <div className="field-error">{errors.password}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "error-input" : ""}
                required
              />
              {errors.confirmPassword && <div className="field-error">{errors.confirmPassword}</div>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="phoneNo">Phone Number</label>
            <input
              type="tel"
              id="phoneNo"
              name="phoneNo"
              placeholder="Enter your phone number"
              value={formData.phoneNo}
              onChange={handleChange}
              className={errors.phoneNo ? "error-input" : ""}
              required
            />
            {errors.phoneNo && <div className="field-error">{errors.phoneNo}</div>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={errors.gender ? "error-input" : ""}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <div className="field-error">{errors.gender}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={errors.dob ? "error-input" : ""}
                required
              />
              {errors.dob && <div className="field-error">{errors.dob}</div>}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="type">Account Type</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={errors.type ? "error-input" : ""}
              required
            >
              <option value="">Select Type</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {errors.type && <div className="field-error">{errors.type}</div>}
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;