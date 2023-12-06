// Zadatak 1
let n = 27;
let v = 80;

let propisi = v / n;

let visakLjudi = n - (v / 3);
visakLjudi = Math.ceil(visakLjudi);

if (propisi >= 3) {
    document.write(`<p style="color:green">DA</p>`);
}else {
    document.write(`<p style="color:red">NE.Potrebno je ${visakLjudi} osobe izadju</p>`);
}

// Zadatak 2
let ukupanBrojStanovnika =  6664449;
let ukupnoTestiranoStanovnistvo = 19091;
let ukupanBrojPozitivnih = 5805;

let procenatOdTestiranog = (ukupanBrojPozitivnih / ukupnoTestiranoStanovnistvo) * 100;
let procenatOdUkupnog = (ukupanBrojPozitivnih / ukupanBrojStanovnika) * 100;

if ( procenatOdTestiranog > 30 || procenatOdUkupnog > 10) {
    document.write(`<p style="color:red">VANREDNO STANJE!</p>`);
}
