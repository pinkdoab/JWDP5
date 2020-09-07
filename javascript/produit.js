/* _______________________________________________
    Requête demandant un produit défini par un id

    id est passé par URL de index.html à produit.html et récupéré dans idUrl() pour faire la requête
    exemple :   URL = file:///Users/pink01/Documents/git/JWDP5/pages/produit.html?id=5be1ed3f1c9d44000030b061
                donc idUrl() = 5be1ed3f1c9d44000030b061
                puis faireRequete('GET', 'http://localhost:3000/api/cameras/5be1ed3f1c9d44000030b061'

    en cas de succés de la requête, création dynamique du menu des Objectifs photos puis Affichage de la carte du produit
*/
requeteProduit = function() {
    faireRequete('GET', 'http://localhost:3000/api/cameras/' + idUrl())
    .then(function (produit) {                                          // requête faireRequete() réussie
        CreaMenuOption(JSON.parse(produit))
        AfficheCarteCameraGrandFormat(JSON.parse(produit))
    })
    .catch(function (err) {                                             // requête faireRequete() ratée
        console.error('Aieee..., il y a une erreur dans requeteProduit() !', err.statusText)
    });
}
/* 
    Action à faire en cas de click sur le bouton d'envoi vers la panier dans produit.html
    
    s'il n'existe pas de panier, création d'un panier par contre si le panier existe ajout d'un produit (l'id est récupéré dans l'URL venant de index.html)
    Attention le bouton n'est pas accessible si le produit n'est pas personnalisé
*/
const boutonChoixProduit = document.getElementById('boutonChoixProduit')
if (boutonChoixProduit){                                                // TEST si le bouton existe
    boutonChoixProduit.addEventListener('click', event => {
        let panier
        if (!localStorage.getItem('panierLocal')) {                     // TEST si le panier existe
            panier = []
        } else {
            panier = JSON.parse(localStorage.getItem('panierLocal'))
        }
        panier.push(idUrl())
        localStorage.setItem("panierLocal",JSON.stringify(panier))
    })
}
// ________________________________________________________________
// Affiche un produit sous forme de grande carte
function AfficheCarteCameraGrandFormat(camera) {

    let elementDivCol = document.createElement('div')               //  <div class="col-8 align-self-center">
    elementDivCol.className = 'col-12 col-md-12'

    let elementDivCard = document.createElement('div')              //      <div class="card">
    elementDivCard.className = 'card'
    elementDivCol.appendChild(elementDivCard)

    let elementImg = document.createElement('img')                  //          <img class="card-img-top" src="images/logo.png">
    elementImg.className = 'card-img-top'
    elementImg.setAttribute("src", camera['imageUrl']);
    elementDivCard.appendChild(elementImg)

    let elementDivCardBody = document.createElement('div')          //          <div class="card-body">
    elementDivCardBody.className = 'card-body'
    elementDivCard.appendChild(elementDivCardBody)    

    let elementH2 = document.createElement('h2')                    //              <h2 class="card-title">Name</h5>
    elementH2.className = 'card-title'
    let nomH2 = document.createTextNode(camera['name'])
    elementH2.appendChild(nomH2)
    elementDivCardBody.appendChild(elementH2)

    let elementH5 = document.createElement('h5')                    //              <h5 class="card-title">Objectif</h5>
    elementH5.className = 'card-title'

    let motif = /.*obj.*/ig                                         // a un motif 'obj=XXXXX' ?
    //let menuNb
    if (motif.test(window.location.search)) {                       // TEST si un objectif photo est associé au produit, il l'affiche dans la carte
        let motif = /[^.*obj=]$/ig
        let menuNb = motif.exec(window.location.search)                 // retourne l'index du menu objectif
        let boutonChoixProduit = document.getElementById('boutonChoixProduit')
        boutonChoixProduit.classList.remove("disabled")                 // Affiche le bouton "Enregistrez..." 
        boutonChoixProduit.innerHTML = 'Enregistrez ce produit dans votre panier' // Change le message du bouton

        let nomH5 = document.createTextNode(camera['lenses'][menuNb])   // Affiche l'objectif
        elementH5.appendChild(nomH5)
        elementDivCardBody.appendChild(elementH5)
    }

    let elementCommentaire = document.createElement('p')            //              <p class="card-text">description</p>
    elementCommentaire.className = 'card-text'
    let nomCom = document.createTextNode(camera['description'])
    elementCommentaire.appendChild(nomCom)
    elementDivCardBody.appendChild(elementCommentaire)


    let elementPrice = document.createElement('p')                  //              <p class="card-text">price €</p>
    elementPrice.className = 'card-text'
    let prixEuro = camera['price']/100
    let nomPrice = document.createTextNode(prixEuro + ' €')
    elementPrice.appendChild(nomPrice)
    elementDivCardBody.appendChild(elementPrice)

    document.getElementById('grandeCarte').appendChild(elementDivCol)
}
// ________________________________________________________________
/*
    Affiche le menu des Objectifs photo dans la page "produit.html"
*/
function CreaMenuOption(produit) {
    if (produit.length == 0) {                                                                  // test
        throw 'produit.js : produit vide'
    }
    let elementChoix = []
    if (produit['lenses'].length == 0) {
        throw 'produit.js : produit[\'lenses\'] vide'
    }                                                                                           // test
    for (let index = 0; index < produit['lenses'].length; index++) {
        elementChoix = document.createElement('a')
        elementChoix.className = 'dropdown-item'
        elementChoix.id = 'menu' + index
        elementChoix.setAttribute('href', 'produit.html' + "?id=" + produit['_id'] + '?obj=' + index)
        elementChoix.appendChild(document.createTextNode(produit['lenses'][index]))

        document.querySelector('.menu_objectif').appendChild(elementChoix)
    }
}
// ________________________________________________________________