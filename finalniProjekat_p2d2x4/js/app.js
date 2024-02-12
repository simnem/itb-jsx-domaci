import Chatroom from "./chat.js";
import ChatUI from "./ui.js";

// DOM
const btnGeneral = document.querySelector("#btnGeneral");
const btnJs = document.querySelector("#btnJs");
const btnHomeworks = document.querySelector("#btnHomeworks");
const btnTest= document.querySelector("#btnTest");
const ulEmptyList = document.querySelector("#emptyList");
const btnSend = document.querySelector("#btnSend");
const btnUpdate = document.querySelector("#btnUpdate");
const inputSend = document.querySelector("#inputSend");
const inputUpdate = document.querySelector("#inputUpdate");
const formMessage = document.querySelector("#formMessage");
const btnContainer = document.querySelector("#btnContainer");
const btnUpdateColor = document.querySelector("#btnUpdateColor")
const trashIcon = document.querySelectorAll("i");
let chats = db.collection("chats");
let room = "#general"
// Objekti
let username = setUsername()

let chatroom2 = new Chatroom(room, username);
let chat1UI = new ChatUI(ulEmptyList);
document.body.style.backgroundColor = JSON.parse(localStorage.getItem("chatroomBackground"))


// Prikaz poruka na stranici
chatroom2.getChats( data => { 
    chat1UI.list.appendChild(chat1UI.templateLI(data))
})

formMessage.addEventListener("submit", e => { 
    e.preventDefault();
    let message = inputSend.value;
    if (message.trim() != "") { 
        chatroom2.addChat(message);
        formMessage.reset();
    } else { 
        btnSend.disabled = true;
        }
    let newUsername = inputUpdate.value;
    chatroom2.username = newUsername;
    localStorage.setItem("chatroomUsername", JSON.stringify(newUsername));
    if (newUsername.trim() !== "") {
        changeUsername(newUsername)
        chat1UI.rearrangeUsernames(chatroom2)
}       
})
ulEmptyList.addEventListener( "click", e => { 
    if ( e.target.tagName == "I") { 
        let parent = e.target.parentElement
        let firstChild = parent.firstElementChild
        let nextSibling = firstChild.nextSibling.nextSibling
        let liParent = parent.parentElement
        chat1UI.deleteMessage(firstChild, nextSibling, chatroom2, liParent)
    }
})
btnContainer.addEventListener( "click", e => { 
    if ( e.target.id == "btnGeneral") { 
        room = "#general"
        chat1UI.delete()
        chatroom2.room = room;
        chatroom2.getChats( data => { 
            chat1UI.list.appendChild(chat1UI.templateLI(data))
        })
        btnColors("btnGeneral")
    } else if ( e.target.id == "btnJs") { 
        chat1UI.delete()
        room = "#js"
        chatroom2.room = room;
        chatroom2.getChats( data => { 
            chat1UI.list.appendChild(chat1UI.templateLI(data))
        })
        btnColors("btnJs")
    } else if ( e.target.id == "btnHomeworks") {
        chat1UI.delete()
        room = "#homeworks"
        chatroom2.room = room;
        chatroom2.getChats( data => { 
            chat1UI.list.appendChild(chat1UI.templateLI(data))
        })
        btnColors("btnHomeworks")
    } else if ( e.target.id == "btnTest") { 
        chat1UI.delete()
        room = "#test"
        chatroom2.room = room;
        chatroom2.getChats( data => { 
            chat1UI.list.appendChild(chat1UI.templateLI(data))
        })
        btnColors("btnTest")
    }
})
btnUpdateColor.addEventListener( "click",(e)=> { 
    e.preventDefault();
    let inputColor = document.getElementById("inputUpdateColor");
    let divToChange = document.querySelector(".container section");
    divToChange.style.backgroundColor = `${inputColor.value}`
    document.body.style.backgroundColor = `${inputColor.value}`
    localStorage.setItem("chatroomBackground", JSON.stringify(inputColor.value));
})

function setUsername() { 
   return localStorage.getItem("chatroomUsername") != null ? JSON.parse(localStorage.getItem("chatroomUsername")) : "anonymous"
}
function changeUsername(newUsername) { 
    setTimeout(() => {
        let newDiv = document.createElement("div");
        let newH2 = document.createElement("h2");
        newH2.textContent = `You are now writing as ${newUsername}`;
        newH2.style.color = "white"
        newH2.style.fontWeight = "bold"
        newDiv.appendChild(newH2);
        document.body.appendChild(newDiv);
        newDiv.style.textAlign = "center"
        newDiv.style.backgroundColor = "purple"
        newDiv.style.width = "50%"
        newDiv.style.margin = "0 auto"
        newDiv.style.padding = "10px"
        newDiv.style.borderRadius = "10px"
        setTimeout(() => {
            newDiv.remove(); 
        }, 3000);
    }, 500);
    inputUpdate.value = '';
}

function btnColors(id) { 
    let activeBtn = document.getElementById(`${id}`);
    let allBtns = document.querySelectorAll("button");
    allBtns.forEach(btn => { 
        btn.style.backgroundColor = "purple"
    });
    activeBtn.style.backgroundColor = "grey";
}