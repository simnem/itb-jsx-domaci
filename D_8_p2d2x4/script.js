// Zadatak 1
let i = 1;
let brojac = 1;

document.body.innerHTML += `<ul>`

for (i = 1; i <= 10; i++) {
    document.body.innerHTML += `<li>Element ${i}</li>`;
    if (brojac % 2 == 0){
        i += 1;
        document.body.innerHTML += `<ul style="margin:0; list-style-type:circle;"><li style="color: purple;">Element ${i}</li></ul>`;
    }
    brojac++;
}
document.body.innerHTML += `</ul></br>`

// Zadatak 2

let redovi = 1
for (i = 1; i <= 64; i++) {
    if (redovi % 2 != 0){
        if (i % 2 != 0){
            document.body.innerHTML += `<span style="border: 1px solid black; display: inline-block; width: 25px; text-align: center; margin: 10px 0;">${i}</span>`
        }else if (i % 2  == 0) {
            document.body.innerHTML += `<span style="border: 1px solid black; display: inline-block; width: 25px; text-align: center; color:white; background-color:black;">${i}</span>`
        }
        if (i % 8 == 0){
            document.body.innerHTML += `</br>`
            redovi ++
        }
    } else {
        if (i % 2 === 0) {
            document.body.innerHTML += `<span style="border: 1px solid black; display: inline-block; width: 25px; text-align: center;">${i}</span>`;
        } else {
            document.body.innerHTML += `<span style="border: 1px solid black; display: inline-block; width: 25px; text-align: center;color: white; background-color: black;">${i}</span>`;
        }
        if (i % 8 === 0) {
            document.body.innerHTML += '</br>';
            redovi++;
        }
    }
}