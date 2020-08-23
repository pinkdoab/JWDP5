const boutonChoixProduit = document.getElementById('boutonChoixProduit')
if (boutonChoixProduit){
    boutonChoixProduit.addEventListener('click', event => {
        let catalogueProduit = []
        if(localStorage.getItem('liste')) {
            catalogueProduit = JSON.parse(localStorage.getItem('liste'))
        }      
        catalogueProduit.push($_GET)
        localStorage.setItem("liste",JSON.stringify(catalogueProduit))

        //console.log("listeModif : " + JSON.parse(localStorage.getItem('liste')))
    })
}

const boutonEffacePanier = document.getElementById('boutonEffacePanier')
if (boutonEffacePanier){
    boutonEffacePanier.addEventListener('click', event => {
        localStorage.clear();
        location.reload()
    })
}

const menuObjectif = document.getElementById('menuObjectif')
if (menuObjectif){
    menuObjectif.addEventListener('click', event => {
        location.reload()
    })
}

const boutonValidation = document.getElementById('boutonComfirmCommande')
if (boutonValidation){
    boutonValidation.addEventListener('click', event => {
        Get4('http://localhost:3000/api/cameras/order')
        console.log("envoi requete")
    })
}