const nbaPlayers = new XMLHttpRequest();

// Prosecna visina
nbaPlayers.addEventListener("readystatechange", function(){ 
    if( nbaPlayers.readyState === 4 && nbaPlayers.status === 200) {         // Proveravamo da li je zahtev uspesno izvrsen
        let podaci = JSON.parse(nbaPlayers.responseText)                    // Konvertujemo JSON u objekat
        let ukupnaVisina = 0;                                               // Trazimo prosecnu visinu igraca
        podaci.forEach( p => { 
            ukupnaVisina += p.visina;
        })
        let prosecnaVisina = ukupnaVisina / podaci.length
        console.log(`Prosecna visina kosarkasa iznosi: ${prosecnaVisina}`)
    } else if (nbaPlayers.readyState === 4) {                               // Ispisujemo gresku ukoliko se nismo uspesno povezali sa serverom
        console.log(`Doslo je do greske`)
    }
})
// Igrac sa najmanje transfera
nbaPlayers.addEventListener("readystatechange", function(){ 
    if( nbaPlayers.readyState === 4 && nbaPlayers.status === 200) {         // Proveravamo da li je zahtev uspesno izvrsen
        let podaci = JSON.parse(nbaPlayers.responseText)                    // Konvertujemo JSON u objekat
        let minTrans = podaci[0].timovi.length;                             // Trazimo igraca sa najmanjim brojem transfera
        let index = 0;
        podaci.forEach( (p, i) => {
            if( p.timovi.length < minTrans) { 
                minTrans = p.timovi.length;
                index = i;
            }
        })
        console.log(`Igrac sa najmanjim brojem transfera je ${podaci[index].imePrezime}`)
    } else if (nbaPlayers.readyState === 4){                                // Ispisujemo gresku ukoliko se nismo uspesno povezali sa serverom
        console.log(`Doslo je do greske`)
    }
})
// Igraci koji su nastupali za Lejkerse
nbaPlayers.addEventListener("readystatechange", function(){ 
    if( nbaPlayers.readyState === 4 && nbaPlayers.status === 200) {                 // Proveravamo da li je zahtev uspenso izvresen
        let podaci = JSON.parse(nbaPlayers.responseText)                            // Konvertujemo JSON u objekat
        podaci.forEach( p => {                                                      // Trazimo sve igrace koji su nastupali za Lejkerse
            p.timovi.forEach( t =>  {
                if ( t == "Lakers") {
                    console.log(`Igrac ${p.imePrezime} je nastupao za Lejkerse.`)
                }
            })
        })
    } else if (nbaPlayers.readyState === 4) {                                       // Ispisujemo gresku ukoliko se nismo uspesno povezali sa serverom
        console.log(`Doslo je do greske`)
    }
})
// Saljemo zahev za povezivanje za serverom
nbaPlayers.open("GET", "http://localhost:3000/sportisti"); 
nbaPlayers.send();