# Les modules natifs de Node.js

Node.js fournit plusieurs modules natifs qui offrent des fonctionnalités essentielles pour interagir avec le système d'exploitation, manipuler des fichiers et des répertoires, et effectuer diverses tâches courantes. Voici quelques-uns des modules natifs les plus utilisés :

## 1. Module `os`

Le module `os` fournit des fonctions utiles pour interagir avec le système d'exploitation. Voici quelques exemples :

```javascript
const os = require('os');

// Obtenir le type de système d'exploitation
console.log(os.type()); // 'Linux', 'Darwin', 'Windows_NT'

// Obtenir le répertoire personnel de l'utilisateur
console.log(os.homedir()); // '/home/user'

// Obtenir la quantité totale de mémoire système en octets
console.log(os.totalmem()); // 8589934592

// Obtenir la quantité de mémoire libre en octets
console.log(os.freemem()); // 2147483648

// Obtenir le nombre de CPU
console.log(os.cpus().length); // 4
```

## 2. Module `fs`

Le module `fs` (File System) permet d'interagir avec le système de fichiers. Il offre des fonctions pour lire, écrire, créer et supprimer des fichiers et des répertoires. Voici quelques exemples :

```javascript
const fs = require('node:fs/promises');

// Lire un fichier de manière asynchrone
fs.readFile('exemple.txt', 'utf8')
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.error(err);
    });

// Écrire dans un fichier de manière asynchrone
const content = 'Contenu à écrire dans le fichier';
fs.writeFile('exemple.txt', content)
    .then(() => {
        console.log('Fichier écrit avec succès');
    })
    .catch(err => {
        console.error(err);
    });

// Vérifier si un fichier existe de manière asynchrone
// Note: fs.promises n'a pas de méthode exists car la vérification d'existence est généralement antipattern.
// Utilisez fs.access ou essayez de lire/écrire directement et gérez l'erreur.
fs.access('exemple.txt')
    .then(() => console.log(true))
    .catch(() => console.log(false));

// Créer un répertoire de manière asynchrone
fs.mkdir('nouveau_repertoire')
    .then(() => {
        console.log('Répertoire créé avec succès');
    })
    .catch(err => {
        console.error(err);
    });

// Supprimer un fichier de manière asynchrone
fs.unlink('exemple.txt')
    .then(() => {
        console.log('Fichier supprimé avec succès');
    })
    .catch(err => {
        console.error(err);
    });

```

## 3. Module `path`

Le module `path` fournit des outils pour travailler avec les chemins de fichiers et de répertoires. Voici quelques exemples :

```javascript
const path = require('path');

// Joindre des segments de chemin
const filePath = path.join('/repertoire', 'sous-repertoire', 'fichier.txt');
console.log(filePath); // '/repertoire/sous-repertoire/fichier.txt'

// Obtenir le répertoire d'un chemin
const dirName = path.dirname('/repertoire/sous-repertoire/fichier.txt');
console.log(dirName); // '/repertoire/sous-repertoire'

// Obtenir le nom de fichier d'un chemin
const fileName = path.basename('/repertoire/sous-repertoire/fichier.txt');
console.log(fileName); // 'fichier.txt'

// Obtenir l'extension d'un fichier
const fileExt = path.extname('fichier.txt');
console.log(fileExt); // '.txt'

// Résoudre un chemin absolu
const absolutePath = path.resolve('repertoire', 'fichier.txt');
console.log(absolutePath); // '/chemin/absolu/repertoire/fichier.txt'
```

Ces exemples illustrent quelques-unes des fonctionnalités offertes par les modules natifs `os`, `fs` et `path`. Ces modules sont essentiels pour interagir avec le système d'exploitation, manipuler des fichiers et des répertoires, et travailler avec des chemins.

N'hésitez pas à explorer la documentation officielle de Node.js pour en savoir plus sur ces modules et découvrir d'autres fonctionnalités qu'ils proposent.