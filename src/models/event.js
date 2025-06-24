const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Event = sequelize.define('Event', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  startDate: { type: DataTypes.DATE },
  endDate: { type: DataTypes.DATE },
  location: { type: DataTypes.STRING },
  privacy: { type: DataTypes.STRING, defaultValue: 'public' },
}, {
  timestamps: true,
});

module.exports = Event; 