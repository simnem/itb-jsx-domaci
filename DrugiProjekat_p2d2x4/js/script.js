let divContainer = document.querySelector(".container");
console.log(divContainer);

let n = nbaPitanja.length
// loop
for ( let i = n - 1; i >= 0; i--) { 
    // privremena var
    let temp = nbaPitanja[i];
    // random broj
    let br = Math.floor(Math.random()* n);
    // dobijamo index random var
    // menjamo privremeni var sa random varom
    nbaPitanja[i] = nbaPitanja[br];
    nbaPitanja[br] = temp;
}
console.log(nbaPitanja)

for( let i = 1;  i <= 5; i++) { 
    let divPitanja = document.createElement("div");
    let naslovPitanja = document.createElement("h2");

    let niz = nbaPitanja[i-1];
    let pitanje = niz.pitanje;
    var odgovori = niz.ponudjeniOdgovori;
    let opcije = "";

    odgovori.forEach((opt, index) => {
        opcije += `<input type="radio" name="pitanje${i}" value="${index}" id ="pitanje${i}_${index}"`
        if ( index == 0) { 
            opcije += `checked`
        }
        opcije +=  `><label for="pitanje${i}_${index}"> ${opt} </label><br>`
    })

    naslovPitanja.textContent = `${i}.  ${pitanje}`;
    divPitanja.appendChild(naslovPitanja);
    divPitanja.innerHTML += opcije;
    divContainer.appendChild(divPitanja);
}

let napraviPosalji = document.createElement("button");
napraviPosalji.textContent = "Pošalji odgovore";
let napraviNovaPitanja = document.createElement("button")
napraviNovaPitanja.textContent = "Nova pitanja";
divContainer.append(napraviPosalji, napraviNovaPitanja)

let btnPosalji = document.querySelector("button:first-of-type");
let btnNovapitanja = document.querySelector("button:last-of-type");

btnPosalji.addEventListener("click", ()=> { 
    let cekiraniOdgovori = [];

    for( let i = 0; i < 5; i++) {
       for( let j = 0; j < 3; j++) {
        if (document.querySelector(`#pitanje${i}_${j}:checked`)){
            cekiraniOdgovori.push(nbaPitanja[i].ponudjeniOdgovori[j]); 
        }
       }
    }

    console.log(cekiraniOdgovori)

    for( let i = 0; i < 5; i++) {
        let j = 1
        console.log(nbaPitanja[i].tacanOdgovor);
        console.log(cekiraniOdgovori[i]);
        j++;

        if(nbaPitanja[i].tacanOdgovor == cekiraniOdgovori[i]) {
            console.log(`Tacan odgovor`);
        } else {
            console.log(`Netacan odgovor`);
        }
}
})

