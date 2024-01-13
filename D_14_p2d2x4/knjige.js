class Knjiga {
    constructor(n, a, g, b, c) { 
        this.naslov = n;
        this.autor = a;
        this.godIzdanja = g;
        this.brojStrana = b;
        this.cena = c;
    }

    // seteri
    set naslov(n) { 
        this._naslov = n;
    };
    set autor(a) { 
        this._autor = a;
    };
    set godIzdanja(g) { 
        this._godIzdanja = g;
    };
    set brojStrana(b) { 
        this._brojStrana = b;
    };
    set cena(c) { 
        this._cena = c;
    }

    // geteri
    get naslov() {
        return this._naslov
    };
    get autor() {
        return this._autor
    };
    get godIzdanja() {
        return this._godIzdanja
    };
    get brojStrana() {
        return this._brojStrana
    };
    get cena() {
        return this._cena
    };

    // metode 
    stampaj() {
        console.log(`Naslov knjige je "${this.naslov}", od autora ${this.autor}. Knjiga je napisana ${this.godIzdanja} godine, i prostire se na ${this._brojStrana}. Ovo delo kreće po ceni od ${this.cena} dinara.`);
    }
    obimna() { 
        return (this.brojStrana > 600) ? true : false;
    }
    skupa() {
        return (this.cena > 8000) ? true : false; 
    }
    dugackoIme() {
        return (this.autor.length > 18) ? true : false;
    }
}

export default Knjiga;