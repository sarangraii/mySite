const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin=require('../models/Admin');
const Contact = require('../models/Contact');
const router = express.Router();



// Register new user or admin
router.post("/register", async (req, res) => {
  try {
    const { fullname, email, password, phone_no, gender, dob, type } = req.body;

    // Check if email already exists in either schema
    const existingUser = await User.findOne({ email });
    const existingAdmin = await Admin.findOne({ email });

    if (existingUser || existingAdmin) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    let user;
    if (type === "user") {
      user = new User({ fullname, email, password, phone_no, gender, dob, type });
    } else if (type === "admin") {
      user = new Admin({ fullname, email, password, phone_no, gender, dob, type });
    } else {
      return res.status(400).json({ message: "Invalid account type" });
    }

    await user.save();

    // Create JWT token
    const token = jwt.sign({ userId: user._id, type: user.type }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Return user info (without password) and token
    const userResponse = { ...user._doc };
    delete userResponse.password;

    res.status(201).json({
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} registered successfully`,
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});


// Login user router
router.post('/login', async (req, res) => {
  try {
    const { email, password, type } = req.body;
    
    // Determine which collection to query based on type
    let user;
    if (type === 'admin') {
      // Find admin by email
      user = await Admin.findOne({ email });
    } else {
      // Default to regular user
      user = await User.findOne({ email });
    }
    
    // Check if user/admin exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Create JWT token with user type included
    const token = jwt.sign(
      { 
        userId: user._id,
        userType: type === 'admin' ? 'admin' : 'user'
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );
    
    // Return user info (without password) and token
    const userResponse = { ...user._doc };
    delete userResponse.password;
    
    res.json({ 
      message: `${type === 'admin' ? 'Admin' : 'User'} login successful`, 
      token, 
      user: userResponse 
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});
// Route to handle contact form submission
router.post('/contact', async (req, res) => {
  try {
    const { name, email,mobile, subject, message } = req.body;
    const newMessage = new Contact({ name, email,mobile, subject, message });

    await newMessage.save();
    res.status(201).json({ message: 'Your message has been sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;