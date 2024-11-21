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
        allowNull: false,
    },
    email: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'DateOfBirth', // Match the exact column name
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Gender',
    },
    profilePhoto: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    displayPic1: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    displayPic2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'Biography', // Match the exact column name
    },
    interests: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    hobbies: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    program: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    faculty: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    futureGoals: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    businessToStart: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'BusinessToStart', // Match the exact column name
    },
    mostImportantThing: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'MostImportantThing', // Match the exact column name
    },
    lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'LastLogin', // Match the exact column name
    },
    profileStatus: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'ProfileStatus', // Match the exact column name
    },
    achievements: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'users', // Explicitly define the table name
    timestamps: false,  // Disable Sequelize's default timestamps (createdAt, updatedAt)
});

module.exports = User;
