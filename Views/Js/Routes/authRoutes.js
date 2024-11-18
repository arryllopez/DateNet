//user authenticationconst express = require('express');
const express = require('express');
const { signup, login, getUserProfile, updateUserProfile} = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware'); // Import the middleware

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, updateUserProfile);


module.exports = router;
