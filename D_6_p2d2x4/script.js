//  ZADATAK 1
let ukupanNovac = 2000;
let autobuskaKarta = Math.floor(ukupanNovac / 5); 
let smestaj = Math.floor(ukupanNovac / 3);
let preostaliNovac = ukupanNovac - autobuskaKarta - smestaj;

console.log("Putniku je preostalo " + preostaliNovac + " dinara.");

// ZADATAK 2
let brojPoglavlja = 12;
let prviDan = 4;
let drugiDan = prviDan + 2;
preostalaPoglavlja = brojPoglavlja - prviDan - drugiDan;

console.log("Čitaocu je preostalo da pročita još " + preostalaPoglavlja + " poglavlja.");

// ZADATAK 3 
let dinPera = 1240;
let dinMika = 1955;
let kusur = 900; 

let cenaDzempera = (dinPera + dinMika - kusur) / 2;
let kusurMika = Math.floor(dinMika - cenaDzempera);
let kusurPera =  Math.floor(dinPera- cenaDzempera);

console.log("Peri pripada " + kusurPera + " dinara od ukupnog kusura, a Miki pripada " + kusurMika + " od ukupnog kusura.");