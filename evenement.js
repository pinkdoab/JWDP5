const boutonChoixProduit = document.getElementById('boutonChoixProduit')
if (boutonChoixProduit){
    boutonChoixProduit.addEventListener('click', event => {

        let panier = JSON.parse(localStorage.getItem('panierLocal'))
        let motif = /.*\?id=(.*)/ig
        let idModif = motif.exec(window.location.search)
        panier.push(idModif[1])
        localStorage.setItem("panierLocal",JSON.stringify(panier))
        console.log("localStockage panierLocal : " + JSON.parse(localStorage.getItem('panierLocal')))
    })
}

const boutonEffacePanier = document.getElementById('boutonEffacePanier')
if (boutonEffacePanier){
    boutonEffacePanier.addEventListener('click', event => {
        event.preventDefault();
        localStorage.clear();
        location.reload()
    })
}

const boutonValidation = document.getElementById('boutonComfirmCommande')
if (boutonValidation){
    boutonValidation.addEventListener('click', event => {
        event.preventDefault();
        console.log("envoi requete DonneesValidees")
        var nom = document.getElementById("nom").value;
        console.log('Nom : ' + nom)
        let contact = {
            firstName : nom,
            lastName : 'zzzzz',
            address : 'xxxxxx',
            city : 'qqqqqq',
            email : 'ffff@fff.fr'
        }
        var liste = JSON.parse(localStorage.getItem('panierLocal'))
        console.log('liste : ' + liste)
        let prod = []
        let a
        liste.forEach(element => {
            a = element.split("?")
            prod.push(a[0])
        });
        console.log('prod : ' + prod)

        let products = prod
        console.log('products : ' + products)
        let objet = {
            contact,
            products
        }
        let objetRequest = JSON.stringify(objet)
        RequeteComfirm(objetRequest)
    })
}