
import { useState } from "react";
import styled from "styled-components";

import UserList from "../store/user"

interface ContactsProps {
    currentUser: string;
    changeChat: (username: string) => void;
}

const Contacts: React.FC<ContactsProps> = ({
    currentUser,
    changeChat
}) => {

    const [currentSelected, setCurrentSelected] = useState<number>();

    const changeCurrentChat = (index: number, username: string) => {
        setCurrentSelected(index)
        changeChat(username)
    }

    console.log("contacts");

    return (
        <>
            <Container>
                <div className="brand">
                    <h3>Chat</h3>
                </div>
                <UserList changeChat={changeCurrentChat} currentSelected={currentSelected} />
                <div className="current-user">
                    <div className="username">
                        <h2>{currentUser}</h2>
                    </div>
                </div>
            </Container>
        </>
    );
};

const Container = styled.div`
display: grid;
grid-template-rows: 10% 80% 10%;
overflow: hidden;
background-color: #18191a;
.brand {
display: flex;
align-items: center;
gap: 1rem;
justify-content: center;
/* padding: 1.8rem 0; */
img {
    height: 3rem;
}
h3 {
    color: #e4e6eb;
    text-transform: uppercase;
    display: none;
}
@media screen and (min-width: 720px) {
    h3 {
    display: block;
    }
}
}

.contacts {
display: flex;
flex-direction: column;
overflow: auto;
gap: 0.8rem;
&::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
    background-color: #ffffff39;
    width: 0.1rem;
    border-radius: 1rem;
    }
}
.contact {
    background-color: #ffffff15;
    min-height: 5rem;
    cursor: pointer;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.5s ease-in-out;
    .avatar {
    img {
        height: 3rem;
    }
    }
    .username {
    h3 {
        color: #e4e6eb;
        display: none;
    }
    }

    &:hover {
    filter: brightness(80%);
    }
}
.selected {
    /* background-color: #9a86f3; */
    background-color: rgba(45, 136, 255, 0.1);
}
@media screen and (min-width: 720px) {
    .contact {
    flex-direction: row;
    justify-content: flex-start;

    padding: 0.4rem;
    gap: 1rem;
    .username {
        h3 {
        color: white;
        display: block;
        }
    }
    }
}
}
.current-user {
background-color: #18191a;
display: flex;
justify-content: center;
align-items: center;
border-top: 0.2px solid #ffffff15;
.avatar {
    height: 3.1rem;
    position: relative;
    img {
    height: 3.1rem;
    /* max-inline-size: 100%; */
    }
    .camera-img {
    position: absolute;
    left: 0;
    top: 0;
    background-color: #ffffff42;
    border-radius: 50%;
    height: 3.1rem;
    width: 3.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    img {
        height: 2.5rem;
        width: 2.5rem;
    }
    }
}
.username {
    h2 {
    color: white;
    display: none;
    }
}
@media screen and (min-width: 720px) {
    gap: 1rem;
    justify-content: flex-start;
    padding: 0.4rem;

    .username {
    h2 {
        font-size: 1rem;
        display: block;
        font-size: 1.2rem;
    }
    }
}
}
@media screen and (max-width: 900px) and (orientation: landscape) {
grid-template-rows: 15% 70% 15%;
.contacts {
    .contact {
    min-height: 4rem;
    }
}
h3 {
    display: none;
}
}
`;

export default Contacts;