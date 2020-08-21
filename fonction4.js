let XHR = new XMLHttpRequest()
let url = "http://localhost:3000/api/cameras"

XHR.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let catalogue_camera = JSON.parse(this.responseText)

        console.log(catalogue_camera)
        var liste_JSON = localStorage.getItem('liste')
        var liste = JSON.parse(liste_JSON)
        console.log("liste : " + liste)
        
        var panier = []
        liste.forEach(camera => {
            var id = camera
            console.log("id : " + id)
            var elt = []
            catalogue_camera.forEach(element => {
                //console.log("element : " + element)
                if (id == element['_id']) {
                    elt.push(element['name'])
                    elt.push(element['price'])
                    panier.push(elt)
                }
            })
        });        
        tableau(panier)
    }
}

XHR.open("GET", url, true);
XHR.send();

function tableau(elt) {
    let tbody = document.querySelector('tbody')
    var liste_JSON = localStorage.getItem('liste')
    var liste = JSON.parse(liste_JSON)

    console.log("nom : "+ elt[0])
    console.log("prix : "+ elt[1])

    //for (let ref in liste) {
        DessineCarteCamera(tbody, elt)
    //}
} 
/*<tr>
    <td>Zurss 50S</td>
    <td>60mm 2.8</td>
    <td>300 E</td>
    <td>Bouton Retirer du panier</td>
</tr>*/

function DessineCarteCamera(tbody, panier) {
    //if (!panier.length < 1) {
    if (panier != null && panier.length > 0) {


        for (let index = 0; index < panier.length; index++) {
            //const element = array[index];
            
        
            let elementTr = document.createElement('tr')
            let elementTd1 = document.createElement('td')
            let elementId1 = document.createTextNode(panier[index][0])
            elementTd1.appendChild(elementId1)

            let elementTd2 = document.createElement('td')
            let elementPrix = document.createTextNode(panier[index][1])
            elementTd2.appendChild(elementPrix)
        
            elementTr.appendChild(elementTd1)
            elementTr.appendChild(elementTd2)
        
            tbody.appendChild(elementTr)
        }
    }

}