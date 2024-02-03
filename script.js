/* prova per capire il fetch e come sono strutturati i dati che ricevo */
/* fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=metallica")
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((err) => console.log("Error detected: ", err));
 */

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

    // testo della card 
    let cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.classList.add('fs-6');
    cardText.innerText = `${track.title} - ${track.artist.name}`;

    // Append elements to the card
    card.appendChild(cardImg);
    cardBody.appendChild(cardText);
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

