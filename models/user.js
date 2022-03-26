const Sequelize = require('sequelize');
const { sequelize, sequelizeClient } = require('../dbClient');

class User extends Sequelize.Model {

  get fullname() {
    return this.firstname + ' ' + this.lastname;
  };

};

User.init({
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING
}, {
  sequelize,
  tableName: "user",
  timestamps: false
});


module.exports = User;