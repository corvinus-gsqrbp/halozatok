var kérdések;
var jelenlegiKérdés = 0;

window.onload = function letöltés() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data));
}

function letöltésBefejeződött(d) {
     console.log("Sikeres letöltés")
     console.log(d)
     kérdések = d;
     kérdésMegjelenítés(0);
}

function kérdésMegjelenítés(k) {
    let ide_kérdés = document.getElementById("kérdés_szöveg");
    ide_kérdés.InnerHTML = kérdések[k].questionText;
    document.getElementById("válasz1").innerHTML = kérdések[k].answer1
    for (var i = 1; i < 4; i++) {
        console.log(kérdések[k].questionText)
        let elem = document.getElementById("válasz" + i)
        elem.innerHTML = kérdések[k]["answer" + i]
    }

    if (document.getElementById("kép1").src = ! "") {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdések[k].image
    }

    jóVálasz = kérdések[k].correctAnswer;

    válasz1.classList.remove("jo", "rossz");
    válasz2.classList.remove("jo", "rossz");
    válasz3.classList.remove("jo", "rossz");
}

function kattElore() {
    jelenlegiKérdés++;
    if (jelenlegiKérdés == kérdések.length) {
        jelenlegiKérdés = 0;
    }
    kérdésMegjelenítés(jelenlegiKérdés);
}

function kattVissza() {
    if (jelenlegiKérdés == 0) {
        jelenlegiKérdés = 2;
        kérdésMegjelenítés(jelenlegiKérdés);
    }
    else {
        jelenlegiKérdés = jelenlegiKérdés - 1;
        kérdésMegjelenítés(jelenlegiKérdés);
    }
}

function megjelöltVálasz1() {
    let megjelöltválasz1 = document.getElementById("válasz1");
    if (jóVálasz == 1) {
        megjelöltválasz1.classList.add("jo");
    }
    else {
        meglelöltválasz1.classList.add("rossz");
    }
}

function megjelöltVálasz2() {
    let megjelöltválasz2 = document.getElementById("válasz2");
    if (jóVálasz == 2) {
        megjelöltválasz2.classList.add("jo");
    }
    else {
        meglelöltválasz2.classList.add("rossz");
    }
}

function megjelöltVálasz3() {
    let megjelöltválasz3 = document.getElementById("válasz3");
    if (jóVálasz == 3) {
        megjelöltválasz3.classList.add("jo");
    }
    else {
        meglelöltválasz3.classList.add("rossz");
    }
}