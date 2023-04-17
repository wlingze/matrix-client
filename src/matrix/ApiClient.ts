
import { RecvParam, RecvResponse, RegisterParam, SendParam, UserResponse } from "../models/Api";
import { Credentials } from "../models/Credentials";
import { message } from "../models/Message";
import AsyncStorage from "../store/async";
import RestClient from "./RestClient";

class ApiClient {
    token!: String;
    rest!: RestClient;
    public user!: String;

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
            this.rest.set_token(this.token)
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }

    private setStoredCredentials(user: String, accessToken: String) {
        this.token = accessToken
        this.user = user
        this.rest.set_token(this.token)
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
        return this.rest.login(data).catch(error => {
            return Promise.reject(error)
        }).then((response) => {
            this.setStoredCredentials(username, response.token)
            return Promise.resolve()
        })
    }

    public async register(username: String, password: String): Promise<void> {
        const data: RegisterParam = { username, password }
        return this.rest.register(data).catch(error => {
            return Promise.reject(error)
        }).then((response) => {
            this.setStoredCredentials(username, response.token)
            return Promise.resolve()
        })
    }

    // other user 
    public async all_user(): Promise<UserResponse> {
        return this.rest.users()
    }

    // message control 
    public async send(to: String, content: String): Promise<void> {
        const message: message = { send: this.user, recv: to, content, timestamp: Date.now().toString() }
        const data: SendParam = { message }
        return this.rest.send(data)
    }

    public async recv(since: String): Promise<RecvResponse> {
        const data: RecvParam = { since }
        return this.rest.recv(data)
    }
}

export default new ApiClient();