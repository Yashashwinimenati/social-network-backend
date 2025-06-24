const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Media = sequelize.define('Media', {
  type: { type: DataTypes.STRING, allowNull: false }, // photo, video
  url: { type: DataTypes.STRING, allowNull: false },
  album: { type: DataTypes.STRING },
  tags: { type: DataTypes.JSON },
}, {
  timestamps: true,
});

module.exports = Media; 