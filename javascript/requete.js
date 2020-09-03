/*
    Fonction AJAX avec promise

    method : GET ou POST
    url : API
    objetRequest : objet envoyé avec POST

    exemple de requête
        faireRequete('GET',  'http://localhost:3000/api/cameras')
        faireRequete('POST', 'http://localhost:3000/api/cameras/order', objetRequest)
*/
function faireRequete (method, url, objetRequest) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url)
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {              // TEST si le status renvoyé par le serveur est correct
                resolve(xhr.response);                                  //    test OK renvoi la réponse
            } else {
                reject({
                    status: this.status,                                //    test KO renvoi une erreur
                    statusText: xhr.statusText
                })
            }
        }
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            })
        }
        xhr.send(objetRequest)
    })
}

/* _______________________________________________________________________________________
Affiche le catalogue de produits et efface le localStorage si une commande est déjà passée

    Données retournées : un Array contenant des objets JSON avec les données suivantes :
        name
        price
        description
        lenses (contient un Array de noms d'objectifs)
        imageUrl

*/
requeteCatalogue = function() {
    faireRequete('GET', 'http://localhost:3000/api/cameras')
    .then(function (catalogue) {                                        // requête faireRequete() réussie
        if (JSON.parse(localStorage.getItem('confirmation'))) {         // TEST : Efface le localstorage si la commande est passé
            localStorage.clear();
        }
        AfficheCatalogue(JSON.parse(catalogue))                         // Affiche les produits
    })
    .catch(function (err) {                                             // requête faireRequete() ratée
        console.error('Aieee..., il y a une erreur dans requeteCatalogue() !', err.statusText)   // retour KO
        console.error(err)
    });
}

/* _______________________________________________
    Requête demandant un produit défini par un id

    id est passé par URL de index.html à produit.html et récupéré dans $_GET pour faire la requête
    exemple :   URL = file:///Users/pink01/Documents/git/JWDP5/pages/produit.html?id=5be1ed3f1c9d44000030b061
                donc $_GET = 5be1ed3f1c9d44000030b061
                puis faireRequete('GET', 'http://localhost:3000/api/cameras/5be1ed3f1c9d44000030b061'

    en cas de succés de la requête, création dynamique du menu des Objectifs photos puis Affichage de la carte du produit
*/
requeteProduit = function() {
    let $_GET
    if (!/.*id=(.*)\?obj=.*/ig.test(window.location.search)) {          
        $_GET = /.*id=(.*)/ig.exec(window.location.search)        
    } else {
        $_GET = /.*id=(.*)\?obj=.*/ig.exec(window.location.search)       
    }
    let url = 'http://localhost:3000/api/cameras/' + $_GET[1]

    faireRequete('GET', url)
    .then(function (produit) {                                          // requête faireRequete() réussie
        CreaMenuOption(JSON.parse(produit))
        AfficheCarteCameraGrandFormat(JSON.parse(produit))
    })
    .catch(function (err) {                                             // requête faireRequete() ratée
        console.error('Aieee..., il y a une erreur dans requeteProduit() !', err.statusText)
    });
}
/* _____________________________________________________________________  
    Requête d'affichage du panier suivant les données du catalogue et du localStockage

    parametre page = 'produit' ou 'confirmation' (où va s'afficher le panier dans la page panier ou validation)

    requête des données catalogue : faireRequete('GET', 'http://localhost:3000/api/cameras'
    Données retournées : un Array contenant des objets JSON avec les données suivantes :
        name
        price
        description
        lenses (contient un Array de noms d'objectifs)
        imageUrl

        si la requête a réussi et le panier existe (localStorage 'panier local'), création un tableau de produits a afficher
        puis appel de la fonction AffichePanier() pour afficher ce panier
*/
requetePanier = function(page) {
    faireRequete('GET', 'http://localhost:3000/api/cameras')
    .then(function (catalogue) {                                        // requête faireRequete() réussie
        let catalogue_JSON = (JSON.parse(catalogue))
        var panierLocal = JSON.parse(localStorage.getItem('panierLocal'))
        var panierAfficher = []
        if (panierLocal != null && panierLocal != 0 ) {                 // TEST si le panier existe et n'est pas vide
            panierLocal.forEach(eltcamera => {
                let motif = /.*obj.*/ig
                let idModif = eltcamera
                let obj = 0
                if (motif.test(eltcamera)) {
                    let motif = /(.*)\?obj=(.)/ig
                    idModif = motif.exec(eltcamera)                  
                    eltcamera = idModif[1]
                    obj = idModif[2]
                }
                catalogue_JSON.forEach(element => {
                    if (eltcamera == element['_id']) {
                        let cam = []
                        cam.push(element['name'])
                        cam.push(element['price'])
                        cam.push(element['lenses'][obj])
                        panierAfficher.push(cam)
                    }
                })
            })
            AffichePanier(panierAfficher, page)
        } else {
            console.log("Panier vide")
        }
    })
    .catch(function (err) {                                             // requête faireRequete() ratée
        console.error('Aieee..., il y a une erreur dans requetePanier() !', err.statusText)
    });
}
/* _____________________________________________________________________  
    Fonction envoi du panier au serveur POST et retour de la confirmation 
*/
RequeteComfirm = function(objetRequest) {
    faireRequete('POST', 'http://localhost:3000/api/cameras/order', objetRequest)
    .then(function(confirmation) {
        localStorage.setItem("confirmation",confirmation)
        console.log(confirmation)
        let response = JSON.parse(localStorage.getItem('confirmation'))
        console.log(response.contact.firstName)
        document.location.href="confirmation.html";
    })
    .catch(function (err) {
        console.error('Aieee..., il y a une erreur dans RequeteComfirm() !', err.statusText)
    });
}