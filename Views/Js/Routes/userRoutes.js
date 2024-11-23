//User related routes , profile updates 

const express = require('express');
const { signup, login, getUserProfile, updateUserProfile, updateUserPreference } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware'); // Import the middleware

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
// router.put('/preference', authenticateToken, updateUserPreference);
router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, updateUserProfile);


module.exports = router;
