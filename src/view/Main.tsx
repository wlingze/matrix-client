import React, { ReactElement } from "react";
import Sync from "../matrix/Sync";
import UserList from "./UserList";
import { Message } from "../models/Message";
import ApiClient from "../matrix/ApiClient";
import UnreadMessageList from "./UnreadMessageList";
import Room from "./Room";

interface MainProps {
}

interface MainState {
    showRoomPage: boolean
    showMessageList: boolean
    showUserList: boolean
    error_content: undefined | string
}


export default class Main extends React.Component<MainProps, MainState> {
    private room?: ReactElement
    private sync_thread?: NodeJS.Timer

    constructor(props: MainProps) {
        super(props);
        this.state = {
            showRoomPage: false,
            showMessageList: false,
            showUserList: false,
            error_content: undefined
        }
        this.enable_sync()
    }

    private enable_sync = () => {
        try {
            // init data 
            this.sync()

            // set sync thread 
            this.sync_thread = setInterval(this.sync, 2 * 60 * 1000)
        } catch {

        }
    }

    private async sync(): Promise<void> {
        try {
            return await Sync.start();
        } catch (error) {
            console.log("main sync error", error);

            // handler error 
            let error_content = "";
            if (error.statusCode == 0) {
                error_content = "network don't connect or server can't connect!";
            } else if (typeof error.statusText == 'string') {
                error_content = error.statusText
            }
            this.setState({ error_content });

            // stop sync thread
            if (this.sync_thread) {
                clearInterval(this.sync_thread);
                this.sync_thread = undefined;
            }
            return await Promise.reject(error);
        }
    }

    private setRoomFromUser = (username: string) => {
        this.setState({
            showRoomPage: true,
        });
        this.room = (
            <Room username={username} />
        )
    }

    private setRoomFromMessage = (message: Message) => {
        if (message.message.send == ApiClient.user) {
            return this.setRoomFromUser(message.message.recv as string)
        }
        if (message.message.recv == ApiClient.user) {
            return this.setRoomFromUser(message.message.send as string)
        }
    }


    render() {
        let messagelistrow = (
            <div>
                <UnreadMessageList setroom={this.setRoomFromMessage} />
            </div>
        )
        let userslistrow = (
            <div>
                <UserList setroom={this.setRoomFromUser} />
            </div>
        )

        let list = (
            <div>
                <button onClick={() => {
                    this.setState({ showMessageList: !this.state.showMessageList })
                }}>
                    unread message list
                </button>
                {this.state.showMessageList ? (
                    messagelistrow
                ) : (
                    <p></p>
                )}

                <button onClick={() => {
                    this.setState({ showUserList: !this.state.showUserList })
                }}>
                    user list
                </button>
                {this.state.showUserList ? (
                    userslistrow
                ) : (
                    <p></p>
                )}
            </div>
        )


        let roompage = (
            <div>
                <p>room page </p>
                {this.state.showRoomPage ? this.room : null}
            </div>
        )

        let sync_state = (
            <div>
                <p>{"user: " + ApiClient.user}</p>
                <button onClick={() => {
                    window.localStorage.clear()
                    window.location.reload()
                }}>
                    logout
                </button>
                <div>
                    {this.sync_thread ? (
                        <p> sync runing...</p>
                    ) : (
                        <div>
                            <p>sync stop! please check your or services network</p>
                            <button onClick={() => { this.enable_sync() }}>
                                Click this to restart sync!
                            </button>
                        </div>
                    )}
                </div>
            </div>
        )

        let mainpage = (
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    {sync_state}
                    {list}
                </div>
                <div style={{ flex: 2 }}>
                    {roompage}
                </div>
            </div >
        )
        let errorpage = (
            <div>
                <div>
                    {this.state.error_content}
                </div>

                <button onClick={() => { this.setState({ error_content: undefined }) }}>
                    Close
                </button>
            </div>
        )

        return (
            <div>
                {this.state.error_content ? errorpage : mainpage}
            </div>
        )
    }
}