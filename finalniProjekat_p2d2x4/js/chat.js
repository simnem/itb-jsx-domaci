class Chatroom { 
    constructor (r, u) { 
        this.room = r;
        this.username = u;
        this.chats = db.collection('chats')
    }

    set room(r) { 
        this._room = r
    }
    set username(u) { 
        if( u.length >= 2 && u.length <= 10 && u.trim() != '') { 
            this._username = u;
        } else {
            alert("Please insert valid username")
        }
    }

    get room() { 
        return this._room;
    }
    get username() { 
        return this._username;
    }

    async addChat(mess) {
        // Kreiranje dokumenta koji želimo da upišemo u bazu
        let docChat = {
            message: mess,
            username: this.username,
            room: this.room,
            created_at: new Date()
        };
        let response = await this.chats.add(docChat); // pamti dokument u db
        return response; // Vraća promis, na koji može da se zakači .then i .catch
    }

    getChats(callback) {
        this.chats
        .where('room', '==', this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type == 'added') {
                    callback(change.doc.data());
                }
            });
        });
    }
}
let chatroom1 = new Chatroom("#js", "snemanja")
chatroom1.getChats(data => {
    console.log(data);
});