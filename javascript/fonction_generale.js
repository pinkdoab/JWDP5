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
// ________________________________________________________________
// recherche id dans l'url
idUrl = function() {
    let params = new URLSearchParams(document.location.search);
    if (params.get('id') == null) {
        throw 'fonction_generale.js : paramètre Id manquant dans l\'url'
    }
    return params.get('id')
}
// ________________________________________________________________
// recherche obj dans l'url
objUrl = function(elt) {
    let params = new URLSearchParams(elt);
    if (params.get('obj') == null) {
        throw 'fonction_generale.js : paramètre obj manquant dans l\'url'
    }
    return params.get('obj')
}
// ________________________________________________________________
// Préparation d'un tableau pour afficher le panier
prepaPanier = function(page, catalogue_JSON) {
    let panier = []
    let panierLocal = JSON.parse(localStorage.getItem('panierLocal'))
    if (panierLocal != null && panierLocal != 0 ) {                     // TEST si le panier existe et n'est pas vide*/
        panierLocal.forEach(eltcamera => {
            result = /(.*)\?obj=(.)/ig.exec(eltcamera)
            catalogue_JSON.forEach(element => {
                if (element._id == result[1]) {
                    let cam = []
                    cam.push(element._id)
                    cam.push(element.name)
                    cam.push(element.price)
                    cam.push(element['lenses'][result[2]])
                    panier.push(cam)
                }
            })
        })
        console.log("panier A : " + panier[0])
        console.log("panier B : " + panier[1])
        AffichePanier(panier, page)
    } else {
        console.log("Panier vide")
    }
}
// ________________________________________________________________
// Affiche panier
function AffichePanier(panier, page) {
    let total = 0
    if (panier != null && panier.length > 0) {                                          // TEST si le panier existe et non vide 
        for (let index = 0; index < panier.length; index++) {        
            let elementTr = document.createElement('tr')

            let elementTd1 = document.createElement('td')
            let elementId1 = document.createTextNode(panier[index][0])
            elementTd1.appendChild(elementId1)
            elementTr.appendChild(elementTd1)

            let elementTd2 = document.createElement('td')
            let element = document.createTextNode(panier[index][3])
            elementTd2.appendChild(element)
            elementTr.appendChild(elementTd2)

            let elementTd3 = document.createElement('td')
            let elementPrix = document.createTextNode(panier[index][2] /100 + ' €')
            elementTd3.appendChild(elementPrix)
            elementTr.appendChild(elementTd3)

            if (page == 'panier') {                                        // TEST  n'affichera pas les bouton sur la page confirmation
                let elementTd4 = document.createElement('td')
                let bouton = document.createElement('button')               //  <div class="col-8 align-self-center">
                bouton.className = 'btn btn-primary interactiveBouton'
                //let idBouton = "idBouton" + index
                bouton.id = "idBouton" + index
                //bouton.id = idBouton
                let textebouton = document.createTextNode("Effacer le produit")
                bouton.appendChild(textebouton)
                elementTd4.appendChild(bouton)
                elementTr.appendChild(elementTd4)                       
            }

            let tbody = document.querySelector('tbody')
            tbody.appendChild(elementTr)
            total += panier[index][2]
        }

        let elementPrix = document.createElement('h5')
        let prix = document.createTextNode('Prix total : ' + total/100 + ' €')
        elementPrix.appendChild(prix)
        document.getElementById('affichePrix').appendChild(elementPrix)

        var theButtons = document.querySelectorAll('.interactiveBouton')
        for (let i = 0; i < theButtons.length; i++) {
            theButtons[i].addEventListener('click', function () {
                let liste = JSON.parse(localStorage.getItem('panierLocal'))
                if (liste != 0) {
                    liste.splice(theButtons[i].id.substring(8), 1)
                    localStorage.setItem("panierLocal",JSON.stringify(liste))
                    location.reload()
                }
            });
        }
    } else {
        throw 'AfficheCarte.js : panier est vide'                                                 // test
    }
}