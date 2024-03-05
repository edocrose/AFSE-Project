var urlParams = new URLSearchParams(window.location.search);
    
    var username = urlParams.get("username");
    var utenti = localStorage.getItem('utenti');
    var json = JSON.parse(utenti);
    var data = null;
    for(var i = 0; i < json.length; i++){
        if(json[i].username == username){
            data = json[i];
            break;
        }
    }


const usernameElement = document.getElementById('username');
const emailElement = document.getElementById('email');
const passwordElement = document.getElementById('password');
const superheroElement = document.getElementById('superhero');
const popup = document.querySelector(".popupElimina");
const overlay = document.querySelector(".overlay");

usernameElement.value=username;
emailElement.value=data.email;
passwordElement.value=data.password;
superheroElement.value=data.superhero;

function modifica(){
    window.location.href = "modifica_dati.html?username="+username;
};

function apriPopupElimina(){
    popup.innerHTML = `
                <h2>Attenzione!</h2>
                <p>Stai cercando di eliminare questo account ne sei sicuro?</p>
                <button class="conferma" onclick="elimina()">Conferma</button>
                <button class="annulla" onclick="chiudiPopup()">Annulla</button>`
    popup.classList.add("open-popup")
    overlay.classList.add("open");
}

function elimina(){
    
    //rimuovo gli scambi dell'utente
    var jsonS = localStorage.getItem('scambi');
    var scambi = JSON.parse(jsonS);
    for(let j = 0 ;j<scambi.length;j++){
        if(scambi[j].utenteRichiedente == username){
            scambi.splice(j, 1);
        }
    }

    var modS = JSON.stringify(scambi);
    localStorage.setItem('scambi', modS);

    //rimuovo utente
    var jsonU = localStorage.getItem('utenti');
    var utenti = JSON.parse(jsonU);
    for(var i = 0; i < utenti.length; i++){
        if(utenti[i].username == username){
            utenti.splice(i, 1);
            break;
        }
    }

    var modU = JSON.stringify(utenti);
    localStorage.setItem('utenti', modU);
    overlay.classList.remove("open");
    popup.classList.remove("open-popup")
    window.location.href="login.html";
    
};

function chiudiPopup() {
    overlay.classList.remove("open");
    popup.classList.remove("open-popup")
    window.location.href = "dati_utente.html?username=" + username;
}



