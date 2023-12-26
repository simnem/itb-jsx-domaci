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
knjige.forEach( k => {      
    let procitanoBoja = "grey";
    let bojaPozadine = "#fefae0";
    if (k.polje == true){
        procitanoBoja = "blue";
     }
    if (brojac % 2 == 0) { 
        bojaPozadine ="#606c38";
    }
    brojac ++;
    tabelaHTML += `<tr style="background-color: ${bojaPozadine}">
                    <td><img src="${k.urlPutanja}" alt="Slika naslovne strane ${k.naziv}" style="width: 20vh; height: auto;"/></td> 
                    <td><p style="color: ${procitanoBoja}; font-size: 35px; font-family:Sans-Serif; text-align: center;">"${k.naziv}", roman autora ${k.autor}</p"></td>
                  </tr>`;
    }
)
tabelaHTML += "</table>";

document.body.innerHTML += tabelaHTML;