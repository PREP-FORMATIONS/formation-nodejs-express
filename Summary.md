# L'objet global en Node.js

En Node.js, l'objet global est l'objet racine de l'environnement d'exécution. Il fournit des propriétés et des méthodes accessibles partout dans l'application Node.js sans nécessiter d'importation explicite.

## Différences avec l'objet global du navigateur

Dans un navigateur, l'objet global est `window`. Cependant, en Node.js, l'objet global est simplement appelé `global`. Voici quelques différences clés :

- `window` est spécifique au navigateur, tandis que `global` est spécifique à Node.js.
- `window` fournit des propriétés et des méthodes liées au DOM et à l'interface utilisateur, tandis que `global` fournit des propriétés et des méthodes spécifiques à Node.js.
- Dans le navigateur, les variables déclarées avec `var` deviennent des propriétés de `window`, tandis qu'en Node.js, elles ne deviennent pas automatiquement des propriétés de `global`.

## Propriétés et méthodes de l'objet global en Node.js

Voici quelques propriétés et méthodes couramment utilisées de l'objet `global` en Node.js :

- `global.console` : Fournit des méthodes pour afficher du texte dans la console, comme `console.log()`, `console.error()`, etc.

```javascript
global.console.log('Hello, world!');
```

- `global.process` : Fournit des informations et un contrôle sur le processus Node.js en cours.

```javascript
console.log(global.process.version);
console.log(global.process.platform);
```

- `global.setTimeout()`, `global.setInterval()` et `global.setImmediate()` : Permettent de planifier l'exécution d'une fonction après un certain délai ou de manière répétée.

```javascript
global.setTimeout(() => {
  console.log('Delayed message');
}, 1000);
```

```javascript
let secondes=0;
global.setInterval(() => {
    console.log(++secondes);
}, 1000);
```

- `global.__dirname` : Contient le chemin du répertoire du module en cours.
- `global.__filename` : Contient le chemin du fichier du module en cours.

```javascript
console.log(__dirname);
console.log(__filename);
```

## Variables globales en Node.js

En Node.js, les variables déclarées en dehors de toute fonction avec le mot-clé `var` ne deviennent pas automatiquement des propriétés de l'objet `global`. Elles sont limitées au module en cours.

```javascript
var myVariable = 'Hello';
console.log(global.myVariable); // undefined
```

Cependant, si vous assignez explicitement une variable à `global`, elle deviendra une propriété de `global`.

```javascript
global.myGlobalVariable = 'Hello, global!';
console.log(global.myGlobalVariable); // 'Hello, global!'
```

## Conclusion

L'objet `global` en Node.js est l'objet racine qui fournit des propriétés et des méthodes accessibles dans toute l'application. Il diffère de l'objet `window` du navigateur en termes de fonctionnalités et de portée des variables. Comprendre l'objet `global` est essentiel pour travailler efficacement avec Node.js.