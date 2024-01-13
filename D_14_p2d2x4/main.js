import Knjiga from "./knjige.js";

// kreiramo objekte 
let knjiga1 = new Knjiga( "Planet of the Apes", "Pierre Boulle", 1963, 272, 1200);
let knjiga2 = new Knjiga( "The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 1979, 665, 9600);
let knjiga3 = new Knjiga( "Solaris", "Stanisław Lem", 1961, 224, 720);
let knjiga4 = new Knjiga( "Animal Farm", "George Orwell", 1945, 144, 560);
let knjiga5 = new Knjiga( "Fire & Blood", "George Raymond Richard Martin", 2018, 736, 8200);
// deklarisemo niz objekata
let knjige = [knjiga1, knjiga2, knjiga3, knjiga4, knjiga5];

knjige.forEach( k => {                      //iteriramo kroz niz knjiga
    if (k.dugackoIme()) {                   // uz pomoc metode trazimo sve autore cije ime sadrzi preko 18 karaktera
        console.log(k.autor);               // ako je uslov zadovoljen ispisujemo ime
    }
})

for( let k of knjige) {                     //iteriramo kroz niz knjiga
    if( k.skupa() && k.obimna()) {          // trazimo sve knjige koje zadovoljavaju oba uslova iz metoda
        console.log(k);                     // ispisujemo ako su uslovi zadovoljeni
    }
}

let ukupnaCena = niz =>  {                  // kreiramo funkciju koja prolazi kroz sve clanove niza i sabira cene knjiga
    let suma = 0;
    niz.forEach( k => { 
        suma += k.cena;
    })
    return suma;                           // vracamo dobijenu vrednost
}
console.log(`Ukupna cena svih knjiga iz niz iznosi: ${ukupnaCena(knjige)} dinara.`); // poziv funkcije 

let prosecnaCena = niz => { 
    return ukupnaCena(niz) / niz.length;    // kreiramo funkciuju koja vraca prosecnu cenu knjiga iz niza
}
console.log(`Prosecna cena knjiga iz niza iznosi ${prosecnaCena(knjige)} dinara.`); // poziv funkcije

let prosecnaStranica = niz => { 
    let zbirStranica = 0;
    niz.forEach( k => {                         // iteriramo kroz sve knjige i sabiramo sve stranice 
        zbirStranica += k.brojStrana;
    })
    return ukupnaCena(niz) / zbirStranica;     // vracamo podeljnu vrednost ukupne kolicine stranica i ukupne cene knjiga
}
console.log(`Prosecna cena jedne stranice knjige je ${ prosecnaStranica(knjige)} dinara.`);     // poziv funkcije