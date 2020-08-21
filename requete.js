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

let Get2 = function (url) {
    let XHR = new XMLHttpRequest()

    XHR.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let catalogue_JSON = JSON.parse(this.responseText)
            AfficheCarteCameraGrandFormat(catalogue_JSON)
        }
    }
    XHR.open("GET", url, true);
    XHR.send();   
}
