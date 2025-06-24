const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Message = sequelize.define('Message', {
  content: { type: DataTypes.TEXT, allowNull: false },
  attachments: { type: DataTypes.JSON },
  status: { type: DataTypes.STRING, defaultValue: 'sent' }, // sent, delivered, read
}, {
  timestamps: true,
});

module.exports = Message; 