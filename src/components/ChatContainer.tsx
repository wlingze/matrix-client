import React, { useEffect } from "react";
import styled from "styled-components";
import { message } from "../models/Message";
import ChatInput from "./ChatInput";
import { ErrorResponse } from "../models/Error";
import MessageList from "../store/message";
import messageStore from "../store/message.store";

interface ChatContainerProps {
    recvUser: string;
    currentUser: string;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
    recvUser,
    currentUser,
}) => {
    useEffect(() => {
        const getMsg = async () => {
            if (recvUser && currentUser) {
                // get all message from datastore 

                // set message 
                // setMessages(data);
            }
        };
        getMsg();
    }, [recvUser, currentUser]);

    const handleSendMessage = async (msg: string) => {
        console.log(msg);
        // send to server 
        const message: message = {
            send: currentUser,
            recv: recvUser,
            content: msg,
            timestamp: Date.now().toString(),
        };
        data.addMessage(message)
        Request.send(message)
            .catch((error: ErrorResponse) => {
                console.log("rest send message ", error);
            })
    }

    return (
        <Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="username">
                        <h3>{recvUser}</h3>
                    </div>
                </div>
            </div>

            <MessageList selectUser={recvUser} currentUser={currentUser} />
            <ChatInput handleSendMessage={handleSendMessage} />
        </Container >
    );
};

const Container = styled.div`
display: grid;
grid-template-rows: 10% 80% 10%;
/* gap: 0.1rem; */
overflow: hidden;

.chat-header {
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 2rem;
border-bottom: 1px solid #ffffff15;
-webkit-box-shadow: 0px 17px 20px -26px rgba(66, 68, 90, 1);
-moz-box-shadow: 0px 17px 20px -26px rgba(66, 68, 90, 1);
box-shadow: 0px 17px 20px -26px rgba(66, 68, 90, 1);
.user-details {
    display: flex;
    align-items: center;
    gap: 1rem;
    .avatar {
    img {
        height: 3.1rem;
    }
    }
    .username {
    h3 {
        color: #e4e6eb;
    }
    }
}
@media screen and (min-width: 720px) {
    .avatar {
    img {
        height: 3rem;
    }
    }
}
}

.loading-messages {
text-align: center;
margin-top: 35vh;
img {
    width: 120px;
    height: 120px;
}
}

.chat-messages {
padding: 1rem 2rem;
display: flex;
flex-direction: column;
gap: 1rem;
overflow: auto;
&::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
    background-color: #ffffff39;
    width: 0.1rem;
    border-radius: 1rem;
    }
}
.message {
    display: flex;
    align-items: center;
    .content {
        max-width: 70%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 0.9rem;
        border-radius: 0.5rem;
        color: #d1d1d1;
    }
}
.sended {
    justify-content: flex-end;
    .content {
    background-color: rgb(255, 82, 161);
    }
}
.recieved {
    justify-content: flex-start;
    .content {
    background-color: rgb(0, 135, 255);
    }
}
}
@media screen and (max-width: 900px) and (orientation: landscape) {
grid-template-rows: 15% 70% 15%;

.chat-header {
    .user-details {
    .avatar {
        img {
        height: 2.6rem;
        }
    }
    }
}
}
`;

export default ChatContainer;
