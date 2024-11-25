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
        field: 'DateOfBirth', 
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Gender',
    },
    profilePhoto: {
        type: DataTypes.STRING,
        allowNull: true,
        field:'ProfilePhoto',
    },
    displayPic1: {
        type: DataTypes.STRING,
        allowNull: true,
        field:'DisplayPic1',
    },
    displayPic2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'Biography', 
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
        field:'Faculty',
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
        field: 'BusinessToStart', 
    },
    mostImportantThing: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'MostImportantThing', 
    },
    lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'LastLogin', 
    },
    profileStatus: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'ProfileStatus', 
    },
    achievements: {
        type: DataTypes.TEXT,
        allowNull: true,
        field:'Achievements',
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true,
        field:'Role',
    },
    preferredAge: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'PreferredAgeRange',
    },
    preferredgender: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'PreferredGender',
    },
    PreferredInterests: { 
        type: DataTypes.STRING,
        allowNull: true,
        unique: true, 
        field: 'PreferredInterests',
    },
    lookingFor: {
        type: DataTypes.STRING,
        allowNull: true,
        field:'TypeOfRelation'
    },
}, {
    tableName: 'users', 
    timestamps: false,  // Disabling Sequelize's default timestamps (createdAt, updatedAt)
});

module.exports = User;
