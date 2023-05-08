import { message } from "../models/Message";
import { Component, createRef } from 'react';
import messageStore from './message.store';

interface MessageListProps {
    currentUser: string
    selectUser: string
}

interface MessageListState {
    message: message[]
}

class MessageList extends Component<MessageListProps, MessageListState> {


    public state: MessageListState = {
        message: messageStore.getMessage(this.props.selectUser)
    }
    private subscribe_number = 0
    private messageListRef = createRef<HTMLDivElement>();

    public componentDidMount(): void {
        this.subscribe_number = messageStore.subscribe(this.handlerStoreUpdate);
    }

    public componentWillUnmount(): void {
        messageStore.unsubscribe(this.subscribe_number);
    }

    private handlerStoreUpdate = () => {
        this.setState({ message: messageStore.getMessage(this.props.selectUser) }, () => {
            if (this.messageListRef.current) {
                this.messageListRef.current.scrollTop = this.messageListRef.current.scrollHeight;
            }
        });
    };

    render() {
        return (
            <>
                <div className="chat-messages" ref={this.messageListRef}>
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
