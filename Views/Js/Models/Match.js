// Match.js
const { DataTypes} = require('sequelize');
const sequelize = require('../Config/db');
const User = require('./User');

const Match = sequelize.define('matches', {
    MatchId: { type: DataTypes.INTEGER,
         primaryKey: true,
          autoIncrement: true },
    UserId1: { 
        type: DataTypes.INTEGER 
    },
    UserId2: { type: DataTypes.INTEGER },
    MatchTime: { type: DataTypes.DATE },
    Status: { type: DataTypes.STRING },
});

Match.belongsTo(User, { foreignKey: 'UserId2', as: 'MatchedUser' });

module.exports = Match;
