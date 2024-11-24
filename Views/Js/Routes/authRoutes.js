//user authenticationconst express = require('express');
const express = require('express');
const { signup, login, getUserProfile, updateUserProfile, getUsers, createUser, updateUser, deleteUser} = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware'); // Import the middleware

const router = express.Router();

router.get('/users', authenticateToken, getUsers);
router.post('/users', authenticateToken, createUser);
router.put('/users/:id', authenticateToken, updateUser);
router.delete('/users/:id', authenticateToken, deleteUser);

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, updateUserProfile);
// router.put('/preference', authenticateToken, updateUserPreference);


module.exports = router;