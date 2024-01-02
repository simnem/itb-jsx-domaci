let btnZapocni = document.getElementById("zapocni")                         //Prilikom klika na dugme "Zapocnite", pocetni ekran ce dobiti novu klasu i postati nevidljiv.  
let divToggleOff = document.getElementsByClassName("toggleOff")[0]          //U isto vreme divu u kojem se nalazi forma bice dodeljena nova klasa i ona ce postati dostupna klijentu.
let divToggleOn = document.getElementsByClassName("toggleOn")[0]
let btnIzracunaj = document.getElementById("izracunaj")
let btnResetuj = document.getElementById("resetuj")

btnZapocni.addEventListener ( "click", ()=> {
    divToggleOff.classList.add("toggleOn")
    divToggleOn.classList.remove("toggleOn")
    divToggleOn.classList.add("after")
})

let inputRuze = document.getElementById("ruze");                // Prikupljamo sve potrebne varijable iz HTML fajla
let inputLjiljani = document.getElementById("ljiljani");
let inputGerberi = document.getElementById("gerberi");
let inputPokloni = document.getElementsByName("inputPokloni")
let inputPlacanje = document.getElementsByName("inputPlacanje")
let outputPorudzbina = document.querySelector("section:last-of-type")

let ukupnoCvece = 0; 
let ukupnoPokloni = 0;
let popust = false;

console.log(outputPorudzbina);

btnIzracunaj.addEventListener("click", e => {
    let cenaRuza = 0;
    let cenaLjiljana = 0;
    let cenaGerbera = 0;
    let brojac = 0;
    let unosRuza = "";
    let unosLjiljana = "";
    let unosGerbera = "";
    let unosPoklona = "";
    let ukupnoPlatiti = 0;
    let cenaNakonPopusta = 0;
    let tekstNakongPopusta = "";
    let tekstPrePopusta = "";
    let tekstBezPopusta = "";

    if (inputRuze.value != "") {
        let ruze = Number(inputRuze.value);
        if ( Number.isInteger(ruze) && ruze >= 0) { 
            cenaRuza = ruze * 150;
        } else { 
            alert("Molimo Vas koristite cele, pozitivne brojeve prilikom odabira cveća.")
            return
        }
    }

    if (inputLjiljani.value != "") {
        let ljiljani = Number(inputLjiljani.value);
        if ( Number.isInteger(ljiljani) && ljiljani >= 0) { 
            cenaLjiljana = ljiljani * 150;
        } else { 
            alert("Molimo Vas koristite cele, pozitivne brojeve prilikom odabira cveća.")
            return
        }
    }

    if (inputGerberi.value != "") {
        let gerberi = Number(inputGerberi.value);
        if ( Number.isInteger(gerberi) && gerberi >= 0) { 
            cenaGerbera = gerberi * 70;
        } else { 
            alert("Molimo Vas koristite cele, pozitivne brojeve prilikom odabira cveća.")
            return
        }
    }
    
    inputPokloni.forEach(poklon => {
        if (poklon.checked) { 
            brojac ++;
            unosPoklona += `<p>+${poklon.value}</p><br>`
        }
    })

    inputPlacanje.forEach(placanje => {
        if ( placanje.checked && placanje.value=="kartica" ) {
            popust = true;
        }
    })
    for(let i = 1; i <= inputRuze.value; i++) { 
        unosRuza += `<img src="https://freesvg.org/img/1507408357.png" alt="slika ruze" style=" height: 40px;">`
    }
    unosRuza +=`<br>`
    for(let i = 1; i <= inputLjiljani.value; i++) { 
        unosLjiljana += `<img src="https://www.svgrepo.com/show/150750/lily.svg" alt="slika ljiljana" style=" height: 40px;">`
    }
    unosLjiljana +=`<br>`
    for(let i = 1; i <= inputGerberi.value; i++) { 
        unosGerbera += `<img src="https://cdn.pixabay.com/photo/2020/02/19/21/34/red-4863366_1280.png" alt="slika gerbera" style=" height: 40px;">`
    }
    unosGerbera +=`<br>`

    ukupnoPokloni = brojac * 500;
    ukupnoCvece = cenaRuza + cenaLjiljana + cenaGerbera;
    ukupnoPlatiti = ukupnoPokloni + ukupnoCvece;
    cenaNakonPopusta = ukupnoPlatiti * 0.9;
    tekstPrePopusta = document.createElement("p");
    tekstPrePopusta.textContent = `Cena bez popusta je ${ukupnoPlatiti}`
    tekstNakongPopusta = document.createElement("p");
    tekstNakongPopusta.textContent = `Cena nakon popusta je ${cenaNakonPopusta}`
    tekstBezPopusta = document.createElement("p");
    tekstBezPopusta.textContent = `Vaš račun iznosi ${ukupnoPlatiti}.`

    if(ukupnoPlatiti > 2000 && popust == true) { 
        outputPorudzbina.innerHTML = unosRuza + unosLjiljana + unosGerbera + unosPoklona;
        outputPorudzbina.append(tekstPrePopusta);
        outputPorudzbina.append(tekstNakongPopusta);
    } else { 
        outputPorudzbina.innerHTML = unosRuza + unosLjiljana + unosGerbera + unosPoklona;
        outputPorudzbina.append(tekstBezPopusta);
    }


    console.log(popust)

    console.log(ukupnoCvece);

    e.preventDefault();
})
btnResetuj.addEventListener("click", ()=> {
    outputPorudzbina.textContent = "";
})
