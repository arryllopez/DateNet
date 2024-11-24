//User related routes , profile updates 

const express = require('express');
// const { signup, login, getUserProfile, updateUserProfile, updateUserPreference } = require('../controllers/authController');
const { signup, login, getUserProfile, updateUserProfile, getUsers, createUser, updateUser, deleteUser } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware'); // Import the middleware

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
// router.put('/preference', authenticateToken, updateUserPreference);
router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, updateUserProfile);

// User CRUD operations
router.get('/users', authenticateToken, getUsers); // Get all users
router.post('/users', authenticateToken, createUser); // Create a new user (optional)
router.put('/users/:id', authenticateToken, updateUser); // Update an existing user by ID
router.delete('/users/:id', authenticateToken, deleteUser); // Delete a user by ID



module.exports = router;
