"use strict";

// Her kommer vores array 
const bobler = [

    {
        id: 1,
        navn: "Myter og fakta",
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


// Her kalder vi på vores bobbel container i vores html
const container = document.querySelector ("#bobbelContainer");

// Her laver vi et foreach loop der gennemgår hver bobbel
bobler.forEach(boblerne => {

    // Her opretter vi en ny div for hver bobbel
    const bobbel = document.createElement("div");

    // Her giver vi boblerne en klasse, så vi kan style dem på én gang i CSS
    bobbel.classList.add("bobbel");

    // her tilføjer vi et navn til hver bobbel
    bobbel.textContent = boblerne.navn;

    // Her sætter vi en lytter på på boblerne, så de reagere på klik
    bobbel.addEventListener("click", () => {

        // Her sendes brugeren videre ved klik på boblen
        window.location.href = boblerne.side;
    });

    // Her lægger vi vores bobler ind i vores container i vores html
    container.appendChild(bobbel);

});
