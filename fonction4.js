let XHR = new XMLHttpRequest()
let url = "http://localhost:3000/api/cameras"

XHR.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let catalogue_camera = JSON.parse(this.responseText)

        console.log(catalogue_camera)
        var liste_JSON = localStorage.getItem('liste3')
        var liste = JSON.parse(liste_JSON)
        console.log(liste)
        
        var id = liste[0]
        //console.log(id)
        var elt = []
        catalogue_camera.forEach(element => {
            //console.log(element)
            if (id == element['_id']) {
                elt.push(element['name'])
                elt.push(element['price'])
            }
        })
        console.log(elt)
        tableau(elt)

    }
}

XHR.open("GET", url, true);
XHR.send();



function tableau(elt) {
    let tbody = document.querySelector('tbody')
    var liste_JSON = localStorage.getItem('liste3')
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

function DessineCarteCamera(tbody, liste) {
    //if (!liste.length < 1) {
    if (liste != null && liste.length > 0) {


        for (let index = 0; index < liste.length; index++) {
            //const element = array[index];
            
        
            let elementTr = document.createElement('tr')
            let elementTd = document.createElement('td')
            let elementId = document.createTextNode(liste[0])
            elementTd.appendChild(elementId)
        
            elementTr.appendChild(elementTd)
        
            tbody.appendChild(elementTr)
        }
    }

}