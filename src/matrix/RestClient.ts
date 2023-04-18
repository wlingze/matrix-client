import { ApiCallOptions, GenericRestClient } from 'simplerestclients';

import {
    LoginParam, LoginResponse,
    RecvParam, RecvResponse,
    RegisterParam, RegisterResponse,
    SendParam,
    UserResponse,
} from '../models/Api';
import { message } from '../models/Message';
import { Credentials } from '../view/Main';

class RestClient extends GenericRestClient {
    private token!: String;
    public user!: string;

    constructor(host: String, port: String) {
        super("http://" + host + ":" + port)
    }

    public set_token(credential: Credentials) {
        this.token = credential.accessToken
        this.user = credential.user
    }

    protected _getHeaders(options: ApiCallOptions): { [key: string]: string } {
        let headers = super._getHeaders(options);
        if (this.token) {
            headers['Authorization'] = 'Bearer ' + this.token;
        }
        return headers
    }

    public login(username: string, password: string): Promise<LoginResponse> {
        const data: LoginParam = { username, password }
        return this.performApiPost<LoginResponse>("/api/v0/login", data);
    }

    public register(username: string, password: string): Promise<RegisterResponse> {
        const data: RegisterParam = { username, password }
        return this.performApiPost<RegisterResponse>("/api/v0/register", data);
    }

    public send(message: message): Promise<void> {
        const data: SendParam = { message }
        return this.performApiPost<void>("/api/v0/send", data);
    }

    public recv(since: string): Promise<RecvResponse> {
        const data: RecvParam = { since }
        console.log("recv data:", since);
        return this.performApiPost<RecvResponse>("/api/v0/recv", data);
    }

    public users(): Promise<UserResponse> {
        return this.performApiGet<UserResponse>("/api/v0/get_users");
    }
};

export default new RestClient("127.0.0.1", "8089")