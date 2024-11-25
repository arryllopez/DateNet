//User related routes , profile updates 

const express = require('express');
const { signup, login, getUserProfile, updateUserProfile, getUsers, createUser, updateUser, deleteUser } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware'); 

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
// router.put('/preference', authenticateToken, updateUserPreference);
router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, updateUserProfile);

// User CRUD operations
router.get('/users', authenticateToken, getUsers); 
router.post('/users', authenticateToken, createUser); 
router.put('/users/:id', authenticateToken, updateUser); // Future Enhancemennt 
router.delete('/users/:id', authenticateToken, deleteUser); // Deleting the User



module.exports = router;
