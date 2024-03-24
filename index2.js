const fs=require("node:fs/promises")

//La constante fs.constants.F_OK est utilisée pour vérifier l'existence du fichier sans se préoccuper des permissions.
fs.access("exemple.txt",fs.constants.F_OK).then(()=>{
    console.log("Le fichier existe.")
}).catch(()=>{
    console.log("Le fichier n'existe pas.")
})


// Créer un dossier
fs.mkdir('src')
    .then(() => {
        console.log('Répertoire créé avec succès');
    })
    .catch(err => {
        console.error(err);
    });

