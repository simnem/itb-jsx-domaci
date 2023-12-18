// Zadatak 1: Dat je niz stavki za kupovinu (članovi niza su stringovi). Prolaskom kroz niz napraviti neuređenu listu i ispisati je u html dokument.
let spisak = ["Bread", "Meat", "Pasta", "Sauces", "Cereals"]

let stavkeZaKupovinu = niz => {
    let neuredjenaLista = "<ul>";

    for ( i = 0; i < niz.length; i++) {
        neuredjenaLista += `<li>${niz[i]}</li>`
    }

    neuredjenaLista += "</ul>";
    document.body.innerHTML += neuredjenaLista
}
stavkeZaKupovinu(spisak);

// Zadatak 2: Dat je niz imena košarkaških timova. Prolaskom kroz niz formirati tabelu gde svaki od redova ima ćeliju u kojoj se nalazi naziv tima. 
// Tabelu ispisati u html dokument.
let timovi = ["Boston Celtics", "Brooklyn Nets", "New York Knicks", "Philadelphia 76ers", "Toronto Raptors", "Chicago Bulls", "Cleveland Cavaliers", "Detroit Pistons"]

let kosarkaskiTimovi = niz => {
    let tabela = "<table>";
    for (let i = 0; i < niz.length; i++) {
        tabela += `<tr><td>${niz[i]}</td></tr>`;
    }
    tabela += "</table>";
    document.body.innerHTML += tabela;
};
kosarkaskiTimovi(timovi);

// Zadatak 3: Dat je niz stringova čiji su članovi putanje do slika. 
// Prikazati sve slike u html dokumentu, pri čemu su putanje da slika one putanje koje su navedene u nizu.
let slike = ["https://shorturl.at/SUY08", "https://shorturl.at/hNSU8", "https://shorturl.at/hqwGX"]

let putanjaDoSlika = niz => {
    for (let i = 0; i < niz.length; i++){
        document.body.innerHTML += `<img src="${niz[i]}" alt="Pas broj ${i}" style="display:block;"/>`
    }
}
putanjaDoSlika(slike);