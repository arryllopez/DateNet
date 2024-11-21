const { Sequelize } = require('sequelize');

// Initialize Sequelize with your database credentials
const sequelize = new Sequelize('datingappdb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql' // Change this based on the database you are using
});

// Export the initialized sequelize instance
module.exports = sequelize;
