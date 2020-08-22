function AfficheCatalogue(catalogue_JSON) {
    for (let camera in catalogue_JSON) {
        AfficheCarteCameraPetitFormat(catalogue_JSON[camera])        
    }
}
/* Fonction permettant d'afficher sous forme de carte dans le DOM un produit "caméra" en JSON
Champ       Type
id          ObjectID
name        string
price       number
description string
imageUrl    string
*/
function AfficheCarteCameraPetitFormat(camera) {



    let elementDivCol = document.createElement('div')           //  <div class="col-4" style="padding: 10px;">
    elementDivCol.className = 'col-4'
    elementDivCol.setAttribute("style", "padding: 10px;");

    let elementDivCard = document.createElement('div')          //      <div class="card">
    elementDivCard.className = 'card'

    let elementImg = document.createElement('img')              //          <img class="card-img-top" src="images/logo.png">
    elementImg.className = 'card-img-top'
    elementImg.setAttribute("src", camera['imageUrl']);

    let elementDivCardBody = document.createElement('div')      //          <div class="card-body">
    elementDivCardBody.className = 'card-body'    

    let elementH5 = document.createElement('h5')                //              <h5 class="card-title">Name</h5>
    elementH5.className = 'card-title'
    let nomH5 = document.createTextNode(camera['name'])
    elementH5.appendChild(nomH5)

    let elementPrice = document.createElement('p')              //              <p class="card-text">price</p>
    elementPrice.className = 'card-text'
    let prixEuro = camera['price']/100
    let nomPrice = document.createTextNode(prixEuro + ' €')
    elementPrice.appendChild(nomPrice)

    let elementLien = document.createElement('a')               //              <a class="stretched-link" href="produit.html?id=123456789"></a>
    elementLien.className = 'stretched-link'
    elementLien.setAttribute('href', "produit.html?id=" + camera['_id'])


    elementDivCol.appendChild(elementDivCard)
    elementDivCard.appendChild(elementImg)
    elementDivCard.appendChild(elementDivCardBody)    
    elementDivCardBody.appendChild(elementH5)
    elementDivCardBody.appendChild(elementPrice)
    elementDivCardBody.appendChild(elementLien)

    let section = document.querySelector('section')
    section.appendChild(elementDivCol)
}

function AfficheCarteCameraGrandFormat(camera) {

    let elementDivCol = document.createElement('div')               //  <div class="col-8 align-self-center">
    elementDivCol.className = 'col-8 align-self-center'

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

    let elementH5 = document.createElement('h5')                    //              <h5 class="card-title">Name</h5>
    elementH5.className = 'card-title'
    let nomH5 = document.createTextNode(camera['name'])
    elementH5.appendChild(nomH5)
    elementDivCardBody.appendChild(elementH5)

    let elementCommentaire = document.createElement('p')                  //              <p class="card-text">price €</p>
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

    let section = document.querySelector('section')
    section.appendChild(elementDivCol)
}

function AffichePanier(panier) {
    if (panier != null && panier.length > 0) {
        for (let index = 0; index < panier.length; index++) {        
            let elementTr = document.createElement('tr')
            let elementTd1 = document.createElement('td')
            let elementId1 = document.createTextNode(panier[index][0])
            elementTd1.appendChild(elementId1)

            let elementTd2 = document.createElement('td')
            let elementPrix = document.createTextNode(panier[index][1])
            elementTd2.appendChild(elementPrix)
        
            elementTr.appendChild(elementTd1)
            elementTr.appendChild(elementTd2)

            let tbody = document.querySelector('tbody')
            tbody.appendChild(elementTr)
        }
    }
}

/*
<div id="menu_objectif" class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
    <a class="dropdown-item" href="#">Lentille A</a>
    <a class="dropdown-item" href="#">Lentille B</a>
    <a class="dropdown-item" href="#">Lentille C</a>
*/
function CreaMenuLenses(catalogue_JSON) {
    console.log('liste Objectifs : ' + catalogue_JSON['lenses'])

    let elementChoix = []    
    for (let index = 0; index < catalogue_JSON['lenses'].length; index++) {
        elementChoix = document.createElement('a')
        elementChoix.className = 'dropdown-item'
        elementChoix.setAttribute('href', '#')
        elementChoix.appendChild(document.createTextNode(catalogue_JSON['lenses'][index]))
        let menuObjectif = document.querySelector('.menu_objectif')
        menuObjectif.appendChild(elementChoix)
    }
}