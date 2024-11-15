const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const User = sequelize.define('users', {
    username: { type: DataTypes.STRING, unique: true },
    passwordHash: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    // ... other fields based on your table schema
});

module.exports = User;
