import React, { useState, useRef, useEffect } from 'react';
import '../styles/AddUser.css';
import axios from 'axios';

const AddUser = () => {
  const [formData, setFormData] = useState({
    looking: "",
    fullname: "",
    email: "",
    phone_no: "",
    gender: "",
    dob: "",
    religion: "",
    caste: "",
    age: "",
    education: "",
    height: "",
    horoscope_details: "",
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    brothers: 0,
    sisters: 0,
    familyStatus: "",
    familyType: "",
    familyValues: "",
    location: "",
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Calculate age automatically when date of birth changes
  useEffect(() => {
    if (formData.dob) {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      setFormData(prevState => ({
        ...prevState,
        age: age.toString()
      }));
    }
  }, [formData.dob]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.match('image.*')) {
        setErrors({ ...errors, photo: "Please select an image file" });
        return;
      }

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, photo: "File size should not exceed 5MB" });
        return;
      }

      setProfilePhoto(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Clear any previous errors
      setErrors({ ...errors, photo: undefined });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const removePhoto = () => {
    setProfilePhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.looking) tempErrors.looking = "Please select your type";
    if (!formData.fullname) tempErrors.fullname = "Name is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.phone_no) {
      tempErrors.phone_no = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone_no)) {
      tempErrors.phone_no = "Phone number must be 10 digits";
    }
    if (!formData.education) tempErrors.education = "Education is required";
    if (!formData.gender) tempErrors.gender = "Gender is required";
    if (!formData.dob) tempErrors.dob = "Date of birth is required";
    if (!formData.religion) tempErrors.religion = "Religion is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      looking: "",
      fullname: "",
      email: "",
      phone_no: "",
      gender: "",
      dob: "",
      religion: "",
      caste: "",
      age: "",
      education: "",
      height: "",
      horoscope_details: "",
      fatherName: "",
      fatherOccupation: "",
      motherName: "",
      motherOccupation: "",
      brothers: 0,
      sisters: 0,
      familyStatus: "",
      familyType: "",
      familyValues: "",
      location: "",
    });
    setProfilePhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous success message
    setSuccessMessage("");
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Create FormData object to handle file upload
        const formDataToSend = new FormData();
        
        // Add all form fields to FormData
        Object.keys(formData).forEach(key => {
          formDataToSend.append(key, formData[key]);
        });
        
        // Add profile photo if exists
        if (profilePhoto) {
          formDataToSend.append('profilePhoto', profilePhoto);
        }
        
        const response = await api.post('/api/users/create', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        
        if (response.status === 200 || response.status === 201) {
          setSuccessMessage("Registration successful!");
          // Reset form
          resetForm();
        } else {
          setErrors({ submit: response.data.message || "Registration failed" });
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Server error. Please try again later.";
        setErrors({ submit: errorMessage });
        console.error("Error details:", error.response?.data || error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const religions = ["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Other"];
  const familyStatuses = ["Middle Class", "Upper Middle Class", "Rich", "Affluent"];
  const familyTypes = ["Joint Family", "Nuclear Family"];
  const familyValues = ["Traditional", "Moderate", "Liberal"];
  const educationOptions = ["High School", "Bachelor's", "Master's", "Doctorate", "Other"];

  return (
    <div className="registration-container">
      <h2>Add User</h2>
      
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      
      {errors.submit && (
        <div className="error-message">{errors.submit}</div>
      )}
      
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-section">
          <h3>Personal Details</h3>
          
          {/* Profile Photo Upload Section */}
          <div className="form-group photo-upload-container">
            <label>Profile Photo</label>
            <div className="photo-upload-area">
              {photoPreview ? (
                <div className="photo-preview">
                  <img src={photoPreview} alt="Profile Preview" />
                  <button 
                    type="button" 
                    className="remove-photo-btn" 
                    onClick={removePhoto}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="photo-placeholder" onClick={triggerFileInput}>
                  <span>+</span>
                  <p>Upload Photo</p>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handlePhotoChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>
            {errors.photo && <span className="error">{errors.photo}</span>}
            <p className="photo-help-text">
              Upload a clear photo (max 5MB) - JPG, PNG formats accepted
            </p>
          </div>
          
          <div className="form-group">
            <label htmlFor="looking">Looking for*</label>
            <select 
              id="looking" 
              name="looking" 
              value={formData.looking} 
              onChange={handleChange}
            >
              <option value="">Select option</option>
              <option value="bride">Bride</option>
              <option value="groom">Groom</option>
              <option value="divorce bride">Divorce Bride</option>
              <option value="divorce groom">Divorce Groom</option>
            </select>
            {errors.looking && <span className="error">{errors.looking}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="fullname">Full Name*</label>
            <input 
              type="text" 
              id="fullname" 
              name="fullname" 
              value={formData.fullname} 
              onChange={handleChange} 
            />
            {errors.fullname && <span className="error">{errors.fullname}</span>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address*</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="phone_no">Phone Number*</label>
              <input 
                type="tel" 
                id="phone_no" 
                name="phone_no" 
                value={formData.phone_no} 
                onChange={handleChange} 
                placeholder="10 digit number"
              />
              {errors.phone_no && <span className="error">{errors.phone_no}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="gender">Gender*</label>
              <select 
                id="gender" 
                name="gender" 
                value={formData.gender} 
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <span className="error">{errors.gender}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="dob">Date of Birth*</label>
              <input 
                type="date" 
                id="dob" 
                name="dob" 
                value={formData.dob} 
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]} 
              />
              {errors.dob && <span className="error">{errors.dob}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input 
                type="number" 
                id="age" 
                name="age" 
                value={formData.age} 
                onChange={handleChange}
                readOnly 
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="religion">Religion*</label>
              <select 
                id="religion" 
                name="religion" 
                value={formData.religion} 
                onChange={handleChange}
              >
                <option value="">Select Religion</option>
                {religions.map((religion) => (
                  <option key={religion} value={religion}>{religion}</option>
                ))}
              </select>
              {errors.religion && <span className="error">{errors.religion}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="caste">Caste</label>
              <input 
                type="text" 
                id="caste" 
                name="caste" 
                value={formData.caste} 
                onChange={handleChange} 
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="education">Education*</label>
              <select 
                id="education"
                name="education" 
                value={formData.education} 
                onChange={handleChange}
              >
                <option value="">Select Education</option>
                {educationOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {errors.education && <span className="error">{errors.education}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="height">Height</label>
              <input 
                type="text" 
                id="height" 
                name="height" 
                placeholder="e.g., 5'8''" 
                value={formData.height} 
                onChange={handleChange} 
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="horoscope_details">Horoscope Details</label>
            <textarea 
              id="horoscope_details" 
              name="horoscope_details" 
              value={formData.horoscope_details} 
              onChange={handleChange} 
              rows="3"
            ></textarea>
          </div>
        </div>
        
        <div className="form-section">
          <h3>Family Details</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fatherName">Father's Name</label>
              <input 
                type="text" 
                id="fatherName" 
                name="fatherName" 
                value={formData.fatherName} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="fatherOccupation">Father's Occupation</label>
              <input 
                type="text" 
                id="fatherOccupation" 
                name="fatherOccupation" 
                value={formData.fatherOccupation} 
                onChange={handleChange} 
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="motherName">Mother's Name</label>
              <input 
                type="text" 
                id="motherName" 
                name="motherName" 
                value={formData.motherName} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="motherOccupation">Mother's Occupation</label>
              <input 
                type="text" 
                id="motherOccupation" 
                name="motherOccupation" 
                value={formData.motherOccupation} 
                onChange={handleChange} 
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="brothers">Number of Brothers</label>
              <input 
                type="number" 
                id="brothers" 
                name="brothers" 
                min="0" 
                value={formData.brothers} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="sisters">Number of Sisters</label>
              <input 
                type="number" 
                id="sisters" 
                name="sisters" 
                min="0"
                value={formData.sisters} 
                onChange={handleChange} 
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="familyStatus">Family Status</label>
              <select 
                id="familyStatus" 
                name="familyStatus" 
                value={formData.familyStatus} 
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                {familyStatuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="familyType">Family Type</label>
              <select 
                id="familyType" 
                name="familyType" 
                value={formData.familyType} 
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                {familyTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="familyValues">Family Values</label>
              <select 
                id="familyValues" 
                name="familyValues" 
                value={formData.familyValues} 
                onChange={handleChange}
              >
                <option value="">Select Values</option>
                {familyValues.map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input 
                type="text" 
                id="location" 
                name="location" 
                value={formData.location} 
                onChange={handleChange} 
              />
            </div>
          </div>
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={resetForm} className="reset-button">
            Reset
          </button>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;