//funzione che riporta ai dati utente mantenendo i dati di login
// DA USARE NEI FILE FUORI DALLA CARTELLA LOGIN

var urlParams = new URLSearchParams(window.location.search);
var username = urlParams.get("username");

function getData(){
    window.location.href = "login_registrazione/dati_utente.html?username="+username;
}

function getData2(){
    window.location.href = "../login_registrazione/dati_utente.html?username="+username;
}

//funzione che riporta ai dati utente mantenendo i dati di login
// DA USARE NEI FILE DENTRO DALLA CARTELLA LOGIN
function getDataLogin(){
    window.location.href = "dati_utente.html?username="+username;
}

//funzione che riporta alla home mantenendo i dati di login
function getDataHome(){
    window.location.href = "home.html?username="+username;
}

function getDataHome2(){
    window.location.href = "../home/home.html?username="+username;
}


function getDataNegozio(){
    window.location.href = "negozio/negozio.html?username="+username;
}

function getDataNegozio2(){
    window.location.href = "../negozio/negozio.html?username="+username;
}

function getDataScambia(){
    window.location.href = "scambia/mercato.html?username="+username;
}

function getDataScambia2(){
    window.location.href = "../scambia/mercato.html?username="+username;
}

function getDataScambia3(){
    window.location.href = "../scambia/scambia.html?username="+username;
}

function getDataScambia4(){
    window.location.href = "../scambia/proposte.html?username="+username;
}

var utenti = localStorage.getItem('utenti');
var json = JSON.parse(utenti);
var user = null;
for (var i = 0; i < json.length; i++) {
    if (json[i].username == username) {
        user = json[i];
        credito(user.credits);
        break;
    }
}
var mod = JSON.stringify(json);
localStorage.setItem('utenti', mod);

function credito(credito) {
    var credtsContainer = document.querySelector('.contenitoreCredito')
    var credits = document.createElement('div')
    credits.classList.add('credito')
    credits.innerHTML = 'Credito: ' + credito
    var logoAv = document.createElement('img');
    logoAv.classList.add('avLogo')
    logoAv.src = '../immagini/logoAv.png'
    credtsContainer.appendChild(credits)
    credtsContainer.appendChild(logoAv)
}


