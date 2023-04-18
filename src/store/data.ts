import { StoreBase, AutoSubscribeStore, autoSubscribeWithKey } from 'resub';
import { message } from '../models/Message';
import RestClient from '../matrix/RestClient';
// import ApiClient from '../matrix/ApiClient';

const usersTrigger = "usersTrigger";
const messagesTrigger = "messageTrigger";

@AutoSubscribeStore
class DataStore extends StoreBase {
    private users: string[] = [];
    private usersTrigger = usersTrigger;
    private messages: message[] = [];
    private messagesTrigger = messagesTrigger;


    addUser(user: string) {
        if (!this.users.includes(user) && RestClient.user != user) {
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
        console.log("set message", message);
        this.messages = this.messages.concat(message);
        this.trigger(this.messagesTrigger)
    }

    @autoSubscribeWithKey(messagesTrigger)
    public getMessage() {
        return this.messages
    }

    @autoSubscribeWithKey(messagesTrigger)
    public getMessageWithUser(user: string) {
        return this.messages.filter(message =>
            (message.recv == user) || (message.send == user)
        )
    }
}

export default new DataStore(); 
