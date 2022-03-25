//Dans notre model Question.js on va créer un Model à l'aide de Sequelize afin de faire correspondre
//nos données qui sont stockées dans une base de donnée à un model crée dans notre application JS

//Première étape: Importer les objets { Sequelize , Model et DataTypes }
const { Sequelize, Model, DataTypes } = require('sequelize');

//Deuxième étape: Importer notre objet de connexion. Pour le coup j'en ai deux.
const { sequelize, sequelizeClient } = require('../dbClient');

//Troisième étape, on va créer notre Objet/Class Question qui va hériter de la class Sequelize.Model
//Cet héritage va nous permettre d'utiliser TOUTES les méthodes de la classe Sequelize.Model
class Question extends Model {};

//Quatrième étape, pour créer notre Model il va falloir utiliser la méthode init disponible dans la classe Model
// ----> https://sequelize.org/v6/manual/model-basics.html 

Question.init(
    //Je définis mes propriété de mon Model. Ces propriété correspondent aux différentes colonnes d'une table
    //dans ma BDD. Chaque propriété est un Objet possèdant des attributs
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        question: {
            type: DataTypes.STRING,
            allowNull: false
        },
        anecdote: {
            type: DataTypes.STRING,
            allowNull: true
        },
        wiki: {
            type: DataTypes.STRING,
            allowNull: true
        },
        level_id: {
            type: DataTypes.INTEGER
        },
        quiz_id:  {
            type: DataTypes.INTEGER
        },
        answer_id: {
            type: DataTypes.INTEGER
        }
    }, //Une fois que les colonnes de mon models sont paramétrées, j'ajoute l'objet de connexion ainsi que le nom de la table
    {
        //Cet objet va nous servir à configurer la relation entre la BDD et notre Model
        //J'indique dans un premier temps le nom de la table avec laquelle j'ai envie de travailler
        tableName: 'question',
        //J'ajoute mon élément de connexion crée dans dbClient et importé dans ce fichier
        sequelize: sequelize, //J'aurais pu utiliser sequelizeClient
        timestamps: false //Je met l'élément timestamps à false car je n'ai pas de "created_at" et de "updated_at" dans ma BBD. Par défaut il sera à TRUE
    }
);

module.exports = Question;