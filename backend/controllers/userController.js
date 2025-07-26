// controllers/userController.js
const Users = require('../models/AddUser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(__dirname, '../uploads/profile-photos');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename: timestamp-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, 'profile-' + uniqueSuffix + extension);
  }
});

// File filter to check file types
const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Set up the multer middleware
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
  fileFilter: fileFilter
});

// Export the upload middleware for use in routes
exports.uploadProfilePhoto = upload.single('profilePhoto');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = ['looking', 'fullname', 'email', 'phone_no', 'gender', 'dob', 'religion', 'education'];
    const missingFields = [];
    
    for (const field of requiredFields) {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    }
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }
    
    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }
    
    // Validate phone number (10 digits)
    if (!/^\d{10}$/.test(req.body.phone_no)) {
      return res.status(400).json({
        success: false,
        message: 'Phone number must be 10 digits'
      });
    }
    
    // Check if user with same email already exists
    const existingUser = await Users.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email already exists' 
      });
    }

    // Process the user data
    const userData = {...req.body};
    
    // Add profile photo path if a file was uploaded
    if (req.file) {
      // Store the photo path in the user data
      userData.profilePhoto = `/uploads/profile-photos/${req.file.filename}`;
    }
    
    // Convert numeric fields
    if (userData.brothers) userData.brothers = Number(userData.brothers);
    if (userData.sisters) userData.sisters = Number(userData.sisters);
    if (userData.age) userData.age = Number(userData.age);
    
    // Create new user with the data including photo path
    const newUser = new Users(userData);
    await newUser.save();
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ 
        success: false, 
        message: messages.join(', ')
      });
    }
    
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.find().select('-__v');
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id).select('-__v');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
};

// Update user by ID
exports.updateUser = async (req, res) => {
  try {
    // Process the user data from request
    const userData = {...req.body};
    
    // Add profile photo path if a file was uploaded
    if (req.file) {
      userData.profilePhoto = `/uploads/profile-photos/${req.file.filename}`;
      
      // Delete old photo if exists
      const oldUser = await Users.findById(req.params.id);
      if (oldUser && oldUser.profilePhoto) {
        const oldPhotoPath = path.join(__dirname, '..', oldUser.profilePhoto);
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      }
    }
    
    // Convert numeric fields
    if (userData.brothers) userData.brothers = Number(userData.brothers);
    if (userData.sisters) userData.sisters = Number(userData.sisters);
    if (userData.age) userData.age = Number(userData.age);
    
    // Update timestamp
    userData.updatedAt = new Date();
    
    const user = await Users.findByIdAndUpdate(
      req.params.id,
      userData,
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Delete profile photo if exists
    if (user.profilePhoto) {
      const photoPath = path.join(__dirname, '..', user.profilePhoto);
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    }
    
    await Users.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
};

// Filter users based on criteria
exports.filterUsers = async (req, res) => {
  try {
    const query = {};
    
    // Apply filters if provided
    if (req.query.gender) query.gender = req.query.gender;
    if (req.query.religion) query.religion = req.query.religion;
    if (req.query.looking) query.looking = req.query.looking;
    if (req.query.location) query.location = { $regex: req.query.location, $options: 'i' };
    
    // Age range filter
    if (req.query.minAge || req.query.maxAge) {
      query.age = {};
      if (req.query.minAge) query.age.$gte = Number(req.query.minAge);
      if (req.query.maxAge) query.age.$lte = Number(req.query.maxAge);
    }
    
    const users = await Users.find(query)
      .select('fullname age gender religion looking profilePhoto location education')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Error filtering users:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
};