let XHR = new XMLHttpRequest()
let url = "http://localhost:3000/api/cameras"
XHR.open("GET", url, true);
XHR.send();

XHR.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let catalogue_JSON = JSON.parse(this.responseText)
        Catalogue(catalogue_JSON)
    }
}

function Catalogue(catalogue_JSON) {
    for (let camera in catalogue_JSON) {
        AfficheCarteCameraPetitFormat(catalogue_JSON[camera])        
    }
}

function AfficheCarteCameraPetitFormat(camera) {

    let section = document.querySelector('section')

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
    let nomPrice = document.createTextNode(camera['price'] + '€')
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

    section.appendChild(elementDivCol)
}
