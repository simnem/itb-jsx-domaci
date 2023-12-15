// 1. Zadatak
// Napisati funkciju kojoj se prosleđuje ceo broj i string, a ona ispisuje taj string u paragrafu koji ima prosleđenu veličinu fonta.

function ispisStringa(ceoBroj, ceoString) {
    document.body.innerHTML += `<p style="font-size:${ceoBroj}px">${ceoString}</p>`
}
ispisStringa(164, "Lorem ipsum dolor sit amet.")

// 2. Zadatak
// Napraviti funkciju kojoj se prosleđuje n ceo broj veći od nule, jedan string koji će predstavljati boju, drugi string koji će takođe predstavljati boju i treći string koji će predstavljati putanju do neke slike.
// Funkcija treba da na stranicu dodaje n puta sliku čiju smo putanju prosledili funkciji. Slikama koje su na parnim pozicijama postavljati okvir koji je obojen prvom prosleđenom bojom, slikama koje su na neparnim pozicijama postavljati okvir koji je obojen drugom prosleđenom bojom.

function dodeljivanjeSlike(ceoBroj, prvaBoja, drugaBoja, putanja) {
    for( let i = 1; i <= ceoBroj; i++){
        if (i % 2 == 0) {
            document.body.innerHTML += `<img src="${putanja}" style="border: 2px solid ${prvaBoja}" alt="Slika sa parnim okvirom" />`
        } else {
            document.body.innerHTML += `<img src="${putanja}" style="border: 2px solid ${drugaBoja}" alt="Slika sa neparnim okvirom"/>`
        }
    }
}

let n = 18;
let jedanString = "red";
let drugiString = "green"
let treciString = "https://itbootcamp.rs/wp-content/uploads/2018/03/logo_itbootcamp_300x140.png"

dodeljivanjeSlike(n, jedanString, drugiString, treciString);