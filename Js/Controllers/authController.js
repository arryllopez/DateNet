//Managing signup , login authentication

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('Js/Models/User.js');

// Signup controller
async function signup(req, res) {
    const { username, password, email, firstName, lastName } = req.body;

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
        res.status(500).json({ message: 'Error registering user', error });
    }
}

// Login function
async function login(req, res) {
    const { username, password } = req.body;

    try {
        // Find user in the database
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
}

module.exports = { signup, login };