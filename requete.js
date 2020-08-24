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
            //console.log("liste : " + liste)
            
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

let Get4444 = function (url) {
    let XHR = new XMLHttpRequest()
    console.log("erreur")
    XHR.onreadystatechange = function() {
        console.log("onreadystatechange")
        if (this.readyState == 4 && this.status == 201) {
            console.log(JSON.parse(this.responseText))
            //console.log(this.responseText)
        } else {
            console.log(this.readyState + "   " + this.status)
        }
    }


    XHR.open("POST", url, true)
    //XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    XHR.setRequestHeader("Content-Type", "application/json")
    XHR.send(objetRequest) 
}

// fonction requete POST
DonneesValidees = (objetRequest) => {
    //console.log(objetRequest);
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
        
        //request.open("GET", "http://localhost:3000/api/cameras");
        request.open("POST", "http://localhost:3000/api/cameras/order");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(objetRequest);
    });
};