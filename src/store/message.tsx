import { ComponentBase } from 'resub';

import { message } from "../models/Message";
import data from "./data"

interface MessageListProps {
    currentUser: string
    selectUser: string
}

interface MessageListState {
    message?: message[]
}

class MessageList extends ComponentBase<MessageListProps, MessageListState> {
    protected _buildState(props: MessageListProps, _initialBuild: boolean, _incomingState: Readonly<MessageListState> | undefined): Partial<MessageListState> | undefined {
        return {
            message: data.getMessageWithUser(props.selectUser)
        }
    }

    render() {
        return (
            <>
                <div className="chat-messages">
                    {this.state.message === undefined ? (<></>) : (
                        this.state.message.map((message, index) => {
                            console.log("update ", message);

                            return (
                                <div key={index}>
                                    <div
                                        className={`message ${message.send === this.props.currentUser ? "sended" : "recieved"}`}
                                    >
                                        {message && (
                                            <div className="content ">
                                                <p>{message.content}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        }))}
                </div>
            </>
        )
    }
}

export default MessageList;
