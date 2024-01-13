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

usernameElement.value=username;
emailElement.value=data.email;
passwordElement.value=data.password;
superheroElement.value=data.superhero;

function modifica(){
    window.location.href = "modifica_dati.html?username="+username;
};

//

function elimina(){
    var conferma = window.confirm("Sei sicuro di voler cancellare l'account?");
    if (conferma) {
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

        window.location.href="login.html";
    } else {
        window.location.href = "../home.html?username="+username;
    }
    
};



