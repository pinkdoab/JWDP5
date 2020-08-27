const boutonChoixProduit = document.getElementById('boutonChoixProduit')
if (boutonChoixProduit){
    boutonChoixProduit.addEventListener('click', event => {
        let panier
        if (!localStorage.getItem('panierLocal')) {
            panier = []
        } else {
            panier = JSON.parse(localStorage.getItem('panierLocal'))
        }
        let motif = /.*\?id=(.*)/ig
        let idModif = motif.exec(window.location.search)
        panier.push(idModif[1])
        localStorage.setItem("panierLocal",JSON.stringify(panier))
    })
}

// _____________________________________________________________________
const boutonEffacePanier = document.getElementById('boutonEffacePanier')
if (boutonEffacePanier){
    boutonEffacePanier.addEventListener('click', event => {
        event.preventDefault();
        localStorage.clear();
        location.reload()
    })
}

// _____________________________________________________________________
const boutonValidation = document.getElementById('boutonComfirmCommande')
if (boutonValidation){
    boutonValidation.addEventListener('click', event => {
        event.preventDefault();
        var nom = document.getElementById("nom").value;
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