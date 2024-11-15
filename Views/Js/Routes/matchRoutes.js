// for routes handleing the matching logic
const express = require('express');
const { findMatches } = require('../controllers/matchController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

// Route to find matches (requires authentication)
router.get('/findMatches', authenticateToken, findMatches);

module.exports = router;
