import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

import Request from "../matrix/Request";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import run from "../matrix/Sync";

export interface Credentials {
    user: string;
    accessToken: string;
}
function Main() {
    const [currentCredential, setCurrentCredential] = useState<Credentials>();
    const [recvUser, setRecvUser] = useState<string>()
    const navigate = useNavigate();

    // set current user 
    useEffect(() => {
        const clearup = () => {
            localStorage.clear()
            Request.clear_token()
            navigate("/login")
        }
        const setUser = async () => {
            const credential_string = localStorage.getItem("Credentials");

            if (credential_string) {
                const credential: Credentials = JSON.parse(credential_string)
                // check token 
                Request.set_token(credential)
                Request.check_token(credential.user)
                    .then((alive) => {
                        console.log("then", alive, alive.data);
                        if (alive.data) {
                            console.log("setting ");

                            setCurrentCredential(credential)
                        } else {
                            clearup()
                        }
                    }
                    ).catch(() => {
                        console.log("cache");
                        clearup()
                    })
            }
        }
        setUser();
    }, [navigate])


    useEffect(() => {
        const getContacts = async () => {
            if (currentCredential) {
                Request.set_token(currentCredential)
                run()
                setInterval(run, 1 * 1000)
            }
        };
        getContacts();
    }, [currentCredential])


    const handleChatChange = (username: string) => {
        setRecvUser(username)
    }


    return (
        <>
            <Container>
                <div className="container">

                    <Contacts
                        currentUser={currentCredential?.user || ""}
                        changeChat={handleChatChange}
                    />

                    {recvUser === undefined ? (
                        <Welcome currentUsername={currentCredential?.user || ""} />
                    ) : (
                        <ChatContainer
                            recvUser={recvUser}
                            currentUser={currentCredential?.user || ""}
                        />
                    )}
                </div>
            </Container>
        </>
    );
}

const Container = styled.div`
height: -webkit-fill-available;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #0e0e11;
.container {
height: 100vh;
width: 100vw;
background-color: #00000076;
display: grid;
grid-template-columns: 20% 80%;

@media screen and (min-width: 720px) {
    grid-template-columns: 35% 65%;
    grid-template-rows: none;
    width: 85vw;
    height: 100vh;
}
@media screen and (min-width: 1100px) {
    grid-template-columns: 28% 72%;
}
}
`;


export default Main;