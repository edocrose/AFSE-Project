var urlParams = new URLSearchParams(window.location.search);
var username = urlParams.get("username");
var utenti = localStorage.getItem('utenti');
var json = JSON.parse(utenti);
var user1 = null;
for (var i = 0; i < json.length; i++) {
    if (json[i].username == username) {
        user1 = json[i];
        cards(user1.doppie);
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
        img.src = mazzo[i].thumbnail.path + "/standard_fantastic." + mazzo[i].thumbnail.extension;

        var h2 = document.createElement('h2');
        h2.classList.add('card-title');

        var name = mazzo[i].name;

        if (name.length > 12) {
            name = name.substring(0, 12) + '...';
        }
        h2.innerHTML = name

        characterCard.appendChild(img);
        characterCard.appendChild(h2);

        cardContainer.appendChild(characterCard); // Aggiungi il div clonato come figlio del contenitore
    }
}




