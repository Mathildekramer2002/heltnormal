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

// Her laver vi en funktion der viser vores video-side, den bruger den valgte historie som parameter, så den ved hvilken video og tekst der skal vises
function visVideo(historie) {

    // Her skjules siden med de 3 cards
    personligSide.style.display = "none";

    videoSide.style.display = "flex";

    // Denne gør så videon til den tilgørende fortælling blier vist
     video.src = historie.video;

    // Her ændres overskriften på videosiden, så den passer til den valgte historie
    videoNavn.textContent = `${historie.navn}, ${historie.alder}`;

    // Her vises diagnosen under navnet
    videoDiagnose.textContent = historie.diagnose;

    // Dette gør at browseren indlæser den nye video, hvis man skifter historie
    video.load();

    // Her gør vi så hver gang en ny video åbnes, starter knappen altid som en play-knap
    playPauseBtn.textContent = "▶";

    // Her gør vi så vores progress bar nulstilles, når videon starter forfra
    progressBar.value = 0;

}

// Her laver vi funktionen til vores play/pause knap
playPauseBtn.addEventListener("click", () => {

    // Her gør vi så når videon spiller, vil den pause, og omvendt når man trykker på vores knap

    if (video.paused) {
        video.play();

        // Her ændrer vi ikonet til en pause knap, hvis videon spiller
    playPauseBtn.textContent = ""

    }

    else {
        video.pause();
        // Når videon er sat på pause, bliver ikonet igen til play
        playPauseBtn.textContent = "▶";
    }

});

// Her gør vi så timeupdate kører hele tiden, mens videon er i gang og følger videoens tid

video.addEventListener("timeupdate", () => {

    // Her regner vi ud hvor meget af videon der er afspillet
    const procent = (video.currenttime / video.duration) * 100;

    // Her sætter vi værdien på progressbaren, til den vi regnede ud før
    progressBar.value = procent;
});

// Her gøres progress-baren interaktiv, så brugeren kan trække i den, og spole frem og tilbage i videon
progressBar.addEventListener("input", () => {

    // Her regner vi på hvilket tidspunkt i videoen som brugeren har valgt
    const nyTid = (progressBar.value / 100) * video.duration;

    // Her sender vi videon hen til det valgte tidspunkt
    video.currentTime = nyTid;
});






