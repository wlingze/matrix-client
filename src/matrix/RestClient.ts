import { ApiCallOptions, GenericRestClient } from 'simplerestclients';
import {
    LoginParam, LoginResponse,
    RecvParam, RecvResponse,
    RegisterParam, RegisterResponse,
    SendParam,
    UserResponse,
} from '../models/Api';

export default class RestClient extends GenericRestClient {
    private token!: String;

    constructor(host: String, port: String) {
        super("http://" + host + ":" + port)
    }

    public set_token(token: String) {
        this.token = token
    }

    protected _getHeaders(options: ApiCallOptions): { [key: string]: string } {
        let headers = super._getHeaders(options);
        if (this.token) {
            headers['Authorization'] = 'Bearer ' + this.token;
        }
        return headers
    }

    public login(param: LoginParam): Promise<LoginResponse> {
        return this.performApiPost<LoginResponse>("/api/v0/login", param);
    }

    public register(param: RegisterParam): Promise<RegisterResponse> {
        return this.performApiPost<RegisterResponse>("/api/v0/register", param);
    }

    public send(param: SendParam): Promise<void> {
        return this.performApiPost<void>("/api/v0/send", param);
    }
    public recv(param: RecvParam): Promise<RecvResponse> {
        return this.performApiPost<RecvResponse>("/api/v0/recv", param);
    }

    public users(): Promise<UserResponse> {
        return this.performApiGet<UserResponse>("/api/v0/get_users");
    }
}
