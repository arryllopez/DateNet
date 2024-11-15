// // Connection of the database 
// const mysql = require('mysql')

// const db = mysql.createConnection({
//     host: 'localhost', 
//     user: 'root',      
//     password: '',      
//     database: 'datingapp'
// })

// db.connect((err) => {
//     if(err) throw err;
//     console.log('Connected to the database')
// });

// module.exports = db;
// Views/Js/Config/db.js
const { Sequelize } = require('sequelize');

// Initialize Sequelize with your database credentials
const sequelize = new Sequelize('datingapp', 'root', '', {
    host: 'localhost',
    dialect: 'mysql' // Change this based on the database you are using
});

// Export the initialized sequelize instance
module.exports = sequelize;
