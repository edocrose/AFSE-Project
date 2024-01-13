const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];
//funzione che trova l'index dell'utente
function trovaUtente(username){
    var index = null;
    for (var i = 0; i < utenti.length; i++) {
        if (utenti[i].username == username) {
            index = i;
            break;
        }
    }
    return index;
}

//funzione che trova l'index la carta richiesta/ceduta nel mazzo dell'altro user, 
function trovaCarta(nomeCarta, mazzo){
    var index = null;
    for(let i=0; i<mazzo.length; i++){
        if(mazzo[i].name == nomeCarta){
            index = i;
            break;
        }
    }
    return index;
}


//trova l'immagine del nome della carte che gli passiamo
async function trovaImmagine(nomeCarta) {
const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${nomeCarta}`;

try {
    const response = await fetch(url);
    const jsonData = await response.json();

    const img = jsonData.data.results[0].thumbnail.path + "/standard_fantastic." + jsonData.data.results[0].thumbnail.extension;
    return img;
} catch (error) {
    console.error("Errore nella richiesta HTTP:", error);
    return null; // Gestione dell'errore
}
}
  

//TROVA UTENTE
var urlParams = new URLSearchParams(window.location.search);
var username = urlParams.get("username");
var json = localStorage.getItem('utenti');
var utenti = JSON.parse(json);
var accetta = utenti[trovaUtente(username)];

//Prendi Scambi
var jsonScambi = localStorage.getItem('scambi');
var scambi = JSON.parse(jsonScambi);
//si può aggiungere una funzione per non fare vedere quelli effettuati dallo stesso utente

var index = null

var container = document.querySelector('.proposte');

async function displayScambi() {
    for (var i = 0; i < scambi.length; i++) {
        index = i;
        if (scambi[i].utenteRichiedente == username) {
            // Crea l'elemento "change" aspettando che createChangeElement restituisca un valore
            const changeElement = await createChangeElement(scambi[i], i);
            var aCapo = document.createElement('br');
            // Aggiungi il "change" al container
            container.appendChild(aCapo);
            container.appendChild(changeElement);
        }
    }
  }
displayScambi();

function eliminaScambio(scambio){
  const scambioJSON = JSON.stringify(scambio); // Converti l'oggetto scambio in una stringa JSON

  for (let i = 0; i < scambi.length; i++) {
    const scambioCorrenteJSON = JSON.stringify(scambi[i]); // Converti l'oggetto corrente in una stringa JSON
    
    if (scambioJSON === scambioCorrenteJSON) {
      scambi.splice(i, 1); // Rimuovi l'elemento dall'array

      break;
    }
  }
  localStorage.setItem('scambi', JSON.stringify(scambi));
  getDataScambia4();
}

async function createChangeElement(scambio, index) {
    return new Promise(async (resolve, reject) => {
      // Crea un nuovo elemento "change" per ogni scambio
      var change = document.createElement('div');
      change.id = 'change';
      change.classList.add('change');
  
      // Crea l'elemento "richiesta"
      var richiesta = document.createElement('p');
      richiesta.className = 'richiesta';
      richiesta.textContent = "Richiesta: " + scambio.cartaRichiesta;
  
      // Crea l'elemento "cartaRichiesta"
      var cartaRichiesta = document.createElement('div');
      cartaRichiesta.id = 'character-card';
      var imgRic = document.createElement('img');
  
      try {
        // Attendere che trovaImmagine restituisca l'URL
        const urlRic = await trovaImmagine(scambio.cartaRichiesta);
        imgRic.src = urlRic;
      } catch (error) {
        console.error("Errore durante il caricamento dell'immagine:", error);
        imgRic.src = 'URL_dell_immagine_di_default_se_c_e_un_errore.jpg';
      }
  
      var h2Ric = document.createElement('h2');
      var nameRic = scambio.cartaRichiesta;
  
      if (nameRic.length > 12) {
        nameRic = nameRic.substring(0, 12) + '...';
      }
      h2Ric.innerHTML = nameRic
      cartaRichiesta.appendChild(imgRic);
      cartaRichiesta.appendChild(h2Ric);
  
      // Crea l'elemento "cartaCeduta" in modo simile
      var ceduta = document.createElement('p');
      ceduta.className = 'richiesta';
      ceduta.textContent = "Ceduta: " + scambio.cartaCeduta;
    
      
      var cartaCeduta = document.createElement('div');
      cartaCeduta.id = 'character-card';
      var imgCed = document.createElement('img');
    
      try {
        // Attendere che trovaImmagine restituisca l'URL
        const urlCed = await trovaImmagine(scambio.cartaCeduta);
        imgCed.src = urlCed;
      } catch (error) {
        console.error("Errore durante il caricamento dell'immagine:", error);
        imgCed.src = 'URL_dell_immagine_di_default_se_c_e_un_errore.jpg';
      }
    
      var h2Ced = document.createElement('h2');
      var nameCed = scambio.cartaCeduta;
    
      if (nameCed.length > 12) {
        nameCed = nameCed.substring(0, 12) + '...';
      }
      h2Ced.innerHTML = nameCed
      cartaCeduta.appendChild(imgCed);
      cartaCeduta.appendChild(h2Ced);

      var contenitoreFrecce = document.createElement('div');
      contenitoreFrecce.className = 'contenitore-frecce';
      var aCapo = document.createElement('br');
      var frecciaSinistra = document.createElement('div');
      frecciaSinistra.className = 'freccia-sinistra';
      var frecciaDestra = document.createElement('div');
      frecciaDestra.className = 'freccia-destra';


      contenitoreFrecce.appendChild(frecciaSinistra);
      contenitoreFrecce.appendChild(aCapo);
      contenitoreFrecce.appendChild(frecciaDestra);

      var button = document.createElement('button');
      var elimina = document.createElement('span')
      elimina.textContent = "Elimina";
      button.appendChild(elimina)
      button.className = 'elimina';
      button.addEventListener('click', function () {
        eliminaScambio(scambio);
      });

      // Aggiungi tutti gli elementi al "change"
      change.appendChild(cartaCeduta);
      change.appendChild(contenitoreFrecce);
      change.appendChild(cartaRichiesta);
      change.appendChild(button);
      
  
      resolve(change); // Risolvi la promessa quando l'elemento è stato creato
    });
}

