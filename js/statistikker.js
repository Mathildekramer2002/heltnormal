"use strict";

// Her er vores array 
const statistikker = [
  {
    id: 1,
    udsagn: "Hvor mange børn og unge får en psykisk lidelse inden de fylder 18 år?",
    svar: 15,
    total: 10,
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
    svar: 8,
    total: 10,
    forklaring: "En undersøgelse viser at 87% af de adspurgte, har skjult deres psykiske lidelse grundet tidligere negative erfaringer med at være åben.",
  },
];

// Her definerer vi vores filer 
const personTom = "image/person-ikke-fyldt.svg";
const personFyldt = "image/person-fyldt.svg";

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

// Holder styr på om det rigtige svar er vist 
let rigtigtSvarVist = false;

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

    // Her nulstilles forklaringsteksen 
    forklaring.textContent = "";

    // Her skjuler vi videre knappen indtil brugeren har svaret 
    videreBtn.style.display = "none"; 

    // Her nulstiller vi brugerens svar
    brugerSvar = 0;
    rigtigtSvarVist = false;

    // Her laver vi et loop der viser det antal personer der skal være total 
    for (let i = 0; i < statistik.total; i++) {

        // Opretter billeder 
        const person = document.createElement ("img");

        // Alle personer starter som tomme 
        person.src = personTom;

        // Giver billedet klassen "person" 
        person.classList.add("person");

        // Gemmer om er valgt eller ej
        person.dataset.valgt = "false";

        // Vi lytter efter klik på "person"
       person.addEventListener("click", () => {

         // Brugeren må kun ændre sit svar før det rigtige svar vises
         if (rigtigtSvarVist === false) {

           // Hvis personen allerede er valgt, bliver den tom igen
           if (person.dataset.valgt === "true") {
             person.dataset.valgt = "false";
             person.src = personTom;
             brugerSvar--;

           } else {

             // Hvis personen ikke er valgt, bliver den udfyldt
             person.dataset.valgt = "true";
             person.src = personFyldt;
             brugerSvar++;
           }

           // Videre-knappen vises kun, hvis brugeren har valgt mindst én person
           if (brugerSvar > 0) {
             videreBtn.style.display = "block";
           } else {
             videreBtn.style.display = "none";
           }
         }
       });

        // Her sætter vi personen ind i HTML containeren 
        personer.appendChild(person);
    }
}

// Her vises det rigtige svar 
function visRigtigtSvar(){
    const statistik = statistikker[nuvaerende];
    const allePersoner = document.querySelectorAll(".person");

    allePersoner.forEach((person, index) => {
        if (index < statistik.svar){
            person.src = personFyldt;
        } else {
            person.src = personTom;
        }
    });

    forklaring.textContent = statistik.forklaring; 
    forklaringBoks.style.display = "block";

    rigtigtSvarVist = true;
}

// Her styre vi knapperne videre/næste/afslut
function naesteStatistik(){
    if (rigtigtSvarVist === false){
        visRigtigtSvar();
        videreBtn.textContent = "Næste"; 
    } else {
        nuvaerende++;
        if(nuvaerende < statistikker.length){
            visStatistik();
        } else {
            udsagn.textContent = "Tillykke du er færdig";
            personer.innerHTML = "";
            forklaringBoks.style.display = "none"; 
            videreBtn.textContent = "Afslut";
            videreBtn.style.display = "block";

            videreBtn.onclick = () => {
                window.location.href = "index.HTML";
            };
        }
    }
}

