import ApiClient from "./ApiClient";
import DataStore from "../store/data"

class Sync {
    private since = "0";

    public async start(): Promise<void> {
        try {
            let users = await ApiClient.all_user();
            users.users.forEach((user) => {
                DataStore.addUser(user as string);
            });

            let recv_message = await ApiClient.recv(this.since);
            this.since = recv_message.next_since as string;
            recv_message.messages.forEach((message) => {
                DataStore.addMessage(message);
                return Promise.resolve();
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }
}


export default new Sync();
