const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Notification = sequelize.define('Notification', {
  type: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.STRING },
  actorId: { type: DataTypes.INTEGER },
  read: { type: DataTypes.BOOLEAN, defaultValue: false },
  actionUrl: { type: DataTypes.STRING },
}, {
  timestamps: true,
});

module.exports = Notification; 