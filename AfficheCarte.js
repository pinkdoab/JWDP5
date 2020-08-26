// ________________________________________________________________
// Appel de TOUS les produits du catalogue JSON pour les afficher

function AfficheCatalogue(catalogue_JSON) {
    for (let camera in catalogue_JSON) {
        AfficheCarteCameraPetitFormat(catalogue_JSON[camera])        
    }
}
// ________________________________________________________________
// Affiche un produit sous forme de carte
function AfficheCarteCameraPetitFormat(camera) {

    let elementDivCol = document.createElement('div')           //  <div class="col-4" style="padding: 10px;">
    elementDivCol.className = 'col-4'
    //elementDivCol.setAttribute("style", "padding: 10px;");

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
    let prixEuro = camera['price']/100
    let nomPrice = document.createTextNode(prixEuro + ' €')
    elementPrice.appendChild(nomPrice)
    elementDivCardBody.appendChild(elementPrice)

    let elementLien = document.createElement('a')               //              <a class="stretched-link" href="produit.html?id=123456789"></a>
    elementLien.className = 'stretched-link'
    elementLien.setAttribute('href', "produit.html?id=" + camera['_id'])
    elementDivCardBody.appendChild(elementLien)

    let section = document.querySelector('section')
    section.appendChild(elementDivCol)
}

// ________________________________________________________________
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
        let boutonChoixProduit = document.getElementById('boutonChoixProduit')
        boutonChoixProduit.classList.remove("disabled")
        boutonChoixProduit.innerHTML = 'Enregistrez ce produit dans votre panier'

        let nomH5 = document.createTextNode(camera['lenses'][menuNb])
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

    let section = document.querySelector('section')
    section.appendChild(elementDivCol)
}
// ________________________________________________________________
function AffichePanier(panier) {
    let total = 0
    if (panier != null && panier.length > 0) {
        for (let index = 0; index < panier.length; index++) {        
            let elementTr = document.createElement('tr')

            let elementTd1 = document.createElement('td')
            let elementId1 = document.createTextNode(panier[index][0])
            elementTd1.appendChild(elementId1)
            elementTr.appendChild(elementTd1)

            let elementTd2 = document.createElement('td')
            let element = document.createTextNode(panier[index][2])
            elementTd2.appendChild(element)
            elementTr.appendChild(elementTd2)

            let elementTd3 = document.createElement('td')
            let prix = panier[index][1] /100 + ' €'
            let elementPrix = document.createTextNode(prix)
            elementTd3.appendChild(elementPrix)
            elementTr.appendChild(elementTd3)

            /*let elementTd4 = document.createElement('td')
            //<button id="boutonEffacePanier" class="btn btn-primary">Effacer le panier</button>
            let bouton = document.createElement('button')               //  <div class="col-8 align-self-center">
            bouton.className = 'btn btn-primary'
            let bouton = panier[index][1] /100 + ' €'
            let elementPrix2 = document.createTextNode(prix2)
            elementTd4.appendChild(elementPrix2)
            elementTr.appendChild(elementTd4)*/

            let tbody = document.querySelector('tbody')
            tbody.appendChild(elementTr)

            total += panier[index][1]
        }
        let texte = document.createTextNode('Prix total : ' + total/100 + ' €')
        let h5 = document.querySelector('h5')
        h5.appendChild(texte) 
    }
}
// ________________________________________________________________
function CreaMenuOption(catalogue_JSON) {
    let elementChoix = []    
    for (let index = 0; index < catalogue_JSON['lenses'].length; index++) {
        elementChoix = document.createElement('a')
        elementChoix.className = 'dropdown-item'
        elementChoix.id = 'menu' + index
        elementChoix.setAttribute('href', 'produit.html' + "?id=" + catalogue_JSON['_id'] + '?obj=' + index)
        elementChoix.appendChild(document.createTextNode(catalogue_JSON['lenses'][index]))

        document.querySelector('.menu_objectif').appendChild(elementChoix)
    }
}
// ________________________________________________________________
function AfficheIdCommande() {
    let id = JSON.parse(localStorage.getItem('confirmation'))
    document.querySelector('h4').innerHTML = id.orderId
}