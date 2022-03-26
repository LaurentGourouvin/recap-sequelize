# Petit recap-sequelize

## Qu'est-ce que Sequelize ?
Sequelize est une puissante bibliothèque en Javascript qui facilite la gestion d’une base de données SQL. Sequelize peut superposer différents protocoles, mais ici nous allons utiliser PostgreSQL. En son coeur, Sequelize est un mappeur objet-relationnel – ce qui signifie qu’il mappe une syntaxe d’objet sur nos schémas/modèles de base de données.   
   
## Comment installer Sequelize ?
Pour utiliser Sequelize, nous avons besoin de deux dépendances. `pg` et `sequelize`. On va donc passer à l'installation :   
```shell
npm install pg sequelize
```
## Avant Sequelize
Avant d'utiliser Sequelize et d'entendre parler de lui, nous avions toujours travaillé avec la dépendance de PG. Celle-ci nous permet de se connecter à une base de données et d'effectuer des interactions avec celle-ci.  
   
### Connexion à une base de donnée en utilisant `PG` :
```js
const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
});

//------------------ Ou ---------------------
const client = new Client(process.env.PG_URL);

client.connect(error =>{
    if(error){
        console.log("problème de connexion à la base de données", error);
    }
});
```
Une simple requête préparée *(pour éviter toute injection de SQL par des hackers)* à l'aide de `PG` :
```js
const query = {
      text: `SELECT * FROM "card" WHERE "id"=$1`,
      values: [cardId]
    };
const results = await database.query(query);
```

## Maintenant avec Sequelize
Maintenant qu'on a vu notre pote Sequelize après les cours sur la **POO** on va essayer de l'utiliser à la place de notre PG. On ne "remplace" pas vraiment `PG` car `Sequelize` à besoin de PG pour fonctionner (car nous utilisons le SGBD *(système de gestion de base de données PostGresql)* ).
      
Dans les faits, qu'est-ce que ça donne ?   

### Connexion à une base de donnée avec Sequelize
```js
require('dotenv').config();

const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.PG_URL);

module.exports = sequelize;
```
On va essayer d'expliquer ce morceau de code.   
Dans un premier temps nous avons :
```js
const {Sequelize} = require('sequelize');
```
Cette ligne indique que nous importons dans notre fichier actuel, la classe `Sequelize`.   
Ensuite nous avons : 
```js
const sequelize = new Sequelize(process.env.PG_URL);
```
On créer une variable `sequelize`, qui sera une instance de la classe Sequelize. C'est grâce à cette variable, à cet objet, que par la suite nous pourrons intérargir avec notre base de données.   
### Exécuter une requête SQL avec Sequelize
Avec l'outil Sequelize, il y a deux manières d'effectuer des requêtes SQL. La première méthode : les **Raw Queries**.
Cette méthode ressemble beaucoup à notre première requête faites avec le module `PG`.  
Une Raw Query :
```js
const sequelize = require('./database.js');
const { QueryTypes } = require('sequelize');

const users = await sequelize.query("SELECT * FROM `users`", 
    { type: QueryTypes.SELECT }
);
```
Mais pourquoi utiliser les Raw Queries quand nous utilisons Sequelize ?  
Comme dis plus haut, la force de Sequelize est basé sur des Models (des représentation d'une table SQL dans notre code Javascript).  
Pour effectuer une requête comme `SELECT * from "user"` :
```js
// Récupération des Users stockés dans ma base de données
const users = await User.findAll();
```
Un exemple de Model pour User :
```js
const Sequelize = require('sequelize');
const sequelize = require('../database');

class User extends Sequelize.Model {};

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
```
Nous avons aussi la possibilité de choisir quelle colonne récupérer avec la méthode `findAll()`. Pour ce faire, nous allons jouer avec les attributs. Si je veux récupérer seulement le **firstname** de les utilisateurs :

```js
const users = await User.findAll({
    attributes: ['firstname']
});
```
Ce qui donne :
```js
User {
    dataValues: {
        firstname: 'Toto'
    },
}...
```
### Petit récap sur le `findAll()`
On peut donc faire un `SELECT * FROM...` afin de récupérer toutes les colonnes de la table visée avec la méthode `findAll()` ou tout simplement sélectionner les colonnes à afficher grâce aux attribut en faisant : `attributes: ['nom_colonne']`.

## Mettre en place des relations/associations grâce à Sequelize

Avec Sequelize nous avons quatres possibilités d'association:
- `HasOne`
- `BelongsTo`
- `HasMany`
- `BelongsTo`
   
L'association `User.hasOne(Cart)` définis la cardinalité **[1,1]** entre la table **User** et **Card** avec une *clé étrangère* qu sera définie dans le model **Cart**. 

The A.belongsTo(B) association means that a One-To-One relationship exists between A and B, with the foreign key being defined in the source model (A).

The A.hasMany(B) association means that a One-To-Many relationship exists between A and B, with the foreign key being defined in the target model (B).

These three calls will cause Sequelize to automatically add foreign keys to the appropriate models (unless they are already present).

The A.belongsToMany(B, { through: 'C' }) association means that a Many-To-Many relationship exists between A and B, using table C as junction table, which will have the foreign keys (aId and bId, for example). Sequelize will automatically create this model C (unless it already exists) and define the appropriate foreign keys on it.