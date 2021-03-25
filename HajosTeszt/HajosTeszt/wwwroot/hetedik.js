window.onload = letöltés()
var kérdések;

function letöltés() {
    fetch('questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data));
}

function letöltésBefejeződött(d) {
     console.log("Sikeres letöltés")
     console.log(d)
     kérdések = d;
     kérdésMegjelenítés (0)
}

function kérdésMegjelenítés(k) {
    let ide_kérdés = document.getElementById("kérdés_szöveg");
    ide_kérdés.InnerHTML = kérdések[k].questionText;
    console.log(`$ {kérdés.lenght} kérdés érkezett}`)

    for (var i = 1; i < 4; i++) {
        let elem_kérdés = document.createElement("válasz"+i)
        elem_kérdés.innerHTML = kérdések[k]["answer"+i]
    }
}