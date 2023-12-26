let knjiga1 = {                                                 // deklariasanje objekta i dodela vrednosti 
    naziv: "The Hitchhiker's Guide to the Galaxy",
    autor: "Douglas Adams",
    urlPutanja: "https://shorturl.at/lnARW",
    polje: true
};       
let knjiga2 = {                                                 // deklariasanje objekta i dodela vrednosti 
    naziv: "Planet of the Apes",
    autor: "Pierre Boulle",
    urlPutanja: "https://shorturl.at/quyJ8",
    polje: false
};
let knjiga3 = {                                                 // deklariasanje objekta i dodela vrednosti 
    naziv: "Nineteen Eighty-Four",
    autor: "George Orwell",
    urlPutanja: "https://shorturl.at/myIU5",
    polje: false
};
let knjiga4 = {                                                 // deklariasanje objekta i dodela vrednosti 
    naziv: "Solaris",
    autor: "Stanisław Lem",
    urlPutanja: "https://shorturl.at/afBKR",
    polje: true
};

let knjige = [knjiga1, knjiga2, knjiga3, knjiga4];                       // deklarisanje niza objekata


let brojac = 0;
let tabelaHTML = '<table style="margin: 0 auto;">';                                      // deklarisanje variable sa kodom sacuvanim kao string, koji ce kasnije biti dodeljen HTML fajlu
knjige.forEach( k => {                                                                   // iteriramo kroz sve objekte koji se nalaze u nizu knjige
    let procitanoBoja = "grey";                                                          // deklarisanje variable koje ce sluziti kao defaultna vrednosti u koliko uslov nije ispunjen
    let bojaPozadine = "#fefae0";                                                        // deklarisanje variable koje ce sluziti kao defaultna vrednosti u koliko uslov nije ispunjen
    if (k.polje == true){                                                                // proveravamo da li variabla u objektu ispunjava uslov
        procitanoBoja = "blue";                                                          // u koliko ispunjava dodeljujemo joj novu vrednost
     }
    if (brojac % 2 == 0) {                                                               // proveravamo da li variabla u objektu ispunjava uslov
        bojaPozadine ="#606c38";                                                         // u koliko ispunjava dodeljujemo joj novu vrednost
    }
    brojac ++;
    tabelaHTML += `<tr style="background-color: ${bojaPozadine}">                        
                    <td><img src="${k.urlPutanja}" alt="Slika naslovne strane ${k.naziv}" style="width: 20vh; height: auto;"/></td> 
                    <td><p style="color: ${procitanoBoja}; font-size: 35px; font-family:Sans-Serif; text-align: center;">"${k.naziv}", roman autora ${k.autor}</p"></td>
                  </tr>`;
    } // variabli tabelaHTML dodajemo redove i celije u skladu sa zahtevima zadatka
)
tabelaHTML += "</table>";   // dodajemo closing tags tabeli

document.body.innerHTML += tabelaHTML; // ispisujemo tabelu unutar body tag uz pomoc variable 