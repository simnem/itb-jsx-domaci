let divContainer = document.querySelector(".container");
let createForm = document.createElement("form");
divContainer.appendChild(createForm);
let targetForm = document.querySelector("form");
let n = nbaPitanja.length;
// petlja
for ( let i = n - 1; i >= 0; i--) { 
    // privremena var
    let priv = nbaPitanja[i];
    // generisemo random broj
    let br = Math.floor(Math.random()* n);
    // dobijamo index random var
    // menjamo privremeni var sa random varom
    nbaPitanja[i] = nbaPitanja[br];
    nbaPitanja[br] = priv;
}

for( let i = 1;  i <= 5; i++) {                                     //u svakoj iteraciji, petlja kreira po div
    let divPitanja = document.createElement("div");
    let naslovPitanja = document.createElement("h2");

    let niz = nbaPitanja[i-1];
    let pitanje = niz.pitanje;                                     
    var odgovori = niz.ponudjeniOdgovori;
    let opcije = "";

    odgovori.forEach((opt, index) => {
        opcije += `<input type="radio" name="pitanje${i}" value="${index}" id ="pitanje${i}_${index}"` // u variablu opcije dodeljujemo za svaki ponudjeni odgovor po radio button i label
        if ( index == 0) {                                                                             // ako se ovo pitanje po prvi put iterira radio buttonu dodeljujem vrednost checked
            opcije += `checked`;
        }
        opcije +=  `><label for="pitanje${i}_${index}"> ${opt} </label><br>`;                      
    })

    naslovPitanja.textContent = `${i}.  ${pitanje}`;                                                   // kreiramo potrebne elemente u HTMLu
    divPitanja.appendChild(naslovPitanja);
    divPitanja.innerHTML += opcije;
    targetForm.appendChild(divPitanja);
}

let napraviPosalji = document.createElement("button");                                                  // kreiramo potrebna dugmad
napraviPosalji.textContent = "Pošalji odgovore";
let napraviNovaPitanja = document.createElement("button");
napraviNovaPitanja.textContent = "Nova pitanja";
targetForm.append(napraviPosalji, napraviNovaPitanja);


let btnPosalji = document.querySelector("button:first-of-type");                                        // selektujemo dugmad
let btnNovapitanja = document.querySelector("button:last-of-type");

let napraviDivRez = document.createElement("div");                                                      // kreiramo div za rezultate i selektujemo ga
divContainer.appendChild(napraviDivRez);
let divRezultati = document.querySelector("div:last-of-type");

btnPosalji.addEventListener("click", (e)=> { 
    document.querySelectorAll('input[type="radio"]').forEach(function(radio) {
        radio.disabled = true;
    });
    let cekiraniOdgovori = [];
    for ( let i = 1; i <= 5; i++) {                                                                    // klikom na dugme Posalji, petlja prolazi kroz sva pitanja
        for( let j = 0; j < 4; j++)  {                                                                 // unutar petlje je ugnezdena jos jedna petlja, koja iterira kroz sve odgovore
            let radioBtn = document.querySelector(`input[name="pitanje${i}"][value="${j}"]`);
            
            if (radioBtn.checked) {                                                                    // u koliko je trenutni odgovor selektovan
                let label = document.querySelector(`label[for="pitanje${i}_${j}"]`);                   // selektujemo ga
                cekiraniOdgovori.push(label.textContent.trim());                                       // brisemo razmake i pushujemo u prethodno kreirani niz cekirani odgovori
                break;
        }
       }
    }

    for( let i = 0 , j = 0, k = 1; i < 5; i++, j++, k++) {                                              // petlja iterira kroz sva pitanja

        if(nbaPitanja[i].tacanOdgovor == cekiraniOdgovori[j]) {                                         // ukoliko je korisnik cekirao tacan odgovor
            divRezultati.innerHTML += `<p style="color:green">${k}. pitanje tacan odgovor</p>`;         // unutar divRezultati se ispisuje paragraf zelene boje koji potvrdjuje tacnost odgovora
        } else {
            divRezultati.innerHTML += `<p style="color:red">${k}. pitanje netacan odgovor</p>`;         // u suprotnom ispisuje paragraf crvene boje
        }
    }
    e.preventDefault();
});



