const Sequelize = require('sequelize');
const sequelize = require('../database');

class Answer extends Sequelize.Model {};

Answer.init({
  description: Sequelize.STRING,
},{
  sequelize,
  tableName: "answer",
  timestamps: false
});

module.exports = Answer;