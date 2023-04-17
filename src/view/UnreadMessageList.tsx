import React from "react";
import DataStore from "../store/data"
import { Message } from "../models/Message";

interface UnreadMessageListProps {
    setroom: (message: Message) => void
}

interface UnreadMessageListState {
    message?: Message[]
}

export default class UnreadMessageList extends React.Component<UnreadMessageListProps, UnreadMessageListState> {
    constructor(props: UnreadMessageListProps) {
        super(props);
        this.state = {
            message: DataStore.getMessageDontRead()
        }
    }

    render() {
        return (
            <div>
                {this.state.message ? (
                    <ul>
                        {this.state.message.map(message => {
                            return (
                                <li onClick={() => { this.props.setroom(message) }}>
                                    {message.message.content}
                                </li>
                            )
                        })}
                    </ul>
                ) : (<div></div>)
                }
            </div>
        )
    }
}