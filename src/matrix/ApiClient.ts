
import { RecvParam, RecvResponse, RegisterParam, SendParam } from "../models/Api";
import { Credentials } from "../models/Credentials";
import { Message } from "../models/Message";
import AsyncStorage from "../modules/AsyncStorage";
import RestClient from "./RestClient";

class ApiClient {
    token!: String;
    rest!: RestClient;
    user!: String;

    constructor() {
        this.rest = new RestClient("127.0.0.1", "8089")
    }

    // credential 
    public async getStoredCredentials(): Promise<boolean> {
        const credentials = await AsyncStorage.getItem("credentials");
        if (credentials) {
            const credential = JSON.parse(credentials) as Credentials
            this.token = credential.accessToken
            this.user = credential.user
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }

    private setStoredCredentials(user: String, accessToken: String) {
        this.token = accessToken
        this.user = user
        const credential: Credentials = { user, accessToken }
        const credential_data = JSON.stringify(credential)
        AsyncStorage.setItem("credentials", credential_data)
    }

    // user control 
    public async login(username: String, password: String): Promise<void> {
        const data = {
            username: username,
            password: password
        }
        await this.rest.login(data).catch(error => {
            return Promise.reject(error)
        }).then((response) => {
            this.setStoredCredentials(username, response.token)
            return Promise.resolve()
        })
    }

    public async register(username: String, password: String): Promise<void> {
        const data: RegisterParam = { username, password }
        this.rest.register(data).catch(error => {
            return Promise.reject(error)
        }).then((response) => {
            this.setStoredCredentials(username, response.token)
            return Promise.resolve()
        })
    }

    // other user 
    // public async all_user(): Promise<String[]> {

    // }

    // message control 
    public async send(from: String, to: String, content: String): Promise<void> {
        const message: Message = { from, to, content, timestamp: Date.now().toString() }
        const data: SendParam = { token: this.token, message }
        return this.rest.send(data)
    }

    public async recv(since: String): Promise<RecvResponse> {
        const data: RecvParam = { since, token: this.token }
        return this.rest.recv(data)
    }
}

export default new ApiClient();