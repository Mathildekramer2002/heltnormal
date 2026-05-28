"use strict";
 // Her laver vi vores array
const historier = [
    {
        id: 1,
        navn: "Anna",
        alder: "19",
        diagnose: "angst",
        billede: "image/Anna.png",
        video: "image/anna.mp4",
        kortTekst: "I lang tid troede jeg bare, at jeg tænkte for meget over tingene."

    },
     {
        id: 2,
        navn: "Sofia",
        alder: "9",
        diagnose: "Autisme",
        billede: "image/Sofia.png",
        video: "image/sofia.mp4",
        kortTekst: "De har aldrig haft et barn som Sofia før."

    },
     {
        id: 3,
        navn: "Cecilie",
        alder: "25",
        diagnose: "ADHD",
        billede: "image/Cecilie.png",
        video: "image/cecilie.mp4",
        kortTekst: "Jeg havde svært ved at passe ind."

    }

];

// Her henter vi elementer fra vores html, så vi kan bruge dem i javascript
const cardContainer = document.querySelector("#cardContainer");
const personligSide = document.querySelector("#personligSide");
const videoSide = document.querySelector("#videoSide");
const video = document.querySelector("#historieVideo");
const videoNavn = document.querySelector("#videoNavn");
const videoDiagnose = document.querySelector("#videoDiagnose");
const playPauseBtn = document.querySelector("#playPauseBtn");
const progressBar = document.querySelector("#progressBar");
const lukVideo = document.querySelector("#lukVideo");


// Her laver vi et foreach loop, som gennegår alle vores historier i vores array

historier.forEach(historie => {
    // Her opretter vi en div, som bliver vores card

    const card = document.createElement("div");

    // Her giver vi vores card en klasse, så vi kan style dem på en gang i CSS

    card.classList.add("historieCard");

    // Her indsætter vi vores indhold i vores card

   card.innerHTML = `
    <img src="${historie.billede}" alt="billede af ${historie.navn}">
    <h2>${historie.navn}, ${historie.alder}</h2>
    <p class="diagnose">${historie.diagnose}</p>
    <p>${historie.kortTekst}</p>
    <button class="cardPlayBtn">▶</button>
`;

   // Her tilføjer vi en klikfunktion til vores card

   card.addEventListener("click", () => {
    visVideo(historie);
   });

   // Her sætter vi vores card ind i vores container i vores HTML

   cardsContainer.appendChild(card);
});



