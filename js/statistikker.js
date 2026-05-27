"use strict";

// Her er vores array 
const statistikker = [
  {
    id: 1,
    udsagn: "Hvor mange børn og unge får en psykisk lidelse inden de fylder 18 år?",
    svar: 15,
    total: 100,
    forklaring:
      "Omkring 15% af alle børn og unge har været i behandling for en psykisk lidelse inden de fylder 18 år.",
  },
  {
    id: 2,
    udsagn: "Hvor mange danskere får en psykiatrisk diagnose i løbet af livet?",
    svar: 3,
    total: 10,
    forklaring: "Hver 3. dansker får en psykiatrisk diagnose i løbet af livet.",
  },
  {
    id: 3,
    udsagn: "Hvor mange fortæller ikke om deres psykiske sygdom, i frygt for negative kommentarer",
    svar: 8-9,
    total: 10,
    forklaring: "En undersøgelse viser at 87% af de adspurgte, har skjult deres psykiske lidelse grundet tidligere negative erfaringer med at være åben.",
  },
];

// Her kalder vi på alle elementerne, som vi skal bruge fra vores HTML
const introBoks = document.querySelector("#introBoks");
const spilBoks = document.querySelector("#spilBoks");
const startBtn = document.querySelector("#startBtn");
const udsagn = document.querySelector("#udsagn");
const personer = document.querySelector("#personer");
const videreBtn = document.querySelector("#videreBtn");
const forklaringBoks = document.querySelector("#forklaringBoks");
const forklaring = document.querySelector("#forklaring");

// Her laver vi en variabel, der holder styr på, hvilken statistik brugeren er nået til 
let nuvaerende = 0; 

// Her laver vi en variabel der gemmer brugerens svar 
let brugerSvar = 0;

// Vi sætter en lytter på startknappen, som kalder på funktionen "start spil", når der klikkes
startBtn.addEventListener("click", startSpil);

// Vi sætter en lytter på videreknappen, som kalder på funktionen "næste statistik", når der klikkes
videreBtn.addEventListener("click", naesteStatistik);

// Nu laver vi funktionen der starter spillet 
function startSpil(){

    // Her skjuler vi introboksen 
    introBoks.style.display = "none";

    // Viser spilboksen 
    spilBoks.style.display = "block";

    // Her kalder vi på funktionen der viser den første statistik 
    visStatistik();
}

// Nu laver vi en funktion der viser en statistik på siden 
function visStatistik(){
    
    // Henter den statistik vi er nået til
    const statistik = statistikker[nuvaerende];

    // Dette gør at udsagnet bliver vist på siden 
    udsagn.textContent = statistik.udsagn;

    // Her tømmer vi containeren for fyldte personer 
    personer.innerHTML = "";

    // Her skjuler vi forklaringsboksen indtil brugeren har svaret
    forklaringBoks.style.display = "none";

    // Her skjuler vi videre knappen indtil brugeren har svaret 
    videreBtn.style.display = "none"; 

    // Her nulstiller vi brugerens svar
    brugerSvar = 0;

    // Her laver vi et loop der viser det antal personer der skal være total 
    for (let i = 0; i < statistik.total; i++) {

        // Opretter billeder 
        const person = document.createElement ("img");

        // Alle personer starter som tomme 
        person.src = "persontom";

        // Giver billedet klassen "person" 
        person.classList.add("person");

        // Vi lytter efter klik på "person"
        person.addEventListener("click", () => {

            // Her gemmer vi, hvor mange personer brugeren har valgt
            brugerSvar = i + 1;

            // Her kalder vi på funktionen der fylder personerne ud 
            udfyldBrugerSvar(brugerSvar);

            // Her viser vi videreknappen når brugeren har valgt antal personer 
            videreBtn.style.display = "block";
        });

        // Her sætter vi personen ind i HTML containeren 
        personer.appendChild(person);
    }
}
