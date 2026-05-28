"use strict"; 

// Her kommer vores array 
const udsagnListe = [

    {
        id: 1,
        udsagn: "Mennesker med psykiske lidelser kan ikke få et normalt liv.",
        svar: "Myte",
        forklaring: "Mange lever gode og stabile liv med uddannelse, job, familie og venner især med den rette støtte og behandling."
    },

    {
        id: 2,
        udsagn: "Personer med ADHD kan ikke koncentrere sig.",
        svar: "Myte",
        forklaring: "Personer med ADHD kan ofte koncentrere sig godt om aktiviteter, der interesserer dem meget. Udfordringen handler typisk om at regulere og styre opmærksomheden, ikke om at mangle evnen til at koncentrere sig."
    },
    {
        id: 3,
        udsagn: "Næste 50% Mener at mennesker med en psykisk lidelse er farligere end andre",
        svar: "Fakta",
        forklaring: "En dansk undersøgelse viste, at næsten halvdelen af befolkningen mener, at personer med psykisk sygdom ofte er mere farlige end andre. Det viser, hvor stærke fordomme stadig kan være — selvom de fleste mennesker med psykisk sygdom ikke er farlige"
    },

    {
        id: 4,
        udsagn: "Mange skjuler deres psykiske lidelse af frygt for andres reaktioner.",
        svar: "Fakta",
        forklaring: "87% af de adspurgte i en undersøgelse havde skjult deres psykiske lidelse på grund af negative erfaringer eller frygt for kommentarer."
    },

    {
        id: 5,
        udsagn: "6 ud af 10 personer med en psykiatrisk diagnose oplever diskrimination",
        svar: "Myte",
        forklaring: "En undersøgelse fra Psykiatrifonden viser, at mange oplever negative reaktioner eller forskelsbehandling på grund af deres diagnose."
    }

];


// Holder styr på hvilket spørgsmål brugeren er nået til
let nuvaerendeUdsagn = 0;

// Her henter vi de HTML elementer vi gerne vil styre med JS
// Vi bruger getElementById for at finde elementet udfra dens id i vores HTML
// Vi gemmer elementerne i variabler så vi nemmere kan ændre eller vise dem 
const udsagn = document.getElementById("udsagn");
const myteBtn = document.getElementById("myteBtn");
const faktaBtn = document.getElementById("faktaBtn");
const svarBoks=document.getElementById("svarBoks");
const svar=document.getElementById("svar");
const forklaring=document.getElementById("forklaring");
const naesteBtn=document.getElementById("naesteBtn");
const quizside = document.getElementById("quizside");
const svarIkon = document.getElementById("svarIkon");

// Viser spørgsmålet på skærmen 
function visUdsagn() {
    udsagn.textContent = udsagnListe[nuvaerendeUdsagn].udsagn;

// Når man har svaret og trykkere videre forsvinder svarboksen igen og et nyt udsagn kommer frem 
svarBoks.style.display = "none";
}

// Vi kalder på funktionen så udsagnet vises 
visUdsagn();

// Vi tjekker hvad brugeren har svaret 
function tjekSvar(brugerSvar){
    // Her finder vi det rigte svar oppe i vores array på det nusvæernede udsagn 
    const korrektSvar = udsagnListe[nuvaerendeUdsagn].svar;

    // Her sammenligner vi brugerens svar med det korrekte svar
    if (brugerSvar === korrektSvar){

        //hvis svaret er korrekt så kommer der til at stå korrekt 
        svarIkon.textContent = "✓";
        svarIkon.className = "korrektCirkel";
        svar.textContent = "Korrekt!";
    } else {
        // Hvis svaret er forkert så kommer der til at stå forkert
        svarIkon.textContent = "✕";
        svarIkon.className = "forkertCirkel";
        svar.textContent = "Forkert!";
    }

    // Her kommer forklaringen til udsagnet 
    forklaring.textContent = udsagnListe [nuvaerendeUdsagn].forklaring;

    // Når brugeren har svaret bliver boksen synlig
    svarBoks.style.display = "block";
}

// Her lytter vi efter klik på vores myteknap 
myteBtn.addEventListener("click",function(){

    // Her sender vi svaret ind i funktionen når brugern klikker på knappen 
    tjekSvar("Myte");
});

// Her gør vi det samme med fakta knappen 
faktaBtn.addEventListener("click",function(){

    // Her sender vi svaret ind i funktionen når brugern klikker på knappen 
    tjekSvar("Fakta");
});


// Lytter efter klik på vores næste knap 
naesteBtn.addEventListener("click", function() {

    // Her gør vi sådan at hvis knappen hedder "afslut" som den gør efter sidste udsagn sendes brugeren tilbage til forsiden
    if (naesteBtn.textContent === "Afslut") {
        window.location.href = "index.html";
        return;
    }
    // Her bruger vi ++ for at gå videre til næste udsagn 
    nuvaerendeUdsagn ++ ;

    // Vi tjekker om der er flere udsagn
    if (nuvaerendeUdsagn < udsagnListe.length){

        // Hvis der er flere udsagn vises det næste
        visUdsagn();
    } else {

    // Fjerner teksten i udsagnsboksen
    udsagn.textContent = "";

    // Skjuler teksten "Hvad tror du?"
    document.querySelector("#quizside p").style.display = "none";

    // Her skjuler vi knapperne
    myteBtn.style.display = "none";
    faktaBtn.style.display = "none";
    svarIkon.style.display = "none";

    // Her vises en afsluttende besked til brugeren
    svar.style.marginTop = "60px";
    svar.textContent = "Tillykke, du er færdig!";
    forklaring.textContent = "Tak fordi du gennemførte quizzen.";

    // Her indsættes teksten om at man kan kalde sig Myte-jæger
    document.querySelector("#badgeTekst").textContent =
    "Du kan nu kalde dig Mytejæger";

    // Her vises badge-tekst og billede
    document.querySelector("#badgeTekst").style.display = "block";
    document.querySelector("#badge").style.display = "block";

    // Det ændrer teksten på knappen fra "Næste" til "Afslut"
    naesteBtn.textContent = "Afslut";

    // Gør at afslutningsboksen vises på skærmen
    svarBoks.style.display = "block";
    }
});
