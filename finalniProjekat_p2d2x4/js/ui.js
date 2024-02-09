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
        let formatedMessage = document.createElement("p");
        let formatedDate = this.formatDate(message.created_at)
        formatedMessage.innerHTML = message.username + ":" + message.message + "<br>" + formatedDate
        return formatedMessage
    }
    formatDate( dateCreated ) { 
        let date = dateCreated.toDate()//.toDateString()
        let formatedDate = outputDate(date)
        const time = dateCreated.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false})
        return (formatedDate + " - " + time)
        }
}

function outputDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('.');
}
 

export default ChatUI;