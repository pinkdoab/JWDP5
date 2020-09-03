EffaceStockageLocal = function() {
    if (JSON.parse(localStorage.getItem('confirmation'))) {         // TEST : Efface le localstorage si la commande est passé
        localStorage.clear();
    }
}