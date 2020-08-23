let Get = function (url) {
    let XHR = new XMLHttpRequest()

    XHR.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let catalogue_JSON = JSON.parse(this.responseText)
            AfficheCatalogue(catalogue_JSON)
        }
    }
    XHR.open("GET", url, true);
    XHR.send();   
}
// _____________________________________________________________________

let Get2 = function (url) {
    let XHR = new XMLHttpRequest()

    XHR.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let catalogue_JSON = JSON.parse(this.responseText)
            CreaMenuLenses(catalogue_JSON)
            AfficheCarteCameraGrandFormat(catalogue_JSON)         
        }
    }
    XHR.open("GET", url, true);
    XHR.send();   
}
// _____________________________________________________________________

let Get3 = function (url) {
    let XHR = new XMLHttpRequest()

    XHR.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let catalogue_JSON = JSON.parse(this.responseText)
            //console.log('catalogue_JSON : ' + catalogue_JSON)
    
            var liste = JSON.parse(localStorage.getItem('liste'))
            console.log("liste : " + liste)
            
            var panier = []
            if (liste) {
                liste.forEach(eltcamera => {

                    //console.log("eltcamera : " + eltcamera)

                    let motif = /.*obj.*/ig
                    let idModif = eltcamera
                    let obj = 0
                    if (motif.test(eltcamera)) {
                        let motif = /(.*)\?obj=(.)/ig
                        idModif = motif.exec(eltcamera)
                        //console.log("idModif : " + idModif[1])                    
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
                            //console.log("panier = : " + panier)
                        }
                    })
                });        
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

let Get4 = function (url) {
    let XHR = new XMLHttpRequest()
    console.log("erreur")
    XHR.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {
            console.log(JSON.parse(this.responseText))
        } else {
            console.log(this.status)
        }
    }
    let contact = {
        firstName : 'eeee',
        lastName : 'zzzzz',
        address : 'xxxxxx',
        city : 'qqqqqq',
        email : 'ffff@fff.fr'
    }
    let products = ["5be1ed3f1c9d44000030b061", "5be1ef211c9d44000030b062"]
    let objet = {
        contact,
        products
    }
    let objetRequest = JSON.stringify(objet);

    XHR.open("POST", url, true)
    //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    XHR.setRequestHeader("Content-Type", "application/json")
    XHR.send(objetRequest) 
}