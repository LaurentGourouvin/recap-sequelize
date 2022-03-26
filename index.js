//Config lié au serveur Node.JS
//-------------------------------------
require('dotenv').config();
const express = require('express');
const app = new express();
const PORT = process.env.PORT || 4040;
//-------------------------------------

//J'appelle les objets Sequelize, Model et DataType contenu dans le package 'sequelize'
const {Sequelize, Model, DataTypes} = require('sequelize');

//Avec la ligne suivante, j'appelles mes deux connexions créer dans mon fichier dbClient. 
//La première connexion s'appelle sequelize et la deuxième connexion s'appelle sequelizeClient
const { sequelize , sequelizeClient} = require('./dbClient'); 

const myModels = require('./models/index');

async function getAllQuestions(){
    const result = await test.Question.findAll({
        attributes: ['question']
    });
    console.log(result);
}

getAllQuestions();

app.listen(PORT, () => {
    console.log(`Le serveur est lancé sur http://localhost:${PORT}`);
})