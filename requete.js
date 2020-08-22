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
            console.log('catalogue_JSON : ' + catalogue_JSON)
    
            var liste_JSON = localStorage.getItem('liste')
            var liste = JSON.parse(liste_JSON)
            console.log("liste : " + liste)
            
            var panier = []
            if (liste) {
                liste.forEach(camera => {
                    var id = camera
                    console.log("id : " + id)
                    var elt = []
                    catalogue_JSON.forEach(element => {
                        //console.log("element : " + element)
                        if (id == element['_id']) {
                            elt.push(element['name'])
                            elt.push(element['price'])
                            panier.push(elt)
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
