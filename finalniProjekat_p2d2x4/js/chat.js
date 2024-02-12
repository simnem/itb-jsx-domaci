class Chatroom { 
    constructor (r, u) { 
        this.room = r;
        this.username = u;
        this.chats = db.collection('chats')
        this.unsub = false;
    }

    set room(r) {
        this._room = r
 
        if( this.unsub)  {
            this.unsub();
        }
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
        try {
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
        catch { 
            console.error('Doslo je do greske.', err);
        }
    }

    getChats(callback) {
        this.unsub = this.chats
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
    permanentlyDeleteMessage(data) { 
        const firestore = firebase.firestore();
        const chatDocRef = firestore.doc(`chats/${data.id}`);
        chatDocRef.delete()
            .then(() => {
                console.log('Message deleted');
            })
            .catch((err) => {
                console.error('Error: ', err);
            });
    }
} 

export default Chatroom;