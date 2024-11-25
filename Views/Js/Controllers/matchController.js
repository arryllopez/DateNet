// Handle Matching logic 
const User = require('../Models/User');
const Match = require('../Models/Match');  
const UserPreferences = require('../Models/UserPreferences');
const { Op, Sequelize } = require('sequelize');

const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const diff = Date.now() - birthDate.getTime();
    return new Date(diff).getUTCFullYear() - 1970;
};

// Matching logic
const findMatches = async (req, res) => {
    try {
        // Fetching random users from the User table
        const users = await User.findAll({
            attributes: ['UserId', 'firstName', 'profilePhoto', 'bio', 'dateOfBirth', 'lookingFor', 'faculty','year'],
            order: Sequelize.literal('RAND()'), 
            limit: 10, // 10 random users
        });

          const usersWithAge = users.map((user) => {
            const userData = user.toJSON();
            userData.age = calculateAge(userData.dateOfBirth);
            return userData;
        });

        res.status(200).json(usersWithAge);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ message: 'An error occurred while fetching users.' });
    }
};

module.exports = { findMatches };
