require('dotenv').config();
const express = require('express');

//J'appelle les objets Sequelize, Model et DataType contenu dans le package 'sequelize'
const {Sequelize, Model, DataTypes} = require('sequelize');

//Avec la ligne suivante, j'appelles mes deux connexions créer dans mon fichier dbClient. 
//La première connexion s'appelle sequelize et la deuxième connexion s'appelle sequelizeClient
const { sequelize , sequelizeClient} = require('./dbClient'); 

//J'importe ma class Question
const Question = require('./models/Question');
const app = new express();

const PORT = process.env.PORT || 4040;

//J'affiche la connexion créer à l'aide de process.env.PG_URL
//console.log(sequelize);

//J'affiche la connexion créer à l'aide de plusieurs variable disponible dans mon fichier .Env
//console.log(sequelizeClient);

async function getAllQuestions(){
    const result = await Question.findAll({
        attributes: ['question']
    });
    console.log(result);
}

getAllQuestions();

app.listen(PORT, () => {
    console.log(`Le serveur est lancé sur http://localhost:${PORT}`);
})