const form = document.getElementById("form");
const divContainer = document.querySelector(".container");
const backgroundContainer = document.querySelector(".backgroundContainer")
let counter = 0;
var firstCard;
var secondCard;
var scoreCounter = 0;
var totalFields = 0;


if(localStorage.usernameNBA == null) { 
    createInputField()
} else{ 
    localStorage.removeItem("timeNeededNBA")
    localStorage.removeItem("levelOfDifficultyNBA")
    let user = JSON.parse(localStorage.getItem("usernameNBA"))
    difficultyAdjustment(user)
}

form.addEventListener("keypress", e => { 
    if(e.key === "Enter") { 
        const username = document.getElementById("username").value
        localStorage.removeItem("timeNeededNBA")
        localStorage.removeItem("levelOfDifficultyNBA")
 
        console.log(username, username.length, username.trim())
        if( username.length < 16 && username.length >= 3 && username.trim() != ""){ 
            localStorage.setItem("usernameNBA", JSON.stringify(username))
            let user = username;
            difficultyAdjustment(user)
        } else { 
            alert("Please insert valid username. Username must be between 3 and 15 characters long.")
        }   
    }  
})

form.addEventListener("submit", e => { 
    e.preventDefault();
    var radioBtn = document.querySelector("input[type=radio]:checked")
    totalFields = radioBtn.value

    divContainer.innerHTML = '';    
    startGame(divContainer, totalFields).then( data => { 
        let cards = cardShuffle(data);
        localStorage.setItem("levelOfDifficultyNBA", JSON.stringify(totalFields))
        return cardField(cards)
    }).then( () => {
        return startTimer()
    }).then(() => {
        return highScores()
    }).catch( msg => { 
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
function difficultyAdjustment(user) {
    form.innerHTML = ''; 
    let welcome = document.createElement("h1");
    welcome.textContent = `Welcome, ${user}, please select a level of difficulty`
    let linkChangeUser = document.createElement("a");
    linkChangeUser.textContent = `Not ${user}? Would you like to change the user?`
    linkChangeUser.addEventListener("click", ()=> { 
        localStorage.removeItem("usernameNBA")
        location.reload()
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
    btnSubmit.classList.add("btns")
    form.appendChild(btnSubmit)
}
function startGame(container, totalFields) { 
    let div = document.createElement("div");

    div.classList.add("alert");
    div.textContent = "Get ready, the game is about to start!"
    document.body.prepend(div);
    return new Promise((resolve, reject) => {
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
    new Promise ( (resolve, reject) => {
        let div = document.createElement("div");
        let divForCards = document.createElement("div");
        let cardCounter = 0;
        div.classList.add("backgroundContainer")
        divForCards.classList.add("cardfield")
        divContainer.appendChild(div)
        totalFields.forEach( i => { 
            createCard(i, divForCards, totalFields)
            cardCounter ++;
        })
        if ( ([16, 36, 50, 100]).includes(cardCounter)) { 
            resolve(div.append(divForCards))
        } else { 
            reject(`Error acquired.`)
        }
    })

    setTimeout(hideCards, 1000);
    
}
function hideCards() { 
    let allImgs = document.querySelectorAll("img")
    allImgs.forEach( img => { 
        img.src = "assets/basketball.jpg"
    })
}
function createCard(i, div, totalFields) { 
    let img = document.createElement("img");
    let card = document.createElement("div");
    card.style.backgroundColor = "#fff";
    switch(totalFields.length){ 
        case 16:
            img.style.width = "120px";
            img.style.height = "120px";
            card.style.width = "168.5px";
            card.style.height = "165px";
            break;
        case 36:
            img.style.width = "90px";
            img.style.height = "90px";
            card.style.width = "90px";
            card.style.height = "90px";
            break;
        case 50:
            img.style.width = "90px";
            img.style.height = "90px";
            card.style.width = "100px";
            break;
        case 100:
            img.style.width = "70px";
            img.style.height = "70px";
            card.style.width = "75px";
            card.style.height = "80px";
            break;
        }
    img.src = `assets/${i}.png`;
    img.id = `${i}`
    card.appendChild(img);
    card.addEventListener("click", selectCard)
    div.appendChild(card);
}
function selectCard() { 
    const imgInsideDiv = this.querySelector("img");

    if(imgInsideDiv.src.includes("basketball")) {
        if(!firstCard) { 
            firstCard = imgInsideDiv;
            imgInsideDiv.src = `assets/${imgInsideDiv.id}.png`
        } else if (!secondCard && imgInsideDiv != firstCard) { 
            secondCard = imgInsideDiv
            imgInsideDiv.src = `assets/${imgInsideDiv.id}.png`
            setTimeout(update, 500);
            if(firstCard.src == secondCard.src) { 
                scoreCounter += 2 
                playMusic()
                if (scoreCounter == JSON.parse(localStorage.getItem("levelOfDifficultyNBA"))) {
                    let timerH2 = document.querySelector("body > div.container.start > h2")
                    let timeNeeded =  timerH2.innerHTML
                    localStorage.setItem("timeNeededNBA", JSON.stringify(timeNeeded))
                    localStorage.setItem("levelOfDifficultyNBA", JSON.stringify(totalFields))
                    let divContainerCongrats = document.createElement("div")
                    let congratsDiv = document.createElement("div");
                    let congratsImg = document.createElement("img");
                    let congratsH2 = document.createElement("h2");
                    let congratsP = document.createElement("p");
                    let btnSubmit = document.createElement("button");
                    let btnChangeLevel = document.createElement("button");
                    congratsImg.src = "assets/lbj.png"
                    congratsImg.alt = "image of player dunking"
                    congratsP.textContent = "Would you like to submit your score?"
                    btnSubmit.textContent = "Submit"
                    btnChangeLevel.textContent = "Start over again"
                    congratsH2.textContent = "Congratulations! 🎉🥳"
                    divContainer.innerHTML = ''
                    congratsDiv.append(congratsH2, congratsP, btnSubmit, btnChangeLevel)
                    divContainerCongrats.classList.add("congrats")
                    divContainerCongrats.append(congratsImg, congratsDiv);
                    divContainer.append(divContainerCongrats)
                    btnSubmit.addEventListener("click", submitScore)
                    btnChangeLevel.addEventListener("click", (
                    ) => { 
                        location.reload()
                    });
                }
            }
        }
        
    }
    }  
function playMusic () { 
    let sound = new Audio ( "assets/swish_sound.mp3");
    sound.play()
}
function update() { 
    if (firstCard.src != secondCard.src) { 
        firstCard.src = "assets/basketball.jpg"
        secondCard.src = "assets/basketball.jpg"
    }
    firstCard = null;
    secondCard = null;
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
function startTimer() { 

    new Promise( (resolve, reject) => { 
        let timerSecs = 1;
        let timerMins = 0;
        let screenMins = "00";
        let screenSecs = "00";
        let h2 = document.createElement("h2");
        let divContainer = document.querySelector(".container")
        h2.innerHTML = screenMins + ":" + screenSecs;
        divContainer.prepend(h2);
        h2.classList.add("glow")
    
    
        const runningTimer = setInterval(() => {
     
            if ( timerMins <= 9) { 
                screenMins = `0${timerMins}`;
            } else if ( timerMins > 9) { 
                screenMins = `${timerMins}`;
            } else if ( timerMins == 60) { 
                    // div Time ran out, please try again
            };
            if ( timerSecs <= 9) { 
                screenSecs = `0${timerSecs}`;
                timerSecs ++        
            } else if ( timerSecs >= 9) { 
                screenSecs = `${timerSecs}`;
                if ( timerSecs == 59) { 
                    timerMins ++;
                    timerSecs = 0;
                } 
                timerSecs ++            
            }
            h2.innerHTML = screenMins + ":" + screenSecs;
        }, 1000)
    })
    
    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart"
    restartButton.onclick = function() {
        location.reload()
    }
        divContainer.append(restartButton)
} 
function highScores() { 

    let scoresDiv = document.querySelector("#scoreboardContainer");
    let btnDifficulty1 = document.createElement("button")
    let btnDifficulty2 = document.createElement("button")
    let btnDifficulty3  = document.createElement("button")
    let btnDifficulty4  = document.createElement("button")
    btnDifficulty1.textContent = "Easy"
    btnDifficulty2.textContent = "Normal"
    btnDifficulty3.textContent = "Hard"
    btnDifficulty4.textContent = "Expert"

    scoresDiv.append(btnDifficulty1, btnDifficulty2, btnDifficulty3, btnDifficulty4)

    let arrayScores = [];
    let difficulty = JSON.parse(localStorage.getItem("levelOfDifficultyNBA"))

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        console.log(key)

        if( key.includes("NBA_memory")) {
            arrayScores.push(key);
        }
    }

    arrayScores.sort(function (a, b) {
        const timeA = localStorage.getItem(a);
        const timeB = localStorage.getItem(b);
    
        return timeA.localeCompare(timeB);
    });
    btnDifficulty1.addEventListener("click", () => { 
        changeLeaderBoard( arrayScores, "easy")
    })
    btnDifficulty2.addEventListener("click", () => { 
        changeLeaderBoard( arrayScores, "normal")
    })
    btnDifficulty3.addEventListener("click", () => { 
        changeLeaderBoard( arrayScores, "hard")
    })
    btnDifficulty4.addEventListener("click", () => { 
        changeLeaderBoard( arrayScores, "expert")
    })
    
    switch (Number(difficulty)) {
        case 16: 
        createLeaderBoard(arrayScores, "easy")            
        break
        case 32: 
        createLeaderBoard(arrayScores, "normal")            
            break
        case 50: 
        createLeaderBoard(arrayScores, "hard")            
            break
        case 100: 
        createLeaderBoard(arrayScores, "expert")            
            break
    }
}
function createLeaderBoard(array, diff) { 
    let scoresDiv = document.querySelector("#scoreboardContainer");
    let table = document.createElement("table");
    let tableHead = document.createElement("thead");
    let headTr = document.createElement("tr");
    let head1Td = document.createElement("td");
    let head2Td = document.createElement("td");
    let head3Td = document.createElement("td");

    head1Td.textContent = "Name";
    head2Td.textContent = "Difficulty";
    head3Td.textContent = "Time"
    headTr.append(head1Td, head2Td, head3Td);
    tableHead.appendChild(headTr);
    table.append(tableHead);
    scoresDiv.appendChild(table)
    table = document.querySelector("table")

    for (let score of array) {
        if ( score.includes(diff)) { 
            let name = score.split('_')[0];
            let difficulty = diff.toUpperCase();
            let time = localStorage.getItem(score);

            console.log(name, difficulty, array, time, diff)

            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            
            td1.textContent = name;
            td2.textContent = difficulty;
            td3.textContent = time;
            tr.append(td1, td2, td3)
            table.appendChild(tr)
            }       
    }
}
function submitScore() { 
    let submittedScore = JSON.parse(localStorage.getItem("timeNeededNBA"))
    let difficulty = JSON.parse(localStorage.getItem("levelOfDifficultyNBA"))
    let user = JSON.parse(localStorage.getItem("usernameNBA"))
    let date = new Date()
    let time = date.getTime()
    let btnSubmit = document.querySelector("button:first-of-type")
    btnSubmit.disabled = true;
switch (Number(difficulty)) {
    case 16: 
        localStorage.setItem(`${user}_easy_NBA_memory_${time}`, JSON.stringify(submittedScore))
        break
    case 32: 
        localStorage.setItem(`${user}_normal_NBA_memory_${time}`, JSON.stringify(submittedScore))
        break
    case 50: 
        localStorage.setItem(`${user}_hard_NBA_memory_${time}`, JSON.stringify(submittedScore))
        break
    case 100: 
        localStorage.setItem(`${user}_expert_NBA_memory_${time}`, JSON.stringify(submittedScore))
        break
}
}
function changeLeaderBoard(array, diff) { 
    let scoresDiv = document.querySelector("#scoreboardContainer");
    let table = document.querySelector("table");
    let tableHead = document.createElement("thead");
    let headTr = document.createElement("tr");
    let head1Td = document.createElement("td");
    let head2Td = document.createElement("td");
    let head3Td = document.createElement("td");
    table.innerHTML = ''
    head1Td.textContent = "Name";
    head2Td.textContent = "Difficulty";
    head3Td.textContent = "Time"
    headTr.append(head1Td, head2Td, head3Td);
    tableHead.appendChild(headTr);
    table.append(tableHead);
    scoresDiv.appendChild(table)
    table = document.querySelector("table")

    for (let score of array) {
        if ( score.includes(diff)) { 
            let name = score.split('_')[0];
            let difficulty = diff.toUpperCase();
            let time = localStorage.getItem(score);

            console.log(name, difficulty, array, time, diff)

            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            
            td1.textContent = name;
            td2.textContent = difficulty;
            td3.textContent = time;
            tr.append(td1, td2, td3)
            table.appendChild(tr)
            }       
    }
}