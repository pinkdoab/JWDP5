let XHR = new XMLHttpRequest()
let url = "http://localhost:3000/api/cameras"

XHR.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let catalogue_camera = JSON.parse(this.responseText)
    }
}

XHR.open("GET", url, true);
XHR.send();




function tableau() {
    let tbody = document.querySelector('tbody')
    var liste_JSON = localStorage.getItem('liste3')
    var liste = JSON.parse(liste_JSON)
    console.log(liste)
    //for (let ref in liste) {
        DessineCarteCamera(tbody, liste)
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
            let elementId = document.createTextNode(liste[index])
            elementTd.appendChild(elementId)
        
            elementTr.appendChild(elementTd)
        
            tbody.appendChild(elementTr)
        }
    }

}