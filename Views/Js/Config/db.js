const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('datingappdb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql' 
});

// Exporting the initialized sequelize instance
module.exports = sequelize;
