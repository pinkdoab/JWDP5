//let elt = document.getElementById('test');
//elt.innerHTML = "<ul><li>Elément 1</li><li>Elément 2</li></ul>";

function titreHeader(jsonObj) {
    var myH1 = document.createElement('h1');
    myH1.textContent = jsonObj[0]['_id'];
    header.appendChild(myH1);
  
    //var myPara = document.createElement('p');
    //myPara.textContent = 'Hometown: ' + jsonObj['homeTown'] + jsonObj['formed'];
    //header.appendChild(myPara);
  }

