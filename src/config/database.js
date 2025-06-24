const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_PATH || 'database/social_network.sqlite',
  logging: false,
});

module.exports = sequelize; 