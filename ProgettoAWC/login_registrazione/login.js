function redirectToHome() {
    var username = document.getElementById('loginUsername').value;
    var utenti = localStorage.getItem('utenti');
    var json = JSON.parse(utenti);
    var data = null;
    for(var i = 0; i < json.length; i++){
        if(json[i].username == username){
            data = json[i];
            break;
        }
    }

    window.location.href = "../home/home.html?username="+data.username;
}

function loginFunc(e){
    event.preventDefault();

    var utenti = caricaUtenti()
    var username = document.getElementById('loginUsername').value;
    var password = document.getElementById('loginPassword').value;

    var user = {
        'username': username,
        'password': password,
    }

    if (controllaEsistenza(user, utenti)) {
        if (controllaPassword(user, utenti)) {
            redirectToHome();
        } else {
            alert('Password errata')
        }
    } else {
        alert('Utente non esistente')
    }
}

function controllaPassword(newUtente, utenti) {
    var risultato = utenti.find(user => {
        return user.username == newUtente.username && user.password == newUtente.password
    })

    if (risultato != undefined) {
        return true
    } else {
        return false
    }
}

function controllaEsistenza(newUtente, utenti) {
    var risultato = utenti.find(user => user.username == newUtente.username)

    if (risultato != undefined) {
        return true
    } else {
        return false
    }
}

// Gestione del login
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    loginFunc();
    event.target.reset();
});

function caricaUtenti() {
    var utenti = []

    if (window.localStorage.getItem('utenti') != null) {
        utenti = JSON.parse(
            window.localStorage.getItem('utenti')
        )
    }

    return utenti
}