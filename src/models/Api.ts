import { message } from "./Message"

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
    message: message
}

export interface RecvParam {
    since: String,
}

export interface RecvResponse {
    next_since: String,
    messages: message[],
}

export interface UserResponse {
    users: String[]
}