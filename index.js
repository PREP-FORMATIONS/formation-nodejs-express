const fs = require('node:fs/promises')

// Lire un fichier de manière asynchrone
// fs.readFile('exemple.txt', 'utf8')
//     .then(data => {
//         console.log(data);
//     })
//     .catch(err => {
//         console.error(err);
//     });


// Écrire dans un fichier de manière asynchrone
// const content = 'Contenu à écrire dans le fichier';
// fs.writeFile('exemple.txt', content)
//     .then(() => {
//         console.log('Fichier écrit avec succès');
//     })
//     .catch(err => {
//         console.error(err);
//     });

// Écrire dans un fichier de manière asynchrone sans effacer le contenu courant
const content = ["Nous sommes", "Vous êtes", "Elles/Ils sont"]


for (const personne of content) {
    fs.appendFile('exemple.txt', `\n${personne}`)
        .then(() => {
            console.log("")
        })
        .catch(err => {
            console.error(err);
        });
}

// We can use a IIFE or just use a try-catch inside a function
// 1. IIFE
// const content = ["Nous sommes", "Vous êtes", "Elles/Ils sont"];
//
// (async () => {
//     try {
//         for (const personne of content) {
//             await fs.appendFile('exemple.txt', personne + '\n');
//             console.log(`Ajouté: ${personne}`);
//         }
//         console.log("Écriture terminée.");
//     } catch (err) {
//         console.error(err);
//     }
// })();

// 2. Functions
// const content = ["Nous sommes", "Vous êtes", "Elles/Ils sont"];
//
// async function writeToFile() {
//     try {
//         for (const personne of content) {
//             await fs.appendFile('exemple.txt', personne + '\n');
//             console.log(`Ajouté: ${personne}`);
//         }
//         console.log("Écriture terminée.");
//     } catch (err) {
//         console.error(err);
//     }
// }

