# Association avec Sequelize
- [Récap-Sequelize](./README.md)  
- [Association avec Sequelize](./association.md)
## Mettre en place des relations/associations grâce à Sequelize

Avec Sequelize nous avons quatres possibilités d'association:
- `HasOne`
- `BelongsTo`
- `HasMany` 
- `BelongsTo`
   
L'association `User.hasOne(Cart)`, définit la cardinalité **[1,1]** entre la table **User** et **Cart** avec une *clé étrangère* qu sera définie dans le model **Cart**. 

```js
//--- Un user à un cart
User.hasOne(Cart);
```

L'association `User.belongsTo(Cart)` définit la cardinalité **[1,1]** entre la table **User** et **Card** avec une *clé étrangère* qu sera définie dans le model racine qui est **User**.

```js
//--- Un user à un cart
User.belongsTo(Cart)
```

L'association `User.hasMany(Cart)` définit la cardinalité **[1,N]** entre **User** et **Cart**, avec une *clé étrangère* qui sera définie dans le model **Cart**. 

```js
// un User a plusieurs cart
User.hasMany(Cart);
```
Le fait d'utiliser ces trois associations avec Sequelize permettent d'ajouter des clés étrangères directement à nos différents models. (même si elles sont déjà présentes)

L'association `User.belongsToMany(Cart, { through: 'commandes'})` définit une association **[N,N]** entre **User** et **Cart** utilisant la table commandes en tant que jonction de table. Cette table commande contiendra les *clé étrangères* (User.id et Cart.id, par exemple). Sequelize va créer tout seul ce model **commandes** et définiera les bonnes clés étrangères.  

## Notre index.js de nos models
Nous allons travailler avec les Models créer pour le challenge/pair programming Oquiz. (answer.js , level.js ...)  
Dans notre dossier "Model", nous avons un fichier index.js dans lequel nous allons indiquer à Sequelize nos différentes associations :
```js
const Answer = require('./answer');
const Level = require('./level');
const Question = require('./question');
const Quiz = require('./quiz');
const Tag = require('./tag');
const User = require('./user');

// une question a plusieurs answers
Question.hasMany(Answer, {
    foreignKey: "question_id",
    as: "answers"
});

// réciproque : une answer est lié à une seule question
Answer.belongsTo(Question, {
    foreignKey: "question_id",
    as: "question"
});

// ATTENTION cas particulier : Question et Answer sont liés de 2 manières différentes!
// en effet, il y a aussi "la bonne réponse" !
Question.belongsTo(Answer, {
    foreignKey: "answer_id",
    as: "good_answer"
});


// une question a un niveau
Question.belongsTo(Level, {
    foreignKey: "level_id",
    as: "level"
});
// réciproque : un niveau concerne plusieurs questions
Level.hasMany(Question, {
    foreignKey: "level_id",
    as: "questions"
});


// User : "un Quiz appartient à un User"
Quiz.belongsTo(User, {
    foreignKey: "user_id",
    as: "author"
});

// ...et la réciproque : "un User possède plusieurs Quiz"
User.hasMany(Quiz, {
    foreignKey: "user_id",
    as: "quizList"
});


// Question : "un Quiz possède plusieurs Questions"
Quiz.hasMany(Question, {
    foreignKey: "quiz_id",
    as: "questions"
});
// et la réciproque: "une Question appartient à un seul Quiz"
Question.belongsTo(Quiz, {
    foreignKey: "quiz_id",
    as: "quiz"
});


// Quiz <> Tags, via la table de liaison
// "Un Quiz possède plusieurs tags"
Quiz.belongsToMany(Tag, {
    as: "tags", // alias de l'association 
    through: 'quiz_has_tag', // "via la table de liaison qui s'appelle ..."
    foreignKey: 'quiz_id', // le nom de la clef de Quiz dans la table de liaison
    otherKey: 'tag_id', // le nom de la clef de "l'autre" (donc Tag)
});
// ... et la réciproque !
Tag.belongsToMany(Quiz, {
    as: "quizList",
    through: 'quiz_has_tag',
    otherKey: 'quiz_id',
    foreignKey: 'tag_id',
});

module.exports = { Answer, Level, Question, Quiz, Tag, User };
```
[Page suivante >>](./association2.md)