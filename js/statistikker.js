"use strict";

const statistikker = [
  {
    id: 1,
    sporsmaal: "Hvor mange børn og unge får en psykisk lidelse inden de fylder 18 år?",
    svar: 2,
    total: 10,
    forklaring:
      "Omkring 15% af alle børn og unge har været i behandling for en psykisk lidelse inden de fylder 18 år.",
  },
  {
    id: 2,
    sporsmaal: "Hvor mange danskere får en psykiatrisk diagnose i løbet af livet?",
    svar: 3,
    total: 10,
    forklaring: "Hver 3. dansker får en psykiatrisk diagnose i løbet af livet.",
  },
  {
    id: 3,
    sporsmaal: "Hvor mange fortæller ikke om deres psykiske sygdom, i frygt for negative kommentarer",
    svar: 8,
    total: 10,
    forklaring: "En undersøgelse viser, at 87 % har skjult deres psykiske lidelse grundet negative erfaringer med åbenhed.",
  },
];

const personTom = "image/person-ikke-fyldt.svg";
const personFyldt = "image/person-fyldt.svg";

const introBoks = document.querySelector("#introBoks");
const spilBoks = document.querySelector("#spilBoks");
const startBtn = document.querySelector("#startBtn");
const sporsmaal = document.querySelector("#sporsmaal");
const personer = document.querySelector("#personer");
const videreBtn = document.querySelector("#videreBtn");
const forklaringBoks = document.querySelector("#forklaringBoks");
const forklaring = document.querySelector("#forklaring");
const sporgsmaalTekst = document.getElementById("sporgsmaalTekst");
const progressFyld = document.getElementById("progressFyld");

const statistikPopup = document.querySelector("#statistikPopup");
const statistikSvarIkon = document.querySelector("#statistikSvarIkon");
const statistikSvarOverskrift = document.querySelector("#statistikSvarOverskrift");
const statistikPopupForklaring = document.querySelector("#statistikPopupForklaring");
const popupPersoner = document.querySelector("#popupPersoner");

let nuvaerende = 0;
let brugerSvar = 0;
let rigtigtSvarVist = false;

startBtn.addEventListener("click", startSpil);
videreBtn.addEventListener("click", naesteStatistik);

function startSpil() {
    introBoks.style.display = "none";
    spilBoks.style.display = "block";
    visStatistik();
}

function visStatistik() {
    const statistik = statistikker[nuvaerende];

    sporsmaal.textContent = statistik.sporsmaal;

    sporgsmaalTekst.textContent =
    "SPØRGSMÅL " + (nuvaerende + 1) + "/" + statistikker.length;

    let progress = ((nuvaerende + 1) / statistikker.length) * 100;
    progressFyld.style.width = progress + "%";

    personer.innerHTML = "";
    forklaringBoks.style.display = "none";
    forklaring.textContent = "";

    videreBtn.style.display = "none";
    videreBtn.textContent = "Se svar";

    statistikPopup.style.display = "none";
    popupPersoner.innerHTML = "";

    brugerSvar = 0;
    rigtigtSvarVist = false;

    for (let i = 0; i < statistik.total; i++) {
        const person = document.createElement("img");

        person.src = personTom;
        person.classList.add("person");
        person.dataset.valgt = "false";

        person.addEventListener("click", () => {
            if (rigtigtSvarVist === false) {
                brugerSvar = i + 1;

                const allePersoner = document.querySelectorAll("#personer .person");

                allePersoner.forEach((person, index) => {
                    if (index < brugerSvar) {
                        person.src = personFyldt;
                    } else {
                        person.src = personTom;
                    }
                });

                videreBtn.style.display = "flex";
            }
        });

        personer.appendChild(person);
    }
}

function visRigtigtSvar() {
    const statistik = statistikker[nuvaerende];

    popupPersoner.innerHTML = "";

    if (brugerSvar === statistik.svar) {
        statistikSvarIkon.textContent = "✓";
        statistikSvarIkon.className = "korrektCirkel";
        statistikSvarOverskrift.textContent = "Korrekt!";
    } else {
        statistikSvarIkon.textContent = "✕";
        statistikSvarIkon.className = "forkertCirkel";
        statistikSvarOverskrift.textContent = "Forkert!";
    }

    statistikPopupForklaring.textContent = statistik.forklaring;

    for (let i = 0; i < statistik.total; i++) {
        const person = document.createElement("img");

        person.classList.add("person");

        if (i < statistik.svar) {
            person.src = personFyldt;
        } else {
            person.src = personTom;
        }

        popupPersoner.appendChild(person);
    }

    statistikPopup.style.display = "block";
    rigtigtSvarVist = true;

    if (nuvaerende === statistikker.length - 1) {
        videreBtn.textContent = "Få din belønning";
    } else {
        videreBtn.textContent = "Næste spørgsmål →";
    }
}

function naesteStatistik() {
    if (rigtigtSvarVist === false) {
        visRigtigtSvar();
    } else {
        statistikPopup.style.display = "none";
        nuvaerende++;

        if (nuvaerende < statistikker.length) {
            visStatistik();
        } else {
            sporsmaal.innerHTML = `Tillykke du er færdig <span class="slutUndertekst">Tak fordi du gennemførte quizzen.</span>`;
            sporsmaal.classList.add("slutTekst");

            personer.innerHTML = "";
            forklaringBoks.style.display = "none";
            badgeBoks.style.display = "block";

            videreBtn.textContent = "Afslut";
            videreBtn.style.display = "flex";

            videreBtn.onclick = () => {
                window.location.href = "index.html";
            };
        }
    }
}