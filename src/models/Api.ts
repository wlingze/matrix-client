import { Message } from "./Message"

export interface LoginParam {
    username: String,
    password: String,
}

export interface LoginResponse {
    token: String
}

export interface RegisterParam {
    username: String,
    password: String
}
export interface RegisterResponse {
    token: String
}


export interface SendParam {
    token: String,
    message: Message
}

export interface RecvParam {
    token: String,
    since: String,
}

export interface RecvResponse {
    next_since: String,
    messages: Message[],
}