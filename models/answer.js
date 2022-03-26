const Sequelize = require('sequelize');
const { sequelize, sequelizeClient } = require('../dbClient');

class Answer extends Sequelize.Model {};

Answer.init({
  description: Sequelize.STRING,
},{
  sequelize,
  tableName: "answer",
  timestamps: false
});

module.exports = Answer;