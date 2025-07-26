// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user with file upload
router.post('/create', userController.uploadProfilePhoto, userController.createUser);

// Get all users
router.get('/', userController.getAllUsers);

// Get filtered users
router.get('/filter', userController.filterUsers);

// Get user by ID
router.get('/:id', userController.getUserById);

// Update user by ID with file upload
router.put('/:id', userController.uploadProfilePhoto, userController.updateUser);

// Delete user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;