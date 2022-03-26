const Sequelize = require('sequelize');
const { sequelize, sequelizeClient } = require('../dbClient');

class Tag extends Sequelize.Model {};

Tag.init({
  name: Sequelize.STRING
},{
  sequelize,
  tableName: "tag",
  timestamps: false
});

// on exporte la class directement !
module.exports = Tag;