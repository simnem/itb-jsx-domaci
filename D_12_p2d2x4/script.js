let dan = {                                                                 // ispis vrednosti objekta
    datum: "2023/12/23",
    kisa: true,
    sunce: true, 
    oblacno: true,
    temperature: [33, 34, 26, 27, 26, -13],
    tropskaTemperatura: function () {                                       // funkcija prolazi kroz vrednosti u nizu temperature, proverava da li je prelazila 24 stepena
        let provera = true;
        this.temperature.forEach( temp => {
            if (temp < 24) {
                provera = false;                                            // u slucaju da je temperatura pala ispod 24 stepena, dodeljuje vrednost false promenjivoj
            }
        })
    return provera;                                                         // vraca boolean vrednost koja se nalazi unutar promenjive provera
    },
    proveraTempIspod: function() {                                          // funkcija proverava da li je temperatura padala ispod -5 stepeni i da li je padala kisa
        let provera = false;
        this.temperature.forEach(temp =>{                                   // prolazi se kroz niz temperature, uporedjuje vrednosti sacuvane u varijabli 
            if(this.kisa == true && temp < -5) {                            // vraca boolean vrednost true ukoliko je padala kisa i temperatura bila ispod -5 stepeni
                provera = true;
            } else {
                provera = false;
            }
        })
        return provera                                                      // vraca vrednost sacuvanu u promenjivoj provera
    },
    proveraTempIznad: function() {                                          // funkcija prolazi kroz vrednosti u nizu temperature, proverava da li je prelazila 25 stepena i da li je bilo oblacno
        let provera = false; 
        this.temperature.forEach(temp =>{ 
            if(this.oblacno == true && temp > 25) {                         // u slucaju da je temperatura bila iznad 25 stepeni i da je bilo oblacno dodeljuje boolean vredsnost true promenjivoj
                provera = true;
            } else {                                                        // u suportnom joj dodeljuje vrednost false
                provera = false;
            }
        })
        return provera;                                                     // vraca vrednost sacuvanu u promenjivoj provera

    },
    proveraVremenskihPrilika: function() {                                  // funkcija proverava da li je u toku dana padala kisa, bilo oblacno i suncano
        if( this.kisa == true && this.oblacno == true && this.sunce == true) {  // u slucaju da su sve ove vremenske prilike evidentirale, funkcija vraca boolean vrednost true
            return true;
        } else {
            return false;
        }
    },
    neuobicajanDan: function() {                                            // funkcija zove tri prethodne funkcije, proverava ih i vraca odgovarajuci boolean vrednost
        if(this.proveraTempIspod() == true || this.proveraTempIznad() == true || this.proveraVremenskihPrilika() == true) { // potrebna je samo jedna funkcija da vrati boolean vrednost true 
            return true;                                               
        } else {
            return false;
        }
    }
}
console.log(`Dan je bio tropski: ${dan.tropskaTemperatura()}`);         // u konzoli se ispisuje vrednost koju vraca funkcija 
console.log(`Dan je bio neuobicajan: ${dan.neuobicajanDan()}`);         // u konzoli se ispisuje vrednost koju vraca funkcija 