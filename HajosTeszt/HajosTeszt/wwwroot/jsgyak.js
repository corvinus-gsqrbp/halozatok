var faktoriálisRn = (n) => {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * faktoriálisRn (n - 1)
    }
}

window.onload = function () {

    let element = document.getElementById("pascal")

    for (var s = 0; s < 10; s++) {
        let sor = document.createElement("div");
        sor.classList.add("sor")
        element.appendChild(sor)
        console.log(s)

        for (var oszlop = 0; oszlop <= s; oszlop++) {
            let elem = document.createElement("div")
            elem.classList.add("elem")
            elem.innerText = faktoriálisRn(s)/(faktoriálisRn(oszlop)*faktoriálisRn(s - oszlop))
            console.log(oszlop)
            sor.appendChild(elem);
            elem.style.background="rgb(${255/10*s},0,${255/10*oszlop})"
        }
    }
}