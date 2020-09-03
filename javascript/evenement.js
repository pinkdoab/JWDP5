/* 
    Action à faire en cas de click sur le bouton d'envoi vers la panier dans produit.html
    
    s'il n'existe pas de panier, création d'un panier par contre si le panier existe ajout d'un produit (l'id est récupéré dans l'URL venant de index.html)
    Attention le bouton n'est pas accessible si le produit n'est pas personnalisé
*/
const boutonChoixProduit = document.getElementById('boutonChoixProduit')
if (boutonChoixProduit){                                                // TEST si le bouton existe
    boutonChoixProduit.addEventListener('click', event => {
        let panier
        if (!localStorage.getItem('panierLocal')) {                     // TEST si le panier existe
            panier = []
        } else {
            panier = JSON.parse(localStorage.getItem('panierLocal'))
        }
        let motif = /.*\?id=(.*)/ig
        let idModif = motif.exec(window.location.search)
        panier.push(idModif[1])
        localStorage.setItem("panierLocal",JSON.stringify(panier))
    })
}

// _____________________________________________________________________
/* 
    Action à faire en cas de click sur le bouton "effacer le panier" dans panier.html
    
    s'il le panier n'est pas vide, le supprimer
*/
const boutonEffacePanier = document.getElementById('boutonEffacePanier')
if (boutonEffacePanier){                                                    // TEST si le bouton existe
    boutonEffacePanier.addEventListener('click', event => {
        event.preventDefault();
        let liste = JSON.parse(localStorage.getItem('panierLocal'))
        if (liste != 0) {                                                   // TEST si le panier n'est pas vide
            localStorage.clear();
            location.reload()
        }
    })
}

// _____________________________________________________________________
/* 
    Action à faire en cas de click sur le bouton "Validation du panier" dans panier.html
    
    s'il le panier n'est pas vide, tester de tous les éléments du formulaire.
    si au moins un élément n'est pas valide, impossible de valider le formulaire
*/
const boutonValidation = document.getElementById('boutonComfirmCommande')
if (boutonValidation){                                                      // TEST si le bouton existe
    boutonValidation.addEventListener('click', event => {
        var liste = JSON.parse(localStorage.getItem('panierLocal'))
        console.log ("Click bouton validation : " + liste)
        if (liste != null && liste != 0 ) {                                 // TEST si un panier existe et n'est pas vide
            event.preventDefault()
            let formValide = true

            motif = /^[a-zA-Z_-]+( [a-zA-Z_-]+)*$/                          // Autorisé : des lettres, un seul espace entre chaque mot, un signe _ ou le signe -
            let nom = document.getElementById("inputNom").value
            if (nom == '' || !motif.test(nom)) {                            // TEST du champs "Nom" suivant le motif
                formValide = false
                window.alert("Champs \"Nom\" non valide. Autorisé : des lettres, un seul espace entre chaque mot, un signe _ ou le signe -");
            }

            motif = /^[a-zA-Z_-]+( [a-zA-Z_-]+)*$/                          // Autorisé : des lettres, un seul espace entre chaque mot, un signe _ ou le signe -
            let prenom = document.getElementById("inputPrenom").value
            if (prenom == '' || !motif.test(prenom)) {                            // TEST du champs "Nom" suivant le motif
                formValide = false
                window.alert("Champs \"Prénom\" non valide. Autorisé : des lettres, un seul espace entre chaque mot, un signe _ ou le signe -");
            }

            motif = /^[a-zA-Z0-9_-]+( [a-zA-Z0-9_-]+)*$/                          // Autorisé : des lettres, des chiffres, un seul espace entre chaque mot, un signe _ ou le signe -
            let adresse = document.getElementById("inputAdresse").value
            if (adresse == '' || !motif.test(adresse)) {                            // TEST du champs "Nom" suivant le motif
                formValide = false
                window.alert("Champs \"Adresse\" non valide. Autorisé : des lettres, des chiffres, un seul espace entre chaque mot, un signe _ ou le signe -");
            }
            
            motif = /^[a-zA-Z_-]+( [a-zA-Z_-]+)*$/                          // Autorisé : des lettres, un seul espace entre chaque mot, un signe _ ou le signe -
            let ville = document.getElementById("inputVille").value
            if (ville == '' || !motif.test(ville)) {                            // TEST du champs "Nom" suivant le motif
                formValide = false
                window.alert("Champs \"ville\" non valide. Autorisé : des lettres, un seul espace entre chaque mot, un signe _ ou le signe -");
            }
            motif = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/                          // Autorisé : des lettres, un seul espace entre chaque mot, un signe _ ou le signe -
            let email = document.getElementById("inputEmail").value
            if (email == '' || !motif.test(email)) {                            // TEST du champs "Nom" suivant le motif
                formValide = false
                window.alert("Champs \"email\" non valide.");
            }
            
            let contact = {
                firstName : nom,
                lastName : prenom,
                address : adresse,
                city : ville,
                email : email
            }

            let products = []
            liste.forEach(element => {
                let a = element.split("?")
                products.push(a[0])
            });

            if (formValide == true) {
                let objetRequest = JSON.stringify({contact,products})                
                RequeteComfirm(objetRequest)
            }
        }
    })
}