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
// Array pour afficher le panier
AffichePanier = function(page, catalogue_JSON) {
    let panier = []
    let panierLocal = JSON.parse(localStorage.getItem('panierLocal'))
    console.log("panierlocal : " + panierLocal)
    panierLocal.forEach(eltcamera => {
        let motif = /(.*)\?obj=(.)/ig
        result = motif.exec(eltcamera)
        console.log("eltcamera : " + result[1])
        console.log("obj : " + result[2])
        console.log("catalogue_JSON : " + catalogue_JSON)

        catalogue_JSON.forEach(element => {
            console.log("element._id : " + element._id)
            console.log("element.name : " + element.name)
            console.log("element.price : " + element.price)
            console.log("result[1] : " + result[1])
            if (element._id == result[1]) {
                let cam = []
                cam.push(element._id)
                cam.push(element.name)
                cam.push(element.price)
                //cam.push(element['lenses'][obj])
                panier.push(cam)
            }
        })
        console.log("panier2 : " + panier)

    })
    AffichePanier2(panier, page) 

    /*if (panierLocal != null && panierLocal != 0 ) {                     // TEST si le panier existe et n'est pas vide
        panierLocal.forEach(eltcamera => {
            let motif = /.*obj.*/ /*ig
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
                    panier.push(cam)
                }
            })
        })
        AffichePanier2(panier, page)
    } else {
        console.log("Panier vide")
    }*/
}
function AffichePanier2(panier, page) {
    
    let boutonEffaceProduit
    let total = 0
    if (panier != null && panier.length > 0) {                                          // TEST si le panier existe et non vide 
        for (let index = 0; index < panier.length; index++) {        
            let elementTr = document.createElement('tr')

            let elementTd1 = document.createElement('td')
            let elementId1 = document.createTextNode(panier[index][0])
            elementTd1.appendChild(elementId1)
            elementTr.appendChild(elementTd1)

            let elementTd2 = document.createElement('td')
            let element = document.createTextNode(panier[index][2])
            elementTd2.appendChild(element)
            elementTr.appendChild(elementTd2)

            let elementTd3 = document.createElement('td')
            let prix = panier[index][1] /100 + ' €'
            let elementPrix = document.createTextNode(prix)
            elementTd3.appendChild(elementPrix)
            elementTr.appendChild(elementTd3)

            if (page == 'panier' ) {                                        // TEST  n'affiche pas les bouton sur la page confirmation
                let elementTd4 = document.createElement('td')
                let bouton = document.createElement('button')               //  <div class="col-8 align-self-center">
                bouton.className = 'btn btn-primary interactiveBouton'
                let idBouton = "idBouton" + index
                bouton.id = idBouton
                let textebouton = document.createTextNode("Effacer le produit")
                bouton.appendChild(textebouton)
                elementTd4.appendChild(bouton)
                elementTr.appendChild(elementTd4)                       
            }

            let tbody = document.querySelector('tbody')
            tbody.appendChild(elementTr)
            total += panier[index][1]
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