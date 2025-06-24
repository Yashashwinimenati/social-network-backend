const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Group = sequelize.define('Group', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  privacy: { type: DataTypes.STRING, defaultValue: 'public' },
  category: { type: DataTypes.STRING },
  coverPhoto: { type: DataTypes.STRING },
}, {
  timestamps: true,
});

module.exports = Group; 