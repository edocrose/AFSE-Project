const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];

function random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function trovaUtenti(){
    var utenti = localStorage.getItem('utenti');
    var json = JSON.parse(utenti);
    return json;
    
}

function trovaUtente() {
    var urlParams = new URLSearchParams(window.location.search);

    var username = urlParams.get("username");
    var utenti = localStorage.getItem('utenti');
    var json = JSON.parse(utenti);
    var data = null;
    for (var i = 0; i < json.length; i++) {
        if (json[i].username == username) {
            data = json[i];
            break;
        }
    }

    return data;
}

function controllaDoppie(mazzo, card){
    for(let i=0; i<mazzo.length; i++){
        if(card.id == mazzo[i].id){
            return true;
        }
    }
    return false;
}

document.addEventListener("DOMContentLoaded", function () {
    const pacchetti = document.querySelectorAll(".descrizione");
    var utente = trovaUtente();

    pacchetti.forEach(function (pacchetto) {
        const priceSpan = pacchetto.querySelector(".price");
        const acquistaButton = pacchetto.querySelector(".acquista");

        //funzione acquista
        acquistaButton.addEventListener("click", async () =>{
            const packPrice = priceSpan.textContent;
            if (utente.credits >= packPrice) {
                var urlParams = new URLSearchParams(window.location.search);
                var username = urlParams.get("username");
                var utenti = localStorage.getItem('utenti');
                var json = JSON.parse(utenti);
                var user = null;
                for (var i = 0; i < json.length; i++) {
                    if (json[i].username == username) {
                        //PARTE PER CREDITI
                        json[i].credits -= packPrice
                        user = json[i];
                        //PARTE PER LE CARTE DEL PACK
                        var offset = random(0, 1462);
                        var limit = 100;
                        const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&limit=${limit}&offset=${offset}`;
                        var lista = [];
                        const response = await fetch(url);
                        const jsonData = await response.json();
                        var data = jsonData.data.results;
                        for(let i=0; i<data.length; i++){
                            lista.push(data[i]);
                        }
                        var pack = [];
                        for(let i=0; i<5; i++){
                            var card = lista[random(0,99)];
                            if (controllaDoppie(user.carte, card)){
                                user.doppie.push(card);
                            }
                            user.carte.push(card);
                            pack.push(card);
                        }
                        break;
                    }
                }
                var pacchetto = JSON.stringify(pack);
                localStorage.setItem("pacchetto", pacchetto);
                var mod = JSON.stringify(json);
                localStorage.setItem('utenti', mod);
                alert("Punti rimanenti: "+ user.credits);
                window.location.href = "pacchetto.html?username="+username;
            } else {
                console.log("Punti insufficienti per l'acquisto")
            }
            
        });

    });
});

document.addEventListener("DOMContentLoaded", function () {
    const creditsQuantityButtons = document.querySelector(".credits .quantity-buttons");
    const creditsQuantitySpan = document.querySelector(".credits .quantity");
    const totalPriceSpan = document.querySelector(".credits .total-price");
    const compraCreditiButton = document.querySelector(".compraCrediti");

    let creditsQuantity = 1;
    const creditPrice = 1; // Cambia questo valore al prezzo di ciascun credito

    creditsQuantityButtons.addEventListener("click", function (event) {
        if (event.target.classList.contains("minus")) {
            if (creditsQuantity > 1) {
                creditsQuantity--;
            }
        } else if (event.target.classList.contains("plus")) {
            creditsQuantity++;
        }

        creditsQuantitySpan.textContent = creditsQuantity;
        updateTotalPrice();
    });

    compraCreditiButton.addEventListener("click", function(){
        var urlParams = new URLSearchParams(window.location.search);
        var username = urlParams.get("username");
        var json = trovaUtenti();
        var data = null;
        for (var i = 0; i < json.length; i++) {
            if (json[i].username == username) {
                data = json[i];
                break;
            }
        }
        var numero = updateTotalPrice();
        data.credits += numero;
        var mod = JSON.stringify(json);
        localStorage.setItem('utenti', mod);
        alert("Grazie! Ora hai " + data.credits + " crediti")
        window.location.href = "negozio.html?username="+username;
        
    })

    function updateTotalPrice() {
        const total = creditsQuantity * creditPrice;
        totalPriceSpan.textContent = total;
        return total;
    }
});

