/* _______________________________________________________________________________________
Affiche le catalogue de produits et efface le localStorage si une commande est déjà passée

    Données retournées : un Array contenant des objets JSON avec les données suivantes :
        name
        price
        description
        lenses (contient un Array de noms d'objectifs)
        imageUrl

*/
requeteCatalogue = function() {
    faireRequete('GET', 'http://localhost:3000/api/cameras')
    .then(function (catalogue) {                                        // requête faireRequete() réussie
        EffaceLocalStokage()
        AfficheCarteCameraPetitFormat(JSON.parse(catalogue))
    })
    .catch(function (err) {                                             // requête faireRequete() ratée
        console.error('Aieee..., il y a une erreur dans requeteCatalogue() !', err.statusText)   // retour KO
        console.error(err)
    });
}
/* _______________________________________________________________________________________
Efface le localStorage
*/
EffaceLocalStokage = function() {
    if (JSON.parse(localStorage.getItem('confirmation'))) {         // TEST : Efface le localstorage si la commande est passé
        console.log("Une commande est déjà passé donc le panier est vidé")
        localStorage.clear();
    } else {
        console.log("Une nouvelle commande peut commencer")
    }
}
/* _______________________________________________________________________________________
Affiche les produits sous forme de petite carte
*/
function AfficheCarteCameraPetitFormat(catalogue_JSON) {
    if (catalogue_JSON.length == 0) {                               // test erreur si le catalogue est vide
        throw 'index.js : catalogue_JSON vide'
    }
    for (let indexCamera in catalogue_JSON) {
        let camera = catalogue_JSON[indexCamera]

        let elementDivCol = document.createElement('div')           //  <div class="col-12 col-md-4 carte_padding">
        elementDivCol.className = 'col-12 col-md-4 carte_padding'

        let elementDivCard = document.createElement('div')          //      <div class="card">
        elementDivCard.className = 'card'
        elementDivCol.appendChild(elementDivCard)

        let elementImg = document.createElement('img')              //          <img class="card-img-top" src="images/logo.png">
        elementImg.className = 'card-img-top'
        elementImg.setAttribute("src", camera['imageUrl']);
        elementDivCard.appendChild(elementImg)

        let elementDivCardBody = document.createElement('div')      //          <div class="card-body">
        elementDivCardBody.className = 'card-body'
        elementDivCard.appendChild(elementDivCardBody)    

        let elementH5 = document.createElement('h5')                //              <h5 class="card-title">Name</h5>
        elementH5.className = 'card-title'
        let nomH5 = document.createTextNode(camera['name'])
        elementH5.appendChild(nomH5)
        elementDivCardBody.appendChild(elementH5)

        let elementPrice = document.createElement('p')              //              <p class="card-text">price</p>
        elementPrice.className = 'card-text'
        let nomPrice = document.createTextNode(camera['price']/100 + ' €')
        elementPrice.appendChild(nomPrice)
        elementDivCardBody.appendChild(elementPrice)

        let elementLien = document.createElement('a')               //              <a class="stretched-link" href="produit.html?id=123456789"></a>
        elementLien.className = 'stretched-link'
        elementLien.setAttribute('href', "pages/produit.html?id=" + camera['_id'])
        elementDivCardBody.appendChild(elementLien)

        document.getElementById('petiteCarte').appendChild(elementDivCol)
    }
}