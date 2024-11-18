const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const User = sequelize.define('users', {
    UserId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
        },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
        },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
        },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
        },
        dateOfBirth: {
            type: DataTypes.DATE,
            allowNull: false, // Or false if mandatory
            field: 'DateOfBirth', // Match the exact database column name
        },
    // ... other fields based on your table schema
}, {
    tableName: 'users', // Explicitly define the table name
    timestamps: false,   // Use createdAt and updatedAt columns
});
module.exports = User;