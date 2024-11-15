const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const User = sequelize.define('users', {

    username: { 
        type: DataTypes.STRING,
         unique: true 
        },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: { 
        type: DataTypes.STRING,
         unique: true 
        },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
        },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
        }
    // ... other fields based on your table schema
});

module.exports = User;
