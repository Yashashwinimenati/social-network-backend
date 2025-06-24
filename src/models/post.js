const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Post = sequelize.define('Post', {
  content: { type: DataTypes.TEXT },
  media: { type: DataTypes.JSON },
  privacy: { type: DataTypes.STRING, defaultValue: 'public' },
  location: { type: DataTypes.STRING },
  feeling: { type: DataTypes.STRING },
  type: { type: DataTypes.STRING, defaultValue: 'status' },
}, {
  timestamps: true,
});

Post.associate = (models) => {
  Post.hasMany(models.Comment, { foreignKey: 'postId', as: 'comments' });
  Post.hasMany(models.Reaction, { foreignKey: 'postId', as: 'reactions' });
};

module.exports = Post; 