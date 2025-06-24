const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Friendship = sequelize.define('Friendship', {
  status: { type: DataTypes.STRING, allowNull: false }, // requested, accepted, rejected
  friendList: { type: DataTypes.STRING }, // close friends, acquaintances, etc.
  message: { type: DataTypes.STRING },
}, {
  timestamps: true,
});

module.exports = Friendship; 