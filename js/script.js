// Variabler (DOM)
var userBox = document.getElementById("userbox-div");
var userBoxFargeNavn = document.getElementById("userbox-farge-span");
var bokser = document.getElementById("bokser-div");

var textboks = document.getElementById("vanskelighetsgrad-textbox");
var resetBtn = document.getElementById("reset-btn");

var scoreboardRiktig = document.getElementById("score-riktig");
var scoreboardFeil = document.getElementById("score-feil");
var scoreboardPoints = document.getElementById("score-points");

var instruksjoner = document.getElementById("instuksjoner");

var bokserFunnet = document.getElementById("bokser-funnet-div");

// Variabler
var colorArr = [];
var antallFarger = 3;

var scoreRiktig = 0;
var scoreFeil = 0;
var scorePoints = 0;

var gameRunning = false;


/*********************
 * UI
 * ******************/

// Generer bokser med tilfeldig farge.

function makeBox() {
    bokser.innerHTML = '';
    for (var i = 0; i < antallFarger; i++) {
        var rndFarge1 = Math.floor(Math.random() * 255);
        var rndFarge2 = Math.floor(Math.random() * 255);
        var rndFarge3 = Math.floor(Math.random() * 255);
        colorArr.push(`rgb(${rndFarge1},${rndFarge2},${rndFarge3})`);
        bokser.innerHTML += `<div id="boks-${i}" style="
        width:100px; 
        height:100px;
        float: left;
        background-color: rgb(${rndFarge1},${rndFarge2},${rndFarge3});
        "></div>`;
    }
}

// User boks farget lik en tilfeldig boks
function userBoxColor() {
    userBox.style.height = '200px';
    userBox.style.width = '200px';
    var randNum = Math.floor(Math.random() * colorArr.length);
    userBox.style.backgroundColor = colorArr[randNum];
    userBoxFargeNavn.innerHTML = `Din farge: ${colorArr[randNum]}`;
}



// Hover-effeckt
bokser.addEventListener('mouseover', function (el) {
    if (gameRunning === true) {
        el.target.style.height = "95px";
        el.target.style.width = "95px";
        el.target.style.border = "2.5px solid yellow";
        el.target.style.cursor = "pointer";
        // hover-effeckt OFF
        el.target.addEventListener('mouseleave', function (el) {
            // alle boksene
            var bokserChildrenLength = bokser.children.length;
            for (var i = 0; i < bokserChildrenLength; i++) {
                bokser.children[i].style.height = "100px";
                bokser.children[i].style.width = "100px";
                el.target.style.border = "0";
            }
        });
    }
});

// Mer css i javascript:
instruksjoner.style.fontSize = "20px";
scoreboardPoints.style.fontSize = "20px";

bokserFunnet.addEventListener('click', function (el) {
    alert(`Denne fargen har rgb-kode: ${el.target.style.backgroundColor}`);
});

/**********************
 * Spill-"engine":
 * *******************/

function resetScore() {
    scorePoints = 0;
    scoreRiktig = 0;
    scoreFeil = 0;
}

// Vanskelighetsgrad:
resetBtn.onclick = function () {
    if (textboks.value != '') {
        // 1. Reset score
        resetScore();
        // 2. Update UI
        printScore();
        // 3. Skjekk textboks for antall bokser
        antallFarger = parseInt(textboks.value);
        // 4. Generer bokser
        newRound();
        // 5. Set game running "true"
        gameRunning = true;
        // 6. Rename button to "Reset game"
        resetBtn.value = "Reset Game";
    }

}

// Klikk på en boks-funksjon
bokser.addEventListener('click', function (el) {
    if (gameRunning === true) {
        // Hvis riktig:
        if (el.target.style.backgroundColor == userBox.style.backgroundColor) {
            //1. Update score
            scoreRiktig++
            scorePoints += 10;
            //2. Update UI
            printScore()
            function visRktBox() {
                bokserFunnet.innerHTML += `<div class="funnetboks" style="
        width:20px; 
        height:20px;
        float: left;
        margin-right: 2px;
        margin-top: 2px;
        background-color: ${el.target.style.backgroundColor};
        "></div>`;
            }
            visRktBox();
            //3. Ny oppgave
            newRound();

            // Hvis feil:
        } else {
            // 1. Update score
            scoreFeil++
            scorePoints -= 2;
            // 2. Update UI
            printScore()
            // 3. Marker boksen som er trykket
            // Vet ikke sikkert om jeg vil ha det med eller ikke.
        }
    }
});

// Update score to UI
function printScore() {
    scoreboardRiktig.innerHTML = `Du har klikket riktig: ${scoreRiktig} ganger`;
    scoreboardFeil.innerHTML = `Du har klikket feil: ${scoreFeil} ganger`;
    scoreboardPoints.innerHTML = `Poeng: ${scorePoints}`;
}

// Ny runde:
function newRound() {
    // 1. Reset color array
    colorArr = [];

    // 2. Fjern gamle bokser
    // (Lagt inn i makebox-funksjonen)

    // 3. Generer nye bokser
    makeBox();

    // 4. Generer userboks
    userBoxColor();

    // 5. Display score
    printScore();
}

// Init: 
// Start et spill med tre bokser der man ikke kan trykke på noe.
newRound();








/********************
 * Tilbakemeldinger underveis:
 * Holde deg til et språk altså enten bruk engelsk eller norsk på funksjon eller variable navn.
 * Function makebox var en utrolig lur måte å generere ny farger og bokser på. 10+
 * God bruker av kommentarer til å forklare kode
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 ********************/

 // Skjekk ut "object.assign"