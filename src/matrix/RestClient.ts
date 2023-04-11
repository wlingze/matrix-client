import { GenericRestClient } from 'simplerestclients';
import {
    LoginParam, LoginResponse,
    RecvParam, RecvResponse,
    RegisterParam, RegisterResponse,
    SendParam,
} from '../models/Api';

export default class RestClient extends GenericRestClient {
    constructor(host: String, port: String) {
        super("http://" + host + ":" + port)
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
}
