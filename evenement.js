// Bouton "Enregistrer dans le panier" sur produit.html
const boutonChoixProduit = document.getElementById('boutonChoixProduit')
//boutonChoixProduit.classList.add("disabled")
//boutonChoixProduit.innerHTML = 'Enregistrez ce produit dans votre panier'

if (boutonChoixProduit){
    boutonChoixProduit.addEventListener('click', event => {


        /*let motif2 = /.*obj=(.*)/i
        if (motif2.test(window.location.search)) {
            let a = motif2.exec(window.location.search)
            console.log('obj : ' + a[1])
        }*/



        let panier = JSON.parse(localStorage.getItem('panierLocal'))
        let motif = /.*\?id=(.*)/ig
        let idModif = motif.exec(window.location.search)
        panier.push(idModif[1])
        localStorage.setItem("panierLocal",JSON.stringify(panier))
        console.log("localStockage panierLocal : " + JSON.parse(localStorage.getItem('panierLocal')))
    })
}

/*const menuPersonnalisation = document.getElementById('menuObjectif')
if (menuPersonnalisation){
    menuPersonnalisation.addEventListener('click', event => {
        //event.preventDefault();
        boutonChoixProduit.classList.remove("disabled")
        boutonChoixProduit.innerHTML = 'Enregistrez ce produit dans votre panier'

    })
}*/

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
        DonneesValidees2(objetRequest)
    })
}