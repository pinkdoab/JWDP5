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

const boutonValidation = document.getElementById('boutonComfirmCommande')
if (boutonValidation){
    boutonValidation.addEventListener('click', event => {
        event.preventDefault();
        console.log("envoi requete DonneesValidees")
        let contact = {
            firstName : 'eeee',
            lastName : 'zzzzz',
            address : 'xxxxxx',
            city : 'qqqqqq',
            email : 'ffff@fff.fr'
        }
        let products = ["5be1ed3f1c9d44000030b061", "5be1ef211c9d44000030b062"]
        let objet = {
            contact,
            products
        }
        let objetRequest = JSON.stringify(objet)
        DonneesValidees(objetRequest)
    })
}