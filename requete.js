//faireRequete('GET', 'http://localhost:3000/api/cameras')
//faireRequete('POST', 'http://localhost:3000/api/cameras/order', objetRequest)

function faireRequete (method, url, objetRequest) {
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
        CreaMenuOption(JSON.parse(produit))
        AfficheCarteCameraGrandFormat(JSON.parse(produit))
    })
    .catch(function (err) {
        console.error('Aieee..., il y a une erreur!', err.statusText)
    });
}
// _____________________________________________________________________
requetePanier = function() {
    let url = 'http://localhost:3000/api/cameras'
    faireRequete('GET', url)
    .then(function (catalogue) {
        let catalogue_JSON = (JSON.parse(catalogue))
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
    })
    .catch(function (err) {
        console.error('Aieee..., il y a une erreur!', err.statusText)
    });
}
// ___________________________________________________________
// fonction requete POST
RequeteComfirm = function(objetRequest) {
    faireRequete('POST', 'http://localhost:3000/api/cameras/order', objetRequest)
    .then(function(confirmation) {
        localStorage.setItem("confirmation",confirmation)
        document.location.href="file:///Users/pink01/Documents/git/JWDP5/confirmation.html";
    })
    .catch(function (err) {
        console.error('Aieee..., il y a une erreur!', err.statusText)
    });
}