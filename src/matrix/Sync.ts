import Request from "./Request";

export let since = "0";

export default async function run(): Promise<void> {
    try {
        // console.log("sync", since);

        let users = await Request.users();

        let recv_message = await Request.recv(since);
        since = recv_message.data.next_since as string;
    } catch (error) {
        console.log("sync error:", error);
        return Promise.reject(error);
    }
}
