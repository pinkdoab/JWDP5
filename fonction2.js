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
        AfficheCarteCameraGrandFormat(camera)
    }
}