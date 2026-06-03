"use strict";

// Her kommer vores array 
const kategorier = [

    {
        id: 1,
        navn: "Myte eller fakta?",
        side: "myterogfakta.html"
    
    
    },

    {
        id: 2,
        navn: "Personlige historier",
        side: "personligehistorier.html"

    },

    {
        id: 3,
        navn: "Statistikker",
        side: "statistikker.html"
    }

];


// Her kalder vi på vores kategori-container i vores html
const container = document.querySelector ("#kategoriContainer");

// Her laver vi et foreach loop der gennemgår hver kategori
kategorier.forEach(kategorierne => {

    // Her opretter vi en ny div for hver kategori
    const kategori = document.createElement("div");

    // Her giver vi boblerne en klasse, så vi kan style dem på én gang i CSS
    kategori.classList.add("kategori");

    // her tilføjer vi et navn til hver kategori
    kategori.textContent = kategorierne.navn;

    // Her sætter vi en lytter på på boblerne, så de reagere på klik
    kategori.addEventListener("click", () => {

        // Her sendes brugeren videre ved klik på boblen
        window.location.href = kategorierne.side;
    });

    // Her lægger vi vores bobler ind i vores container i vores html
    container.appendChild(kategori);

});
