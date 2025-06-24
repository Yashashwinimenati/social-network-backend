const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reaction = sequelize.define('Reaction', {
  type: { type: DataTypes.STRING, allowNull: false }, // like, love, haha, wow, sad, angry
}, {
  timestamps: true,
});

Reaction.associate = (models) => {
  Reaction.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  Reaction.belongsTo(models.Post, { foreignKey: 'postId' });
  Reaction.belongsTo(models.Comment, { foreignKey: 'commentId' });
};

module.exports = Reaction; 