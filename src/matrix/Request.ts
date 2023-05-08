import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { LoginParam, LoginResponse, RecvParam, RecvResponse, RegisterParam, RegisterResponse, SendParam, UserResponse } from '../models/Api';
import { Credentials } from '../view/Main';
import { message } from '../models/Message';


const URL = "http://127.0.0.1:8089"

export class Request {
    private API: AxiosInstance;
    private token?: string


    constructor() {
        this.API = axios.create({
            baseURL: URL
        })
    }

    public set_token(credential: Credentials) {
        this.token = credential.accessToken
    }

    public clear_token() {
        this.token = undefined
    }


    public check_token(name: string): Promise<AxiosResponse<boolean>> {
        const data = { name }
        return this.API.post("/api/v0/check", data, {
            headers: { "Authorization": 'Bearer ' + this.token }
        })
    }


    public login(username: string, password: string): Promise<AxiosResponse<LoginResponse>> {
        const data: LoginParam = { username, password }
        return this.API.post("/api/v0/login", data)
    }

    public register(username: string, password: string): Promise<AxiosResponse<RegisterResponse>> {
        const data: RegisterParam = { username, password }
        return this.API.post("/api/v0/register", data)
    }


    public send(message: message): Promise<AxiosResponse<void>> {
        const data: SendParam = { message }
        return this.API.post("/api/v0/send", data, {
            headers: { "Authorization": 'Bearer ' + this.token }
        });
    }

    public recv(since: string): Promise<AxiosResponse<RecvResponse>> {
        const data: RecvParam = { since }
        return this.API.post("/api/v0/recv", data, {
            headers: { "Authorization": 'Bearer ' + this.token }
        });
    }

    public users(): Promise<AxiosResponse<UserResponse>> {
        return this.API.get("api/v0/get_users", {
            headers: { "Authorization": 'Bearer ' + this.token }
        });
    }
}


export default new Request(); 
