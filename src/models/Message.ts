// message use in server 
export interface message {
    send: String,
    recv: String,
    content: String,
    timestamp: String,
}


export interface Message {
    message: message
    hes_read: boolean
}