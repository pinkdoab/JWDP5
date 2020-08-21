let $_GET = [];
let parts = window.location.search.substr(1).split("&");
console.log(parts)
for (let i = 0; i < parts.length; i++) {
    let temp = parts[i].split("=");
    $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
}

let XHR = new XMLHttpRequest()
let url = "http://localhost:3000/api/cameras/" + $_GET['id']
XHR.open("GET", url, true);
XHR.send();

XHR.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let camera = JSON.parse(this.responseText)
        let section = document.querySelector('section')
        AfficheCarteCameraGrandFormat(section, camera)
    }
}

function AfficheCarteCameraGrandFormat(section, camera) {

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

    let elementPrice = document.createElement('p')                  //              <p class="card-text">price</p>
    elementPrice.className = 'card-text'
    let nomPrice = document.createTextNode(camera['price'] + '€')
    elementPrice.appendChild(nomPrice)
    elementDivCardBody.appendChild(elementPrice)

    section.appendChild(elementDivCol)
}

