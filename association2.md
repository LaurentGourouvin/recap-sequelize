Maintenant que nos relations ont bien été écrites dans notre /models/index.js nous allons importer tout ça dans un fichier de travail.

```js
//la première méthode
const myModels = require('./models/index');
```
Avec cette première méthode, tout vos models sont contenu dans la variable **myModels**.  
Exécutons ensemble une requête de ce type :
```sql
SELECT * FROM "question";
```
En javascript et grâce à nos models ça donnera :
```js
//je créer une fonction asynchrone afin de pouvoir exécuter ma requête
async function getAllQuestions(){
    //requête SQL dit TRY-CATCH afin de gérer les potentielles erreurs
    try {

        //je crée une variable result qui va contenir le retour de ma requête
        //afin d'accéder à mon model, je dois passer par "myModels"
        const result = await myModels.Question.findAll();
        console.log(result);

    }catch (error) {
        //j'affiche le message d'erreur
        console.log(error)
    }
}
//j'appelle la fonction getAllQuestions() pour exécuter le code du dessus.
getAllQuestions();
```
Maintenant nous allons utiliser une autre méthode plus parlante:

```js
//je récupère seulement le model question depuis /models/index.js
const {Question} = require('./models/index');

async function getAllQuestions(){
    try {
        //je peux donc, directement utiliser Question.uneméthode()
        const result = await Question.findAll();
        console.log(result);
    }catch (error) {

        console.log(error)
    }
}

getAllQuestions();
```
C'est deux solutions auront le même résultat.  

Maintenant essayons de récupérer le nom de l'utilisateur qui à créer le quiz avec l'id 1.  
Comme nous avons nos models avec les relations mises en place dans /models/index.js on pourrait à faire :
```js
const result = await Quiz.findAll(
    {
        where: {
            id: 1
        }
    }
);
```
Mais si on regarde plus près, ce code exécute via Sequelize la requête SQL suivante :
```sql
SELECT "id", "title", "description", "user_id" 
FROM "quiz" AS "Quiz" 
WHERE "Quiz"."id" = 1;
``` 
Notre relation, n'est donc pas prise en compte. Voici le résultat de la requête :   
![image](/images/recup-quiz-id-1.png)  

Pour mettre en place cette relation dans notre requête SQL nous devons utiliser le mot clé **include**.
```js
const result = await Quiz.findAll({
    include: 'author',
    where: {
        id: 1
    }
});
```
Sequelize va nous générer une requête SQL de ce format :
```sql
SELECT "Quiz"."id", "Quiz"."title", "Quiz"."description", "Quiz"."user_id", "author"."id" AS "author.id", "author"."email" AS "author.email", "author"."password" AS "author.password", "author"."firstname" AS "author.firstname", "author"."lastname" AS "author.lastname" 
FROM "quiz" AS "Quiz" 
LEFT OUTER JOIN "user" AS "author" ON "Quiz"."user_id" = "author"."id" 
WHERE "Quiz"."id" = 1;
```
Cette requête SQL nous donne ceci comme résultat : 
![image](/images/include-quiz-user-id-1.png)

Et si nous faisons un `console.log` de result nous avons :
```js
Quiz {
    dataValues: {
      id: 1,
      title: 'Animaux célèbres - I',
      description: 'Tantôt effrayants, tdropantôt drôles.',
      user_id: 1,
      author: [User]
    },
```