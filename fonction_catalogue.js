let XHR = new XMLHttpRequest()
let url = "http://localhost:3000/api/cameras"
XHR.open("GET", url, true);
XHR.send();

XHR.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let catalogue_JSON = JSON.parse(this.responseText)
        AfficheCatalogue(catalogue_JSON)
    }
}