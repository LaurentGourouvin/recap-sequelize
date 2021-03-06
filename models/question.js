const Sequelize = require('sequelize');
const { sequelize, sequelizeClient } = require('../dbClient');

class Question extends Sequelize.Model {};


Question.init({
  question: Sequelize.STRING,
  anecdote: Sequelize.STRING,
  wiki: Sequelize.STRING
},{
  sequelize,
  tableName: "question",
  timestamps: false
});


// on exporte la class directement !
module.exports = Question;