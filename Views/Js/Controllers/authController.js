//Managing signup , login authentication

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

// Signup controller
async function signup(req, res) {
    console.log("Request body:", req.body); // Debugging log
    const { username, password, email, firstName, lastName } = req.body;

    // if (!password) {
    //     return res.status(400).json({ message: "Password is required" });
    // }
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        const newUser = await User.create({
            username,
            passwordHash: hashedPassword,
            email,
            firstName,
            lastName,
            // Additional fields can be added here
        });

        res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
    } catch (error) {
        console.error('Error during signup:', error); // Log the error
        res.status(500).json({ message: 'Internal server error'});
    }
}

// Login function
async function login(req, res) {
    console.log('Login request body:', req.body); // Debugging log
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    
    try {
        // Find user in the database
        const user = await User.findOne({ where: { username } });
        if (!user) {
            console.log('User not found for username:', username);
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            console.log('Invalid password for username:', username);
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error logging in', error });
    }
}

module.exports = { signup, login };