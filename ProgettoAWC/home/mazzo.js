var urlParams = new URLSearchParams(window.location.search);
var username = urlParams.get("username");
var utenti = localStorage.getItem('utenti');
var json = JSON.parse(utenti);
var user = null;
for (var i = 0; i < json.length; i++) {
    if (json[i].username == username) {
        user = json[i];
        cards(user.carte);
        break;
    }
}
var mod = JSON.stringify(json);
localStorage.setItem('utenti', mod);

function cards(mazzo) {
    var cardContainer = document.querySelector('.contenitore');

    // Ordina le carte in base al nome
    mazzo.sort(function (a, b) {
        var nameA = a.name.toLowerCase(); // Converte le lettere in lettere minuscole
        var nameB = b.name.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    for (var i = 0; i < mazzo.length; i++) {
        var characterCard = document.createElement('div');
        characterCard.id = 'character-card';
        characterCard.classList.add('badge');

        var img = document.createElement('img');
        img.classList.add('card-img-top');
        img.src = mazzo[i].thumbnail.path + "/standard_fantastic." + mazzo[i].thumbnail.extension;

        var h2 = document.createElement('h2');
        h2.classList.add('card-title');

        var name = mazzo[i].name;

        if (name.length > 12) {
            name = name.substring(0, 12) + '...';
        }
        h2.innerHTML = name
        
        var a = document.createElement('a');
        a.classList.add('btn-primary');
        a.href = 'cartaDettagli.html?index=' + i + '&username=' + username;
        a.innerHTML = 'Scopri di più';

        characterCard.appendChild(img);
        characterCard.appendChild(h2);
        characterCard.appendChild(a);

        cardContainer.appendChild(characterCard); // Aggiungi il div clonato come figlio del contenitore
    }
}

// Calcola la percentuale di completamento
const percentualeCompletamento = (((user.carte.length - user.doppie.length) / 1562) * 100).toFixed(2);

// Aggiorna la larghezza della barra di avanzamento
const figurineProgress = document.getElementById("figurineProgress");
figurineProgress.style.width = percentualeCompletamento + "%";
const percentuale = document.getElementById("percentuale");
percentuale.textContent = "Hai il " + percentualeCompletamento + "% del totale delle carte disponibili";