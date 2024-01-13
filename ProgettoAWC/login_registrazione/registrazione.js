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

// Funzione per convalidare una password utilizzando una regex
function validaPassword(password) {
    // La password deve contenere almeno 8 caratteri, almeno una lettera maiuscola, almeno una lettera minuscola e almeno un numero.
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regexPassword.test(password);
}

function signup(e){
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
        case !validaPassword(password):
            alert("La password deve avere almeno 8 caratteri con almeno 1 maiuscola, 1 minuscola e 1 numero");
            break;
        case controllaEsistenza(user, utenti):
            break;
        default:
            utenti.push(user);
            console.table(utenti)
            window.localStorage.setItem('utenti', JSON.stringify(utenti))
            console.log('user added');
            alert("Registrazione avvenuta con successo!");
            redirectToHome();
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