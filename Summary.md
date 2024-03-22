# Les modules en Node.js

Les modules en Node.js permettent de diviser une application en plusieurs fichiers et fonctionnalités réutilisables. Node.js prend en charge deux systèmes de modules : CommonJS (utilisé par défaut) et ES6 (disponible dans les versions récentes de Node.js).

## 1. Exportation/Importation de modules

### 1.1. CommonJS

#### 1.1.1. Exportation en CommonJS

##### a. Exportation nommée (CommonJS)

Avec CommonJS, vous pouvez exporter des fonctionnalités spécifiques d'un module en les assignant à l'objet `module.exports`. Voici un exemple :

```javascript
// monModule.js
function maFonction() {
  console.log('Fonction appelée depuis le module');
}

const maVariable = 'Valeur de la variable';

module.exports = {
  maFonction,
  maVariable
};
```

##### b. Exportation par défaut (CommonJS)

Vous pouvez également définir une exportation par défaut en assignant directement une valeur à `module.exports`. Voici un exemple :

```javascript
// monModule.js
function maFonction() {
  console.log('Fonction appelée depuis le module');
}

module.exports = maFonction;
```

#### 1.1.2. Importation de modules CommonJS

Pour importer un module CommonJS, vous utilisez la fonction `require()`. Voici comment importer les modules exportés précédemment :

```javascript
// app.js
const monModule = require('./monModule');

monModule.maFonction();
console.log(monModule.maVariable);
```

### 1.2. ES6

#### 1.2.1. Exportation en ES6

##### a. Exportation nommée (ES6)

Avec les modules ES6, vous pouvez utiliser le mot-clé `export` pour exporter des fonctionnalités spécifiques. Voici un exemple :

```javascript
// monModule.js
export function maFonction() {
  console.log('Fonction appelée depuis le module');
}

export const maVariable = 'Valeur de la variable';
```

##### b. Exportation par défaut (ES6)

Vous pouvez également définir une exportation par défaut en utilisant `export default`. Voici un exemple :

```javascript
// monModule.js
export default function maFonction() {
  console.log('Fonction appelée depuis le module');
}
```

#### 1.2.2. Importation de modules ES6

Avec les modules ES6, vous utilisez le mot-clé `import` pour importer des modules. Voici comment importer les modules exportés précédemment :

```javascript
// app.js
import { maFonction, maVariable } from './monModule.js';

maFonction();
console.log(maVariable);
```

Pour importer une exportation par défaut, vous pouvez utiliser n'importe quel nom :

```javascript
// app.js
import maFonctionParDefaut from './monModule.js';

maFonctionParDefaut();
```

## 2. Utilisation des modules ES6 dans Node.js

Pour utiliser les modules ES6 dans Node.js, vous devez effectuer la manipulation suivante :
1. Ouvrir le fichier `package.json`
2. Ajouter une clé `type`, avec comme valeur `module`

## 3. Conclusion

Node.js prend en charge deux systèmes de modules : CommonJS et ES6. Les modules permettent de structurer le code en unités réutilisables et de gérer les dépendances. Vous pouvez utiliser les exportations nommées et les exportations par défaut pour exposer des fonctionnalités spécifiques d'un module. L'importation de modules se fait à l'aide de `require()` pour CommonJS et de `import` pour ES6.