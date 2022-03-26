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
        const result = await myModels.Question.findAll({
            attributes: ['question']
        });
        console.log(result);
    }catch (error) {
        console.log(error)
    }
}
//j'appelle la fonction getAllQuestions() pour exécuter le code du dessus.
getAllQuestions();
```