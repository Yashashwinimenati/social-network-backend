const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  dateOfBirth: { type: DataTypes.DATEONLY, allowNull: false },
  gender: { type: DataTypes.STRING },
  profilePicture: { type: DataTypes.STRING },
  coverPhoto: { type: DataTypes.STRING },
  bio: { type: DataTypes.STRING },
  location: { type: DataTypes.STRING },
  work: { type: DataTypes.JSON },
  education: { type: DataTypes.STRING },
  relationshipStatus: { type: DataTypes.STRING },
  privacy: { type: DataTypes.JSON },
  accountStatus: { type: DataTypes.STRING, defaultValue: 'active' },
}, {
  timestamps: true,
});

User.associate = (models) => {
  User.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' });
  User.hasMany(models.Comment, { foreignKey: 'userId', as: 'comments' });
  User.hasMany(models.Reaction, { foreignKey: 'userId', as: 'reactions' });
};

module.exports = User; 