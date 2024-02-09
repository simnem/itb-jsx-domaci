import Chatroom from "./chat.js";
import ChatUI from "./ui.js";

// DOM
const btnGeneral = document.querySelector("#btnGeneral");
const btnJs = document.querySelector("#btnJs");
const btnHomeworks = document.querySelector("#btnHomeworks");
const btnTest= document.querySelector("#btnTest");
const ulEmptyList = document.querySelector("#emptyList");
let chats = db.collection("chats");

// Objekti
let chatroom2 = new Chatroom("#general", "newUser");
let chat1UI = new ChatUI(ulEmptyList);

// Prikaz poruka na stranici
chatroom2.getChats( data => { 
    chat1UI.list.appendChild(chat1UI.templateLI(data))
})