const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Story = sequelize.define('Story', {
  type: { type: DataTypes.STRING, allowNull: false }, // photo, video, text
  content: { type: DataTypes.STRING },
  text: { type: DataTypes.STRING },
  duration: { type: DataTypes.INTEGER },
}, {
  timestamps: true,
});

module.exports = Story; 