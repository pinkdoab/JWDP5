/*
    Fonction générique AJAX avec promise

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
            if (this.status >= 200 && this.status < 300) {              // test si le status renvoyé par le serveur est correct
                resolve(xhr.response);                                          // test OK
            } else {
                reject({
                    status: this.status,                                        // test KO
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
/* _____________________________________________________________________  

    Fonction demande au serveur du catalogue de produits

    Données retournées : une chaîne de caractères JSON représentant un Array contenant des objets JSON avec les données suivantes :
        name
        price
        description
        lenses (contient un Array de noms d'objectifs)
        imageUrl
*/
requeteCatalogue = function() {
    faireRequete('GET', 'http://localhost:3000/api/cameras')
    .then(function (catalogue) {
        if (JSON.parse(localStorage.getItem('confirmation'))) {         // Efface le localstorage si la commande est passé
            localStorage.clear();
        }
        AfficheCatalogue(JSON.parse(catalogue))                         // retour Ok
    })
    .catch(function (err) {
        console.error('Aieee..., il y a une erreur dans requeteCatalogue() !', err.statusText)   // retour KO
        console.error(err)
    });
}
/* _____________________________________________________________________  

    Fonction demande au serveur un produit défini par son id

    Données retournées : une chaîne de caractères JSON représentant un objet JSON avec les données suivantes :
        name
        price
        description
        lenses (contient un Array de noms d'objectifs)
        imageUrl
*/
requeteProduit = function() {

    let $_GET
    if (!/.*id=(.*)\?obj=.*/ig.test(window.location.search)) {
        $_GET = /.*id=(.*)/ig.exec(window.location.search)        
    } else {
        $_GET = /.*id=(.*)\?obj=.*/ig.exec(window.location.search)       
    }
    /*let motif = /.*id=(.*)\?obj=.*/ /*ig
    let $_GET
    if (!motif.test(window.location.search)) {
        let motif = /.*id=(.*)/ig
        $_GET = motif.exec(window.location.search)        
    } else {
        let motif = /.*id=(.*)\?obj=.*/ /*ig
        $_GET = motif.exec(window.location.search)       
    }*/
    let url = 'http://localhost:3000/api/cameras/' + $_GET[1]

    faireRequete('GET', url)
    .then(function (produit) {
        CreaMenuOption(JSON.parse(produit))
        AfficheCarteCameraGrandFormat(JSON.parse(produit))
    })
    .catch(function (err) {
        console.error('Aieee..., il y a une erreur dans requeteProduit() !', err.statusText)
    });
}
/* _____________________________________________________________________  

    Fonction appel l'affichage du panier suivant les données du catalogue venant du serveur et le localStockage

*/
requetePanier = function(page) {
    let url = 'http://localhost:3000/api/cameras'
    faireRequete('GET', url)
    .then(function (catalogue) {
        let catalogue_JSON = (JSON.parse(catalogue))
        var panierLocal = JSON.parse(localStorage.getItem('panierLocal'))
        var panierAfficher = []
        if (panierLocal != null && panierLocal != 0 ) {
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
                var elt = []
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
        }
    })
    .catch(function (err) {
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
        document.location.href="file:///Users/pink01/Documents/git/JWDP5/confirmation.html";
    })
    .catch(function (err) {
        console.error('Aieee..., il y a une erreur dans RequeteComfirm() !', err.statusText)
    });
}