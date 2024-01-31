const form = document.getElementById("form");
const divContainer = document.querySelector(".container");


if(localStorage.usernameNBA == null) { 
    createInputField()
} else{ 
    let user = JSON.parse(localStorage.getItem("usernameNBA"))
    difficultyAdjustment(user)
}

form.addEventListener("keypress", e => { 
    if(e.key === "Enter") { 
        const username = document.getElementById("username").value 
        console.log(username, username.length, username.trim())
        if( username.length < 16 && username.length >= 3 && username.trim() != ""){ 
            localStorage.setItem("usernameNBA", JSON.stringify(username))
            let user = username;
            difficultyAdjustment(user, createInputField())
        } else { 
            alert("Please insert valid username. Username must be between 3 and 15 characters long.")
        }   
    }  
})

form.addEventListener("submit", e => { 
    e.preventDefault();
    let radioBtn = document.querySelector("input[type=radio]:checked")
    divContainer.innerHTML = '';    
    startGame(divContainer, radioBtn).then( data => { 
        let cards = cardShuffle(data);
        return cardField(cards)
    }).then(

    ).catch( msg => { 
        console.log(msg)
    });
})

function createInputField(){ 
    form.innerHTML = '';
    let welcome = document.createElement("h1")
    let fieldset = document.createElement("fieldset");
    let inputUser = document.createElement("input");
 
    welcome.textContent = "Welcome to NBA Memory Game"
    fieldset.textContent = "Please choose a username & press ENTER to continue";
    inputUser.type = "text";
    inputUser.id = "username";
    form.append(welcome, fieldset, inputUser);
}
function difficultyAdjustment(user, cb) {
    form.innerHTML = ''; 
    let welcome = document.createElement("h1");
    welcome.textContent = `Welcome ${user}, please select level of difficulty`
    let linkChangeUser = document.createElement("a");
    linkChangeUser.textContent = `Not ${user}? Would you like to change user?`
    linkChangeUser.addEventListener("click", ()=> { 
        cb();
    })
    let textDifficultly = document.createElement("p");
    textDifficultly.textContent = "Please select the level of difficulty:"
    form.append(welcome, linkChangeUser, textDifficultly)
    for( let i = 0; i < 4; i++) { 
        let opt = document.createElement("input");
        opt.type = "radio";
        opt.name = "difficulty"
        opt.id = `opt${i+1}`;
        if ( i == 0) {
            opt.checked = true;
        }
        let label = document.createElement("label");
        label.htmlFor = `opt${i+1}`;
        switch (i) { 
            case 0:
                label.textContent = "Easy";
                opt.value = 16;
                break;
            case 1:
                label.textContent = "Normal";
                opt.value = 36;
                break; 
            case 2:
                label.textContent = "Hard";
                opt.value = 50;
                break; 
            case 3:
                label.textContent = "Expert";
                opt.value = 100;
                break; 
        }
        form.append(opt, label)
    }
    let btnSubmit = document.createElement("input");
    btnSubmit.type = "submit";
    btnSubmit.value = "Start"
    form.appendChild(btnSubmit)
}
function startGame(container, radio) { 
    let div = document.createElement("div");

    div.classList.add("alert");
    div.textContent = "Get ready, the game is about to start!"
    document.body .prepend(div);
    return new Promise((resolve, reject) => {
        let totalFields = radio.value;
        if ( Number(totalFields) && totalFields > 0) { 
            setTimeout( () => { 
        
                div.style.display = "none";
                container.classList.add('start');
                resolve(totalFields)
            }, 1500)
        } else  {
            reject("Error acquired.")
        }
    })
}
function cardField(totalFields) { 
    let div = document.createElement("div");
    div.classList.add("backgroundContainer")
    divContainer.appendChild(div)
    totalFields.forEach( i => { 
        createCard(i, div, totalFields)
    })
    switch(totalFields.length) {
        case 16: 
            div.style.width = "100vh";
            break;
        case 36: 
            div.style.width = "100vh";
            break;
        case 50: 
            div.style.width = "120vh";
            break;
        case 100: 
            div.style.width = "100vh";
            break;
    }
}
function createCard(i, div, totalFields) { 
    let img = document.createElement("img");
    let divBackground = document.createElement("div");
    divBackground.style.backgroundColor = "#fff";
    switch(totalFields.length){ 
        case 16:
            img.style.width = "160px";
            img.style.height = "160px";
            divBackground.style.width = "200px";
            break;
        case 36:
            img.style.width = "120px";
            img.style.height = "120px";
            divBackground.style.width = "140px";
            break;
        case 50:
            img.style.width = "100px";
            img.style.height = "100px";
            divBackground.style.width = "110px";
            break;
        case 100:
            img.style.width = "70px";
            img.style.height = "70px";
            divBackground.style.width = "80px";
            divBackground.style.height = "80px";
            break;
        }
    img.src = `assets/${i}.png`;
    img.classList.add("backSide")
    divBackground.classList.add("frontSide")
    divBackground.appendChild(img);
    div.appendChild(divBackground);
}
function cardShuffle (cards) { 
    let tempArrImages = [];
    let i = 1;
    while ( i <= cards / 2) { 
        let num = Math.ceil(Math.random() * 50);

        if(!tempArrImages.includes(num)) {
            tempArrImages.push(num);
            i++;
        };
    };
    let newArray = tempArrImages.concat(tempArrImages);
    let n = newArray.length;
    for ( let i = 0; i < n; i++) { 
        let temp = newArray[i];
        let num = Math.floor(Math.random()* n);
        newArray[i] = newArray[num];
        newArray[num] = temp;
    }
    return(newArray);
}