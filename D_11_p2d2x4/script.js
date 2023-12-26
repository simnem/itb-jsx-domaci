// Test niz 
let tempNiz = [8, 12, 15, 12.7, 9];

// Zadatak 1
let prosecnaTemp = niz => {
    let zbir = 0;
    niz.forEach(e =>{             // petlja prolazi kroz sve clanove niza
        zbir += e;                // i dodaje ih varijabli
    })
    return zbir / niz.length;     // return vraca prosecnu vrednost niza
}
let temperaturaNajblizaProsecnoj = niz => { 
    let prosek = prosecnaTemp(niz);        // poziv funkcije koja vraca prosecnu vrednost
    let najbliza = niz[0];                 // deklarisanje privremene najblize vrednosti
    console.log(prosek);
    niz.forEach(e => {                    // petlja trazi najblizu vrednost prosecnoj
        if (Math.abs(prosek - e) < Math.abs(prosek - najbliza)) {
            najbliza = e;
        }
    })
    return najbliza;                     // vraca najblizu vrednost prosecnoj u nizu
}
console.log(`Najbliza temperatura prosecnoj je ${temperaturaNajblizaProsecnoj(tempNiz)}`);  // ispisuje najblizu vrednost prosecnoj

// Zadatak 2
let maksimalnaTemperatura = niz => {
    maks = niz[0];                      // privremena maksimalna vrednost
    niz.forEach(e => {                  // petlja koja trazi maksimalnu vrednost 
        if ( e > maks) { 
            maks = e;
        }
    })
    return maks;                        // vraca maksimalnu vrednost niza 
}
let mininmalnaTemperatura = niz => { 
    min = niz[0];                       // privremena minimalna vrednost
    niz.forEach( e => {                 // petlja koja trazi minimalnu vrednost
        if (e < min) { 
            min = e;
        }
    })
    return min;                         // vraca minimalnu vrednost niza
}
let ispisTemperatura = niz => { 
    let minTemp = mininmalnaTemperatura(niz);               // poziv funkcije koja trazi minimalnu vrednost u nizu
    let maksTemp = maksimalnaTemperatura(niz);              // poziv funkcije koja trazi maksimalnu vrednost u nizu
    let najblizaTemp = temperaturaNajblizaProsecnoj(niz);   // poziv funkcije koja trazi vrednost u nizu koja je najbliza prosecnoj
    niz.forEach ( e => {
        if( e == maksTemp) {                                                // ako je temperatura ista kao maksimalna ispisuje je crvenom bojom
            document.body.innerHTML += `<p style="color: red">${e} </p>`;
        } else if ( e == minTemp) {                                         // ako je temperatura ista kao minimalna ispisuje je plavom bojom
            document.body.innerHTML += `<p style="color: blue">${e} </p>`;
        } else if( e == najblizaTemp) {                                     // ako je temperatura najbliza prosecnoj ispisuje je zutom bojom
            document.body.innerHTML += `<p style="color: yellow">${e} </p>`;
        } else {
            document.body.innerHTML += `<p>${e} </p>`;                      // u svim ostalim slucajevima ispisuje je u crnoj boji, defaultnoj
        }
    })
};

ispisTemperatura(tempNiz);                                      //poziv funkcije koja ispisuje temperature