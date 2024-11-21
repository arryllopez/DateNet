const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const UserPreferences = sequelize.define('userpreferences', {
    PreferenceId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    UserId: { 
        type: DataTypes.INTEGER,
        unique: true, 
        references: {
            model: 'users', // Assumes a `users` table exists
            key: 'UserId',      // Foreign key references the `id` column in the `users` table
        },
    },
    preferredAge: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'PreferredAgeRange',
    },
    preferredgender: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'PreferredGender',
    },
    PreferredInterests: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
        field: 'PreferredInterests',
    },
    lookingFor: {
        type: DataTypes.STRING,
        allowNull: false,
        field:'LookingFor'
    },
}, {
    tableName: 'userpreferences', // Explicitly define the table name
    timestamps: false,  // Disable Sequelize's default timestamps (createdAt, updatedAt)
});

module.exports = UserPreferences;
