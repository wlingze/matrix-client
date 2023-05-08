import messageStore from "../store/message.store";
import userStore from "../store/user.store";
import Request from "./Request";

export let since = "0";

export default async function run(): Promise<void> {
    try {
        // console.log("sync", since);

        let users = await Request.users();
        userStore.setUsers(users.data.users as string[])

        let recv_message = await Request.recv(since);
        messageStore.addMessages(recv_message.data.messages)
        since = recv_message.data.next_since as string;
    } catch (error) {
        console.log("sync error:", error);
        return Promise.reject(error);
    }
}
