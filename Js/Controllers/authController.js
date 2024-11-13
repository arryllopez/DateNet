const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('Js/Models/User.js');

// Signup controller
async function signup(req, res) {
    const { username, password, email } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, passwordHash: hashedPassword, email });
    res.status(201).send('User registered successfully');
}

// Login controller
async function login(req, res) {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).send('User not found');

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).send('Invalid password');

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
}

module.exports = { signup, login };
