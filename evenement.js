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
        let liste = JSON.parse(localStorage.getItem('panierLocal'))
        if (liste != 0) {
            localStorage.clear();
            location.reload()
        }
    })
}

// _____________________________________________________________________
const boutonValidation = document.getElementById('boutonComfirmCommande')
if (boutonValidation){
    boutonValidation.addEventListener('click', event => {
        var liste = JSON.parse(localStorage.getItem('panierLocal'))
        if (liste != null && liste != 0 ) {
            event.preventDefault()
            let formValide = true

            motif = /^[a-zA-Z_-]+( [a-zA-Z_-]+)*$/
            let nom = document.getElementById("nom").value
            if (nom == '' || !motif.test(nom)) {
                formValide = false
                window.alert("Autorisé : des lettres, un seul espace entre chaque mot, un signe _ ou le signe -");
            }
            
            let contact = {
                firstName : nom,
                lastName : 'zzzzz',
                address : 'xxxxxx',
                city : 'qqqqqq',
                email : 'ffff@fff.fr'
            }

            let prod = []
            let a
            liste.forEach(element => {
                a = element.split("?")
                prod.push(a[0])
            });
            let products = prod
            let objet = {
                contact,
                products
            }
            if (formValide == true) {
                let objetRequest = JSON.stringify(objet)
                RequeteComfirm(objetRequest)
            }
        }
    })
}