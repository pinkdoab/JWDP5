localStorage.setItem('confirmation', JSON.stringify([]))

//lire stockageLocal

if (!localStorage.getItem('panierLocal')) {
    console.log("log preparation.js : le panier \"panierLocal\" n\'existe pas dans le localStorage.")
    console.log("log preparation.js : Création d\'un panier \"panierLocal\" dans le localStorage.")
    localStorage.setItem('panierLocal', JSON.stringify([]))

} else {
    console.log("log preparation.js : le panier \"panierLocal\" existe dans le localStorage")
    for (let i = 0; i < localStorage.length; i++) {
        console.log('log preparation.js : ' + localStorage.key(i) + ' = ' + localStorage.getItem(localStorage.key(i)))    
    }
}