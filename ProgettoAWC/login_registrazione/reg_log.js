 // Funzione per registrare un utente nel localStorage
 function registerUser(username, password, superhero) {
    localStorage.setItem(username, password, superhero);
    alert("Registrazione avvenuta con successo!");
    redirectToHome();
}

// Funzione per effettuare il login
function login(username, password) {
    const storedPassword = localStorage.getItem(username);
    if (storedPassword === password) {
        alert("Accesso effettuato con successo!");
        redirectToHome();
    } else {
        alert("Nome utente o password non validi!");
    }
}

// Funzione per reindirizzare l'utente alla pagina home.html
function redirectToHome() {
    window.location.href = "../home.html";
}

// Gestione della registrazione
const registrationForm = document.getElementById("registrationForm");
registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const superhero = event.target.superhero.value;
    registerUser(username, password, superhero);
    event.target.reset();
});

// Gestione del login
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = event.target.loginUsername.value;
    const password = event.target.loginPassword.value;
    login(username, password);
    event.target.reset();
});