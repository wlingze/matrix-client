import React from "react";
import DataStore from "../store/data"
import ApiClient from "../matrix/ApiClient";

interface RoomProps {
    username: string
}

interface RoomState {
    error_content: undefined | string
}

export default class Room extends React.Component<RoomProps, RoomState> {
    private content!: string

    constructor(props: RoomProps) {
        super(props);
        this.state = {
            error_content: undefined
        }
    }

    private async sendmessage(username: string, content: string) {
        console.log("send message ", username, content);

        ApiClient.send(username, content)
            .catch((error) => {
                console.log("send message error", error);
            })
    }

    render() {
        return (
            <div >
                {/* top */}
                <h1 >
                    {this.props.username}
                </h1>

                {/* history message  */}
                <ul>
                    {DataStore.getMessageWithUser(this.props.username).map(message => {
                        console.log("message", message);
                        return (
                            <li key={message.message.timestamp as string}>
                                {message.message.content}
                            </li>
                        )
                    })}
                </ul>

                {/* input box  */}

                <div>
                    <input
                        type="text"
                        placeholder="Type your message here..."
                        onChange={input => {
                            this.content = input.target.value
                        }}
                    />
                    <button onClick={() => {
                        this.sendmessage(this.props.username, this.content)
                    }}>
                        send
                    </button>
                </div>
            </div>
        )
    }
}