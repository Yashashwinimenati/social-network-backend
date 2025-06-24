const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('Comment', {
  content: { type: DataTypes.TEXT, allowNull: false },
  parentCommentId: { type: DataTypes.INTEGER, allowNull: true },
  mentions: { type: DataTypes.JSON },
}, {
  timestamps: true,
});

Comment.associate = (models) => {
  Comment.belongsTo(models.User, { foreignKey: 'userId', as: 'author' });
  Comment.belongsTo(models.Post, { foreignKey: 'postId' });
  Comment.hasMany(models.Comment, { foreignKey: 'parentCommentId', as: 'replies' });
  Comment.hasMany(models.Reaction, { foreignKey: 'commentId', as: 'reactions' });
};

module.exports = Comment; 