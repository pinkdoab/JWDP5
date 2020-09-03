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
            let nom = document.getElementById("nom").value
            if (nom == '' || !motif.test(nom)) {                            // TEST du champs "Nom" suivant le motif
                formValide = false
                window.alert("Autorisé : des lettres, un seul espace entre chaque mot, un signe _ ou le signe -");
            }
            
            let contact = {
                firstName : nom,
                lastName : 'zzzzz',
                address : 'xxxxxx',
                city : 'qqqqqq',
                email : 'ffff@fff.fr'
            }

            let prod = []
            let a
            liste.forEach(element => {
                a = element.split("?")
                prod.push(a[0])
            });
            let products = prod
            let objet = {
                contact,
                products
            }
            if (formValide == true) {
                let objetRequest = JSON.stringify(objet)
                RequeteComfirm(objetRequest)
            }
        }
    })
}