class ChatUI { 

    constructor(l) { 
        this.list = l;
    }

    set list(l)  {
        this._list = l;
    }

    get list() { 
        return this._list;
    }

    templateLI(message) { 
        let li = document.createElement("li");
        let formatedMessage = document.createElement("p");
        let formatedDate = this.formatDate(message.created_at)
        formatedMessage.innerHTML = "<span>" + message.username + "</span>" + " : " + "<span>" + message.message + "</span>" + " <br> " + formatedDate + "<i class='fa-solid fa-trash'></i>"
        if ( message.username == JSON.parse(localStorage.getItem("chatroomUsername"))){ 
            formatedMessage.style.background = "#FEE4C3"
            li.appendChild(formatedMessage)
            li.style.alignSelf = "flex-end"
        } else { 
            formatedMessage.style.background = "#D7BFD7"
            li.appendChild(formatedMessage)
        }
        return li
    }
    formatDate( dateCreated ) { 
        let date = dateCreated.toDate()
        let formatedDate = outputDate(date)
        const time = dateCreated.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false})
        if(formatedDate != undefined) { 
            return (formatedDate + " - " + time)
        } else { 
           return time
        }
        }
    delete() { 
        this.list.innerHTML = '';
    }
    rearrangeUsernames(chatroom2) {
        let ul = document.getElementById("emptyList")
        ul.innerHTML = '';
        chatroom2.getChats( data => { 
            this.list.appendChild(this.templateLI(data))
        })    
    }
    deleteMessage(username, message, chatroom, liParent) { 
        chatroom.getChats(data => { 
            if (username.textContent == JSON.parse(localStorage.getItem("chatroomUsername")) && data.username == username.textContent && data.message == message.textContent) {
                chatroom.permanentlyDeleteMessage(data)
            }
        });
        liParent.remove()
}
}
function outputDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
        let today = new Date()

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    
    if (today.getDate() !== d.getDate() || today.getMonth() !== d.getMonth() || today.getFullYear() !== d.getFullYear()) {
        return [day, month, year].join('.');
    }
}
 

export default ChatUI;