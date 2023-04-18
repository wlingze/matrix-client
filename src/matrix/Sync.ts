import DataStore from "../store/data"
import RestClient from "./RestClient";

export let since = "0";

export default async function run(): Promise<void> {
    try {
        console.log("sync", since);

        let users = await RestClient.users();
        users.users.forEach((user) => {
            DataStore.addUser(user as string);
        });

        let recv_message = await RestClient.recv(since);
        recv_message.messages.forEach((message) => {
            DataStore.addMessage(message);
            return Promise.resolve();
        });
        since = recv_message.next_since as string;
    } catch (error) {
        console.log("sync error:", error);
        return Promise.reject(error);
    }
}
