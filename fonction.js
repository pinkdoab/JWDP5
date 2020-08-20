let XHR = new XMLHttpRequest()
let url = "http://localhost:3000/api/cameras"

XHR.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let catalogue_camera = JSON.parse(this.responseText)
        DessineCatalogueCamera(catalogue_camera)
    }
}

XHR.open("GET", url, true);
XHR.send();


function DessineCatalogueCamera(catalogue_camera) {
    //console.log(catalogue_camera);
    let section = document.querySelector('section')
    for (let ref in catalogue_camera) {
        DessineCarteCamera(section,  catalogue_camera[ref])
    }
}

function DessineCarteCamera(section, camera) {

    /*<div class="col-4" style="padding: 10px;">
        <div class="card">
            <img class="card-img-top" src="images/logo.png" alt="">
            <div class="card-body">
                <h5 class="card-title">Name</h5>
                <p class="card-text">price</p>
                <a href="produit.html" class="stretched-link"></a>
            </div>
        </div>
    </div>*/

    let elementDivCol = document.createElement('div')
    elementDivCol.className = 'col-4'
    elementDivCol.setAttribute("style", "padding: 10px;");

    let elementDivCard = document.createElement('div')
    elementDivCard.className = 'card'

    let elementImg = document.createElement('img')
    elementImg.className = 'card-img-top'
    elementImg.setAttribute("src", camera['imageUrl']);

    let elementDivCardBody = document.createElement('div')
    elementDivCardBody.className = 'card-body'    

    let elementH5 = document.createElement('h5')
    elementH5.className = 'card-title'
    let nomH5 = document.createTextNode(camera['name'])
    elementH5.appendChild(nomH5)

    let elementPrice = document.createElement('p')
    elementPrice.className = 'card-text'
    let nomPrice = document.createTextNode(camera['price'] + '€')
    elementPrice.appendChild(nomPrice)

    let elementLien = document.createElement('a')
    elementLien.className = 'stretched-link'
    let nomlien = document.createTextNode(camera['price'])
    elementLien.setAttribute('href', "produit.html?id=" + camera['_id'])


    elementDivCol.appendChild(elementDivCard)
    elementDivCard.appendChild(elementImg)
    elementDivCard.appendChild(elementDivCardBody)    
    elementDivCardBody.appendChild(elementH5)
    elementDivCardBody.appendChild(elementPrice)
    elementDivCardBody.appendChild(elementLien)

    section.appendChild(elementDivCol)
}
