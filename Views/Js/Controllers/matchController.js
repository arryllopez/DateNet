// Handle Matching logic 
const User = require('Js/models/User');
const UserPreferences = require('Js/models/UserPreferences');

// Matching logic
async function findMatches(req, res) {
    const userId = req.user.userId; // Assuming authenticated user ID is stored in req.user
    try {
        // Fetch user preferences
        const userPreferences = await UserPreferences.findOne({ where: { userId } });

        // Find potential matches based on preferences
        const matches = await User.findAll({
            where: {
                gender: userPreferences.genderPreference,
                age: { 
                    // Assuming 'age' is calculated; add your logic here
                },
                // Add additional conditions as per matching criteria
            },
            include: [{ model: UserPreferences }]
        });

        res.json({ matches });
    } catch (error) {
        res.status(500).json({ message: 'Error finding matches', error });
    }
}

module.exports = { findMatches };
