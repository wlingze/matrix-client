import { StoreBase } from "resub";
import { message } from "../models/Message";

class MessageStore extends StoreBase {
    private messages: message[] = []
    private send_message: message[] = []

    public addMessages(message: message[]) {
        this.messages = this.messages.concat(message)
        this.send_message = []
        this.trigger();
    }


    public addSendMessage(message: message) {
        this.send_message = this.send_message.concat(message)
        this.trigger();
    }


    public getMessage(user: string) {
        return this.messages
            .filter((message) => (message.recv == user) || (message.send == user))
            .concat(this.send_message)
            .sort((a, b) => {
                if (a.timestamp < b.timestamp) {
                    return -1
                } else if (a.timestamp > b.timestamp) {
                    return 1;
                } else {
                    return 0
                }
            })
    }
}

export default new MessageStore();