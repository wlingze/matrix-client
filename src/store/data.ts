import { StoreBase, AutoSubscribeStore, autoSubscribeWithKey } from 'resub';
import { Message, message } from '../models/Message';
import ApiClient from '../matrix/ApiClient';

const usersTrigger = "usersTrigger";
const messagesTrigger = "messageTrigger";

@AutoSubscribeStore
class DataStore extends StoreBase {
    private users: string[] = [];
    private usersTrigger = usersTrigger;
    private messages: Message[] = [];
    private messagesTrigger = messagesTrigger;

    addUser(user: string) {
        if (!this.users.includes(user) && user != ApiClient.user) {
            this.users = this.users.concat(user);
            this.trigger(this.usersTrigger)
        }
    }

    @autoSubscribeWithKey(usersTrigger)
    public getUser() {
        return this.users
    }

    public getUserNumber() {
        return this.users.length
    }


    addMessage(message: message) {
        let data: Message = { message, hes_read: false }
        this.messages = this.messages.concat(data);
        this.trigger(this.messagesTrigger)
    }

    @autoSubscribeWithKey(messagesTrigger)
    public getMessage() {
        return this.messages
    }

    @autoSubscribeWithKey(messagesTrigger)
    public getMessageDontRead() {
        return this.messages.filter(message => !message.hes_read)
    }

    @autoSubscribeWithKey(messagesTrigger)
    public getMessageWithUser(user: string) {
        return this.messages.filter(message =>
            (message.message.recv == user) || (message.message.send == user)
        )
    }
}

export default new DataStore(); 
