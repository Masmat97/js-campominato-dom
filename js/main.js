let griglia = document.getElementById("grid");
let start = document.getElementById("start");
let select = document.getElementById("difficult");
let punteggio = 0;
let bombe = [];
let giocoAttivo = false;

// Funzione per generare le bombe
function generaBombe(numBombe, maxCelle) {
    let bombeSet = new Set();
    while (bombeSet.size < numBombe) {
        let bomba = Math.floor(Math.random() * maxCelle) + 1;
        bombeSet.add(bomba);
    }
    return Array.from(bombeSet);
}

// Funzione per creare la griglia
function creaGriglia(celle) {
    griglia.innerHTML = ''; // Pulisce la griglia
    for (let i = 1; i <= celle; i++) {
        let quadrato = document.createElement("div");
        quadrato.classList.add("square");
        quadrato.innerText = i;

        quadrato.addEventListener("click", function() {
            if (!giocoAttivo) return; // Se il gioco non è attivo, non fare nulla

            if (bombe.includes(i)) {
                alert(`Hai perso! Punteggio finale: ${punteggio}`);
                quadrato.classList.add("bomb");
                giocoAttivo = false; // Termina il gioco
            } else {
                quadrato.classList.add("clicked");
                punteggio++;
                console.log(`Punteggio: ${punteggio}`);

                // Controlla se ha vinto
                if (punteggio === celle - 16) { // 16 è il numero di bombe
                    alert(`Hai vinto! Punteggio finale: ${punteggio}`);
                    giocoAttivo = false; // Termina il gioco
                }
            }
        });

        griglia.appendChild(quadrato);
    }
}

// Gestione dell'evento di avvio del gioco
start.addEventListener("click", function() {
    punteggio = 0;
    giocoAttivo = true;

    let numCelle;
    if (select.value === "easy") {
        numCelle = 100; // 10x10
        bombe = generaBombe(16, numCelle);
        griglia.style.gridTemplateColumns = "repeat(10, 1fr)";
    } else if (select.value === "medium") {
        numCelle = 81; // 9x9
        bombe = generaBombe(16, numCelle);
        griglia.style.gridTemplateColumns = "repeat(9, 1fr)";
    } else if (select.value === "hard") {
        numCelle = 49; // 7x7
        bombe = generaBombe(16, numCelle);
        griglia.style.gridTemplateColumns = "repeat(7, 1fr)";
    }

    creaGriglia(numCelle);
});