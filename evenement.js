    const boutonChoixProduit = document.getElementById('boutonChoixProduit')
    if (boutonChoixProduit){
        boutonChoixProduit.addEventListener('click', event => {
            let catalogueProduit = []
            if(localStorage.getItem('liste')) {
                catalogueProduit = JSON.parse(localStorage.getItem('liste'))
            }
            catalogueProduit.push($_GET)
            localStorage.setItem("liste",JSON.stringify(catalogueProduit))
        })
    }
    

    const boutonEffacePanier2 = document.getElementById('boutonEffacePanier')
    if (boutonEffacePanier2){
        boutonEffacePanier2.addEventListener('click', event => {				
            localStorage.clear();
            window.location.reload();
        })
    }