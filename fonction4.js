function tableau() {
    let tbody = document.querySelector('tbody')
    var liste_JSON = localStorage.getItem('liste3')
    var liste = JSON.parse(liste_JSON)
    console.log(liste)

    DessineCarteCamera(tbody, liste)
} 
/*<tr>
    <td>Zurss 50S</td>
    <td>60mm 2.8</td>
    <td>300 E</td>
    <td>Bouton Retirer du panier</td>
</tr>*/

function DessineCarteCamera(tbody, liste) {
    let elementTr = document.createElement('tr')
    let elementTd = document.createElement('td')
    let elementId = document.createTextNode(liste)
    elementTd.appendChild(elementId)

    elementTr.appendChild(elementTd)

    tbody.appendChild(elementTr)
}