//Prilikom klika na dugme "Zapocnite", pocetni ekran ce dobiti novu klasu i postati nevidljiv.  
//U isto vreme divu u kojem se nalazi forma bice dodeljena nova klasa i ona ce postati dostupna klijentu.
let divToggleOn = document.getElementsByClassName("toggleOn")[0];    
let btnZapocni = document.getElementById("zapocni");                         
let divToggleOff = document.getElementsByClassName("toggleOff")[0];          
let btnIzracunaj = document.getElementById("izracunaj");
let btnResetuj = document.getElementById("resetuj");

btnZapocni.addEventListener ( "click", ()=> {
    divToggleOff.classList.add("toggleOn");
    divToggleOn.classList.remove("toggleOn");
    divToggleOn.classList.add("after");
});

// Prikupljamo sve potrebne varijable iz HTML fajla
let inputRuze = document.getElementById("ruze");                
let inputLjiljani = document.getElementById("ljiljani");
let inputGerberi = document.getElementById("gerberi");
let inputPokloni = document.getElementsByName("inputPokloni");
let inputPlacanje = document.getElementsByName("inputPlacanje");
let outputPorudzbina = document.querySelector(".porudzbina div:last-of-type");

// Varijable koje ce sluziti za izracunavanje cene
let ukupnoCvece = 0; 
let ukupnoPokloni = 0;
let popust = false;
// Kreiramo funkciju koja ce proveravati da li je klijent uneo adekvatne podatke
let proveraUnetihVrednosti = (a, b, c) => { 
    let provera = false;
    if ( Number.isInteger(a) && a >= 0 && Number.isInteger(b) && b >= 0 && Number.isInteger(c) && c >= 0) {
        provera = true;
    }
    return provera;
}

// Prilikom klika na dugme "Izracunaj" na ekranu ce se prikazati artikli koje je klijent izabrao
btnIzracunaj.addEventListener("click", e => {
    e.preventDefault();
    // Deklarisanje varijabli
    let cenaRuza = 0;           
    let cenaLjiljana = 0;
    let cenaGerbera = 0;
    let brojac = 0;
    let slikeRuza = "";
    let slikeLjiljana = "";
    let slikeGerbera = "";
    let unosPoklona = "";
    let ukupnoPlatiti = 0;
    let cenaNakonPopusta = 0;
    let tekstNakongPopusta = "";
    let tekstPrePopusta = "";
    let tekstBezPopusta = "";
    let ruze = 0;                                                 
    let ljiljani = 0;
    let gerberi = 0;

    if (inputRuze.value != "") {                                                        // proveravamo da li je korisnik uneo vrednosti za cvece
        ruze = Number(inputRuze.value);
    } 
    if (inputLjiljani.value != "") {
        ljiljani = Number(inputLjiljani.value);
    } 
    if (inputGerberi.value != "") {
        gerberi = Number(inputGerberi.value);
    }                                                         
       
       
    if ( proveraUnetihVrednosti(ruze, ljiljani, gerberi) == true) {                     // pozivamo funkciju
        cenaRuza = ruze * 150;                                                          // ukoliko funkcija vrati true izracunavamo cene za cveca
        cenaLjiljana = ljiljani * 120;
        cenaGerbera = gerberi * 70;                                                          
    } else { 
        alert("Molimo Vas koristite cele, pozitivne brojeve prilikom odabira cveća.");   // u suprotnom ga obavestavamo da je neophodno uneti ceo pozitivan broj
        return
    }
    

    inputPokloni.forEach(poklon => {                                                        // iteriramo kroz sve poklone koji se nalaze u nizu i proveravamo da li je korisnik izabrao ijedan
        if (poklon.checked) { 
            brojac ++;
            unosPoklona += `<p>+${poklon.value}</p><br>`;
        }
    });

    inputPlacanje.forEach(placanje => {                                                     // prolaziko kroz sve nacine placanja i ukoliko je izabrano karticno placanje menjamo popust u true
        if ( placanje.checked && placanje.value=="kartica" ) {
            popust = true;
        }
    });
    for(let i = 1; i <= inputRuze.value; i++) {                                             // uzimamo broj narucenih ruza i za svaku dodajemo po jednu sliku
        slikeRuza += `<img src="https://freesvg.org/img/1507408357.png" alt="slika ruze" style=" height: 40px;">`
    };
    slikeRuza +=`<br>`;
    for(let i = 1; i <= inputLjiljani.value; i++) {                                          // uzimamo broj narucenih ljiljana i za svaku dodajemo po jednu sliku
        slikeLjiljana += `<img src="https://www.svgrepo.com/show/150750/lily.svg" alt="slika ljiljana" style=" height: 40px;">`
    };
    slikeLjiljana +=`<br>`;
    for(let i = 1; i <= inputGerberi.value; i++) {                                           // uzimamo broj gerbera i za svaki dodajemo po jednu sliku
        slikeGerbera += `<img src="https://cdn.pixabay.com/photo/2020/02/19/21/34/red-4863366_1280.png" alt="slika gerbera" style=" height: 40px;">`
    };
    slikeGerbera +=`<br>`;

    ukupnoPokloni = brojac * 500;                                                           // izracunavamo ukupne cene
    ukupnoCvece = cenaRuza + cenaLjiljana + cenaGerbera;
    ukupnoPlatiti = ukupnoPokloni + ukupnoCvece;
    cenaNakonPopusta = ukupnoPlatiti * 0.9;                                                 // obracunavamo popust
    tekstPrePopusta = document.createElement("p");                                          // kreiranje elementa p
    tekstPrePopusta.textContent = `Cena bez popusta je ${ukupnoPlatiti}`;                    // dodavanje teksta
    tekstNakongPopusta = document.createElement("p");
    tekstNakongPopusta.textContent = `Cena nakon popusta je ${cenaNakonPopusta}`;
    tekstBezPopusta = document.createElement("p");
    tekstBezPopusta.textContent = `Vaš račun iznosi ${ukupnoPlatiti}.`;

    if(ukupnoPlatiti > 2000 && popust == true) {                                             // provera uslova za popust
        outputPorudzbina.innerHTML = slikeRuza + slikeLjiljana + slikeGerbera + unosPoklona; // ukoliko su ispunjeni dodajemo slike cveca u div porudzbine
        outputPorudzbina.append(tekstPrePopusta);                                            // takodje ispisujemo cenu pre popusta
        outputPorudzbina.append(tekstNakongPopusta);                                         // i nakon
    } else {                                                                                 // u slucaju da uslovi za popust nisu ispunjeni, dodajemo slike i cenu bez popusta u div porudzbine
        outputPorudzbina.innerHTML = slikeRuza + slikeLjiljana + slikeGerbera + unosPoklona;   
        outputPorudzbina.append(tekstBezPopusta);
    }
});

// Pritiskom na dugme Resetuj, brisemo sadrzaj koji se nalazi u divu Porudzbine
btnResetuj.addEventListener("click", ()=> {                                                 
    outputPorudzbina.textContent = "";
});
