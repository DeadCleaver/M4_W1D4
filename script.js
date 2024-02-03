/* prova per capire il fetch e come sono strutturati i dati che ricevo */
/* fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=eminem")
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((err) => console.log("Error detected: ", err)); */


//funzione per creare la card 
function createCard(track) {
    // il div contenitore della card
    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("px-2");


    // l'immagine della card
    let cardImg = document.createElement('img');
    cardImg.classList.add("card-img-top");
    cardImg.classList.add("w-100");
    cardImg.src = track.album.cover_big;
    cardImg.alt = track.title_short;

    // il corpo della card
    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // titolo dell'album
    let albumTitle = document.createElement(`h5`);
    albumTitle.classList.add(`card-title`);
    albumTitle.classList.add(`album-title`);
    albumTitle.innerText = `${track.album.title}`

    // titolo della canzone 
    let songTitle = document.createElement('p');
    songTitle.classList.add('card-text');
    songTitle.classList.add('song-title');
    songTitle.innerText = `${track.title}`;

    // Append elements to the card
    card.appendChild(cardImg);
    cardBody.appendChild(albumTitle);
    cardBody.appendChild(songTitle);
    card.appendChild(cardBody);

    return card;
}

window.onload = () => {
    let artists = ["eminem", "metallica", "queen"];

    artists.forEach(artist => {

        fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`)
            .then((response) => response.json())
            .then((json) => {

                let sectionTitle = document.getElementById(artist);
                sectionTitle.classList.toggle("d-none");

                let cardsWrapper = document.getElementById(`${artist}Section`);

                json.data.slice(0, 4).forEach(track => {
                    let card = createCard(track);
                    cardsWrapper.appendChild(card);
                });
            })
            .catch((err) => console.log("Error detected: ", err));

    });
};

function clearSearch() {
    let artists = ["eminem", "metallica", "queen"];
    artists.forEach(artist => {
        let sectionTitle = document.getElementById(artist);
        sectionTitle.classList.add("d-none");
        let cardsWrapper = document.getElementById(`${artist}Section`);
        cardsWrapper.innerHTML = "";
    });

}

function search() {
    let searchInput = document.getElementById(`searchField`);
    let searchQuery = searchInput.value.toLowerCase().trim();

    /* prima di procedere con la ricerca ripulisce la pagina e la input box */
    clearSearch();
    searchInput.value = "";

    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchQuery}`)
        .then(response => response.json())
        .then(json => {

            let sectionTitle = document.getElementById(searchQuery);
            sectionTitle.classList.toggle("d-none");

            let cardsWrapper = document.getElementById(`${searchQuery}Section`);

            json.data.forEach(track => {
                let card = createCard(track);
                cardsWrapper.appendChild(card);

            })
                .catch((err) => console.log("Error detected: ", err));

        });
};


function showListModal() {
    let albumListModal = document.getElementById(`album-list-modal`);

    let listModalBody = document.getElementById(`list-modal-body`);
    listModalBody.innerHTML = "";

    let albumTitles = document.getElementsByClassName(`album-title`);
    console.log(albumTitles);

    Array.from(albumTitles).forEach(album => {
        let albumTitleText = document.createElement(`p`);
        albumTitleText.innerText = album.innerText;
        listModalBody.appendChild(albumTitleText);
    });


    albumListModal.classList.add(`fade`);
    albumListModal.classList.add(`show`);
    albumListModal.style.display = "block";

    let closeModalButton = document.getElementById(`close-modal-button`);
    closeModalButton.addEventListener("click", closeListModal);

}

function closeListModal() {
    let albumListModal = document.getElementById(`album-list-modal`);
    
    albumListModal.classList.remove(`fade`);
    albumListModal.classList.remove(`show`);
    albumListModal.style.display = "none";

}

// aggiungo gli addeventlistener una volta caricato gli elementi del dom
document.addEventListener("DOMContentLoaded", () => {
    let clearButton = document.getElementById(`clear-button`);
    clearButton.addEventListener("click", clearSearch);

    let searchButton = document.getElementById(`button-search`);
    searchButton.addEventListener("click", search);

    let listButton = document.getElementById(`list-button`);
    listButton.addEventListener("click", showListModal);

});

