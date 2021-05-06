var hotList = [];           //az éppen gyakoroltatott kérdések listája
var questionInHotList = 3;  //ez majd 7 lesz, a teszteléshez jobb a 3
var displayedQuestion;      //a hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //kérdések száma a teljes adatbázisban
var nextQuestion = 1;       //a következő kérdés száma a teljes listában
var timerHandler;

function init() {
    for (var i = 0; i < questionInHotList; i++) {
        hotList[i] = {
            question: {},
            goodAnswers: 0
        }
    }

    //kérdések száma
    fetch("questions/count")
        .then(result => result.text())
        .then(n => { numberOfQuestions = parseInt(n) })

    //előre-hátra gombok
    document.getElementById("előre_gomb").addEventListener("click", előre);
    document.getElementById("vissza_gomb").addEventListener("click", vissza);

    //mentett állapot olvasása
    if (localStorage.getItem("hotList")) {
        hotList = JSON.parse(localStorage.getItem("hotList"));
    }

    if (localStorage.getItem("displayedQuestion")) {
        displayedQuestion = parseInt(localStorage.getItem("displayedQuestion"));
    }

    if (localStorage.getItem("nextQuestion")) {
        nextQuestion = parseInt(localStorage.getItem("nextQuestion"));
    }

    //kezdő kérdéslista letöltése
    if (hotList.length === 0) {
        for (let i = 0; i < questionInHotList; i++) {
            kérdésBetöltés(nextQuestion, i);
            nextQuestion++;
        }
    }
    else {
        kérdésMegjelenítés();
    }
}

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(result => {
            if (!result.ok) {
                console.error(`hibás letöltés: ${result.status}`);
                return null;
            }
            else {
                return result.json();
            }
        })
        .then(q => {
            hotList[destination] = q;
            hotList[destination].goodAnswers = 0;
            console.log(`A ${questionNumber}. kérdés letöltésre került a hotList ${destination}. helyére`)
            if (displayedQuestion===undefined && destination===0) {
                displayedQuestion = 0;
                kérdésMegjelenítés();
            }
        })
}

function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText;
    document.getElementById("válasz1").innerText = kérdés.answer1;
    document.getElementById("válasz2").innerText = kérdés.answer2;
    document.getElementById("válasz3").innerText = kérdés.answer3;
    if (kérdés.image) {
        document.getElementById("kép").src = kérdés.image;
        document.getElementById("kép").style.display = "block";
    }
    else {
        document.getElementById("kép").style.display = "none";
    }
    for (var i = 0; i < 3; i++) document.getElementById("válasz1" + i).classList.remove("jó", "rossz")
    document.getElementById("válaszok").style.pointerEvents = "auto"
}

function előre() {
    clearTimeout(timerHandler);
    displayedQuestion++;
    if (displayedQuestion === questionInHotList) displayedQuestion = 0;
    kérdésMegjelenítés();
}

function vissza() {
    displayedQuestion--;
    if (displayedQuestion < 0) displayedQuestion = questionInHotList - 1;
    kérdésMegjelenítés();
}

function választás(n) {
    let kérdés = hotList[displayedQuestion].question;
    if (n === kérdés.correctAnswer) {
        document.getElementById("válasz1" + n).classList.add("jó")
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers === 3) {
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;
            //ToDo: kérdéslista vége ellenőrzés
        }
    }
    else {
        document.getElementById("válasz1" + n).classList.add("rossz")
        document.getElementById("válasz1" + kérdés.correctAnswer).classList.add("jó")
        hotList[displayedQuestion].goodAnswers=0;
    }
    document.getElementById("válaszok").style.pointerEvents = "none";
    timerHandler = setTimeout(előre, 3000);
}

window.onload = init;