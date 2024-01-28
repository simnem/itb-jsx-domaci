// Deklarisanje potrebnih variabli i dodedal vrednosti
let colMovies = db.collection("movies");

class Movie { 
    constructor( n, d, y, g, r) {
        this.name = n;
        this.director = d;
        this.release_year = y;
        this.genres = g;
        this.rating = r;
    }
}

let movie1 = new Movie ( 
    "Inception", 
    {name: "Christopher", last_name: "Nolan"},
    2010,
    ["Sci-fi", "Adventure"],
    8.8
);

let movie2 = new Movie (
    "Fight Club",
    {name: "David", last_name: "Fincher"},
    1999,
    ["Action", "Thirller"],
    8.8
);

let movie3 = new Movie ( 
    "Interstellar",
    {name: "Christopher", last_name: "Nolan"},
    2014,
    ["Sci-fi", "Adventure"],
    8.7
);

let arrayMovies = [movie1, movie2, movie3];

// Dodavanje dokumenata kolekciji
function addNewMovie(array) { 
    for ( let i = 0; i < array.length; i++) { 
        colMovies.doc(`movie${i+1}`).set(Object.assign({},array[i]))
        .then( () => { 
            console.log("Uspesno dodat film.");
        })
        .catch( e => { 
            console.log("Doslo je do greske: " + e);
        });
    }
};

// Izmena naziva filma
function changeName (dokument, naslov) {
    colMovies.doc(`${dokument}`).update({
        name: naslov
    })
    .then( () => { 
        console.log("Uspesno izmenjen naslov filma.");
    })
    .catch( e => { 
        console.log("Doslo je do greske: " + e);
    });
};
// Dodavanje zanra
function addNewGenre ( dokument, zanr) {
    let movie = colMovies.doc(`${dokument}`);
    movie.update({
        genres : firebase.firestore.FieldValue.arrayUnion(zanr)
    })
    .then( () => { 
        console.log("Uspesno dodat zanr.");
    })
    .catch( e => { 
        console.log("Doslo je do greske: " + e);
    });
}
// Uklanjanje zanra
function removeGenre ( dokument, zanr) {
    let movie = colMovies.doc(`${dokument}`);
    movie.update({
        genres : firebase.firestore.FieldValue.arrayRemove(zanr)
    })
    .then( () => { 
        console.log("Uspesno uklonjen zanr.");
    })
    .catch( e => { 
        console.log("Doslo je do greske: " + e);
    });
}
// Izmena imena rezisera
function directorNameChange(dokument, novoIme) { 
    let movie = colMovies.doc(`${dokument}`);
    movie.update( { 
        "director.name": novoIme
    })
    .then( () => { 
        console.log("Uspesno izmenjeno ime rezisera.");
    })
    .catch( e => { 
        console.log("Doslo je do greske: " + e);
    });
};
addNewMovie(arrayMovies);
changeName("movie2", "Guardians of the Formula");
addNewGenre("movie1", "Romance");
removeGenre("movie1", "Adventure");
directorNameChange("movie3", "Rados");

