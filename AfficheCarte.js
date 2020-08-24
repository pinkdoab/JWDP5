/* Fonction permettant d'afficher sous forme de carte dans le DOM un produit "caméra" en JSON
Champ       Type
id          ObjectID
name        string
price       number
description string
imageUrl    string
*/

function AfficheCatalogue(catalogue_JSON) {
    for (let camera in catalogue_JSON) {
        AfficheCarteCameraPetitFormat(catalogue_JSON[camera])        
    }
}
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
    console.log(window.location.search)
    console.log(camera)

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

    let elementH2 = document.createElement('h2')                    //              <h2 class="card-title">Name</h5>
    elementH2.className = 'card-title'
    let nomH2 = document.createTextNode(camera['name'])
    elementH2.appendChild(nomH2)
    elementDivCardBody.appendChild(elementH2)

    let elementH5 = document.createElement('h5')                    //              <h5 class="card-title">Objectif</h5>
    elementH5.className = 'card-title'

    let motif = /.*obj.*/ig
    let menuNb
    if (motif.test(window.location.search)) {
        let motif = /[^.*obj=]$/ig
        menuNb = motif.exec(window.location.search)
        console.log(window.location.search)
        console.log(menuNb)
        localStorage.setItem("objectif",JSON.stringify(menuNb))
    }
    objectif = JSON.parse(localStorage.getItem('objectif'))
    console.log("objectif1 : " + objectif)

    let nomH5 = document.createTextNode(camera['lenses'][menuNb])
    elementH5.appendChild(nomH5)
    elementDivCardBody.appendChild(elementH5)


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

    let section = document.querySelector('section')
    section.appendChild(elementDivCol)
}

function AffichePanier(panier) {
    let total = 0
    if (panier != null && panier.length > 0) {
        for (let index = 0; index < panier.length; index++) {        
            let elementTr = document.createElement('tr')
            let elementTd1 = document.createElement('td')
            let elementId1 = document.createTextNode(panier[index][0])
            elementTd1.appendChild(elementId1)

            let elementTd2 = document.createElement('td')
            let element = document.createTextNode(panier[index][2])
            elementTd2.appendChild(element)

            let elementTd3 = document.createElement('td')
            let prix = panier[index][1] /100 + ' €'
            let elementPrix = document.createTextNode(prix)
            elementTd3.appendChild(elementPrix)
        
            elementTr.appendChild(elementTd1)
            elementTr.appendChild(elementTd2)
            elementTr.appendChild(elementTd3)

            let tbody = document.querySelector('tbody')
            tbody.appendChild(elementTr)

            total += panier[index][1]
            //console.log(total)
        }
    }
    let texte = document.createTextNode('Prix total : ' + total/100 + ' €')
    //console.log('texte = : ' + total)
    let h5 = document.querySelector('h5')
    h5.appendChild(texte)    

}

/*
<div id="menu_objectif" class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
    <a class="dropdown-item" href="#">Lentille A</a>
    <a class="dropdown-item" href="#">Lentille B</a>
    <a class="dropdown-item" href="#">Lentille C</a>
*/
function CreaMenuLenses(catalogue_JSON) {

    
    //console.log('liste Objectifs : ' + catalogue_JSON['lenses'])
    //console.log('liste Objectifs : ' + catalogue_JSON)

    let elementChoix = []    
    for (let index = 0; index < catalogue_JSON['lenses'].length; index++) {
        elementChoix = document.createElement('a')
        //elementChoix.id = 'objectif' + index
        elementChoix.className = 'dropdown-item'
        elementChoix.id = 'menu' + index
        elementChoix.setAttribute('href', 'produit.html' + "?id=" + catalogue_JSON['_id'] + '?obj=' + index)
        elementChoix.appendChild(document.createTextNode(catalogue_JSON['lenses'][index]))
        let menuObjectif = document.querySelector('.menu_objectif')
        menuObjectif.appendChild(elementChoix)
    }

}