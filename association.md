# Association avec Sequelize
[[ ]Récap-Sequelize](./README.md)  
[x] Association avec Sequelize
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
