function redirectToHome() {

    var username = document.getElementById('username').value;
    console.log(username);
    var utenti = localStorage.getItem('utenti');
    console.log(utenti);
    var json = JSON.parse(utenti);
    var data = json[json.length - 1];

    window.location.href = "../home/home.html?username="+data.username;
}

function caricaUtenti() {
    var utenti = []

    if (window.localStorage.getItem('utenti') != null) {
        utenti = JSON.parse(
            window.localStorage.getItem('utenti')
        )
    }

    return utenti
}

// Funzione per convalidare una mail utilizzando una regex
function validaEmail(email) {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
}

const popup = document.querySelector(".popup");
const overlay = document.querySelector(".overlay");

function apriPopup(message) {
    popup.innerHTML = `
    <h2>Benvenuto!</h2>
    <p>${message}</p>
    <button class="ok"><span>Ok</span></button>`;
    popup.classList.add("open-popup");
    overlay.classList.add("open")
}

function chiudiPopup(popup) {
    overlay.classList.remove("open");
    popup.classList.remove("open-popup")
    redirectToHome();
}

function signup(){
    event.preventDefault();
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var superhero = document.getElementById('superhero').value;

    var user = {
        username: username,
        email: email,
        password: password,
        superhero: superhero,
        credits: 10,
        carte: [],
        doppie: [],
    };

    var utenti = caricaUtenti()

    switch(true){
        case !validaEmail(email):
            alert("Inserisci un indirizzo e-mail corretto");
            break;
        case controllaEsistenza(user, utenti):
            break;
        default:
            utenti.push(user);
            console.table(utenti)
            window.localStorage.setItem('utenti', JSON.stringify(utenti))
            console.log('user added');
            apriPopup("La registrazione è avvenuta con successo!");
            popup.querySelector(".ok").addEventListener("click", function () {
                chiudiPopup(popup);
            });
            
    }

    
}

function controllaEsistenza(newUtente, utenti) {
    for(let i=0; i<utenti.length; i++){
        if (newUtente.username == utenti[i].username){
            alert("Username già esistente");
            return true;
        }else if(newUtente.email == utenti[i].email){
            alert("Email già esistente");
            return true;
        }
    }
    return false;
}

// Gestione della registrazione
const registrationForm = document.getElementById("registrationForm");
registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    signup();
    event.target.reset();
});