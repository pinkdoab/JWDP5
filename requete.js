function faireRequete (method, url) {
    return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
      xhr.open(method, url)
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: this.status,
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
      xhr.send()
    })
}
// _____________________________________________________________________

requeteCatalogue = function() {
    faireRequete('GET', 'http://localhost:3000/api/cameras')
    .then(function (catalogue) {
        AfficheCatalogue(JSON.parse(catalogue))
    })
    .catch(function (err) {
        console.error('Aieee..., il y a une erreur!', err.statusText)
    });
}
// _____________________________________________________________________
requeteProduit = function() {
    let motif = /.*id=(.*)\?obj=.*/ig
    let $_GET
    if (!motif.test(window.location.search)) {
        let motif = /.*id=(.*)/ig
        $_GET = motif.exec(window.location.search)        
    } else {
        let motif = /.*id=(.*)\?obj=.*/ig
        $_GET = motif.exec(window.location.search)       
    }
    let url = 'http://localhost:3000/api/cameras/' + $_GET[1]

    faireRequete('GET', url)
    .then(function (produit) {
        CreaMenuLenses(JSON.parse(produit))
        AfficheCarteCameraGrandFormat(JSON.parse(produit))
    })
    .catch(function (err) {
        console.error('Aieee..., il y a une erreur!', err.statusText)
    });
}
// _____________________________________________________________________
// Affiche tab panier
let Get3 = function (url) {
    let XHR = new XMLHttpRequest()

    XHR.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let catalogue_JSON = JSON.parse(this.responseText)
            var liste = JSON.parse(localStorage.getItem('panierLocal'))            
            var panier = []
            if (liste) {
                liste.forEach(eltcamera => {
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
                            panier.push(cam)
                        }
                    })
                })
                AffichePanier(panier)
            }
        } 
    }
    XHR.open("GET", url, true);
    XHR.send();
}
// ___________________________________________________________

/* Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 */

// fonction requete POST
DonneesValidees = (objetRequest) => {
    return new Promise((resolve) => {
        let request = new XMLHttpRequest();

        
        request.onreadystatechange = function() {
            console.log("DonneesValidees " + this.readyState + "   " + this.status);
            if(this.readyState == 4 && this.status == 201)
            {
                console.log(JSON.parse(this.responseText));
                resolve(JSON.parse(this.responseText))
                console.log("DonneesValidees3" + this.status);
            }
        };
        
        request.open("POST", "http://localhost:3000/api/cameras/order");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(objetRequest);
    });
};
// __________________________________________________________
function faireRequetePOST (method, url, objetRequest) {
    return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
      xhr.open(method, url)
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: this.status,
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
DonneesValidees2 = function(objetRequest) {
    console.log('objetRequest : ' + objetRequest)
    faireRequetePOST('POST', 'http://localhost:3000/api/cameras/order', objetRequest)
    .then(function(catalogue) {

        console.log(catalogue);
        //console.log("DonneesValidees3" + catalogue);
    })
    .catch(function (err) {
        console.error('Aieee..., il y a une erreur!', err.statusText)
    });
}