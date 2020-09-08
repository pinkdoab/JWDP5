// ________________________________________________________________
/*
    Affiche dans le DOM de la page "confirmation.html", le nom et Id de la commande
*/
function AfficheIdCommande() {
    let id = JSON.parse(localStorage.getItem('confirmation'))
    document.getElementById('firstName').innerHTML = '<h3>' + id.contact.firstName + '</h3>'
    document.getElementById('idCommande').innerHTML =  '<h3>' + id.orderId + '</h3>'
}
// ________________________________________________________________