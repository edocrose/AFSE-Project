const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("username");
var utenti = localStorage.getItem('utenti');
var json = JSON.parse(utenti);
var user = null;
for (var i = 0; i < json.length; i++) {
    if (json[i].username == username) {
        user = json[i];
        cards(user.doppie);
        break;
    }
}

function cards(mazzo) {
    var cardContainer = document.querySelector('.contenitore');

    for (var i = 0; i < mazzo.length; i++) {
        var characterCard = document.createElement('div');
        characterCard.id = 'character-card';
        characterCard.classList.add('badge');

        var img = document.createElement('img');
        img.classList.add('card-img-top');
        img.alt = '...';
        img.src = mazzo[i].thumbnail.path + "." + mazzo[i].thumbnail.extension;

        var h2 = document.createElement('h2');
        h2.classList.add('card-title');
        h2.innerHTML = mazzo[i].name;

        var a = document.createElement('a');
        a.classList.add('btn-primary');
        a.href = 'scheda-supereroe.html?id=' + mazzo[i].id + '&username=' + username;
        a.innerHTML = 'Scopri di più';

        characterCard.appendChild(img);
        characterCard.appendChild(h2);
        characterCard.appendChild(a);

        cardContainer.appendChild(characterCard); // Aggiungi il div clonato come figlio del contenitore
    }
}