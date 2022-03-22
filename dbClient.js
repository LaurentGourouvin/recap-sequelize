require('dotenv').config();
const { Sequelize } = require('sequelize');

//- 2 Possibilité pour connecter Sequelize à notre BDD
// J'exporte ces deux "connexions" pour vos montrer que c'est exactement la même chose
const sequelize = new Sequelize(process.env.PG_URL);


const sequelizeClient = new Sequelize(process.env.PG_DATABSE_NAME, process.env.PG_USERNAME, process.env.PG_PASSWORD, {
  host: process.env.PG_HOST,
  dialect: 'postgres'
});

module.exports = {
    sequelize,
    sequelizeClient
}