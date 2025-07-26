const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AddUser=require('../models/AddUser');

const router = express.Router();


// Middleware to authenticate JWT token
const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token required' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user by id
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Invalid authentication token' });
  }
};

// Get current user profile
router.get('/profile', authenticate, async (req, res) => {
  res.json(req.user);
});


// Update user profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const { fullname,email, phone_no, dob,gender } = req.body;
    const userId = req.user._id;
    
    // Fields to update
    const updates = {};
    if (fullname) updates.fullname = fullname;
    if (email) updates.email = email;
    if (phone_no) updates.phone_no = phone_no;
    if (dob) updates.dob = dob;
    if (gender) updates.gender= gender;
    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');
    
    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Profile update failed' });
  }
});
router.get('/all', authenticate, async (req, res) => {
  try {
    // Fetch all users from the database
    // Exclude sensitive information like passwords
    const adduser = await AddUser.find().select('-password -__v');
    
    res.json(adduser);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});
router.post('/filter', authenticate, async (req, res) => {
  try {
    const {
      type,        // 'bride', 'groom', 'divorceBride', 'divorceGroom'
      ageFrom,     // minimum age
      ageTo,       // maximum age
      heightFrom,  // minimum height (in cm)
      heightTo,    // maximum height (in cm)
      education,   // education level(s) - can be array
      caste,       // caste(s) - can be array
      religion,    // religion(s) - can be array
      location     // location(s) - can be array or string
    } = req.body;

    // Build the filter query
    const query = {};

    // Filter by gender/type
    if (type) {
      if (type === 'bride') {
        query.gender = 'female';
        query.maritalStatus = { $nin: ['divorced', 'widowed'] };
      } else if (type === 'groom') {
        query.gender = 'male';
        query.maritalStatus = { $nin: ['divorced', 'widowed'] };
      } else if (type === 'divorceBride') {
        query.gender = 'female';
        query.maritalStatus = 'divorced';
      } else if (type === 'divorceGroom') {
        query.gender = 'male';
        query.maritalStatus = 'divorced';
      }
    }

    // Filter by age range
    if (ageFrom || ageTo) {
      query.age = {};
      
      if (ageFrom) {
        query.age.$gte = parseInt(ageFrom);
      }
      
      if (ageTo) {
        query.age.$lte = parseInt(ageTo);
      }
    }

    // Filter by height range (assuming height stored in cm)
    if (heightFrom || heightTo) {
      query.height = {};
      
      if (heightFrom) {
        query.height.$gte = parseInt(heightFrom);
      }
      
      if (heightTo) {
        query.height.$lte = parseInt(heightTo);
      }
    }

    // Filter by education
    if (education) {
      if (Array.isArray(education)) {
        query.education = { $in: education };
      } else {
        query.education = education;
      }
    }

    // Filter by caste
    if (caste) {
      if (Array.isArray(caste)) {
        query.caste = { $in: caste };
      } else {
        query.caste = caste;
      }
    }

    // Filter by religion
    if (religion && religion !== 'Any') {
      if (Array.isArray(religion)) {
        query.religion = { $in: religion };
      } else {
        query.religion = religion;
      }
    }

    // Filter by location
    if (location) {
      // You can implement this in different ways depending on how location is stored
      // Option 1: If stored as a single field
      if (Array.isArray(location)) {
        query.location = { $in: location };
      } else {
        query.location = location;
      }
      
      // Option 2: If stored as city and state
      // query.$or = [
      //   { city: location },
      //   { state: location },
      //   { country: location }
      // ];
    }

    // Execute the query with pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const profiles = await AddUser.find(query)
      .select('-password -__v') // Exclude sensitive fields
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Sort by newest first

    // Get total count for pagination
    const total = await AddUser.countDocuments(query);

    // Return the paginated results
    res.json({
      profiles,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;