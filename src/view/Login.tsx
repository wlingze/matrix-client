import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

import request from "../matrix/Request"
import { ErrorResponse } from "../models/Error";


function Login() {
    const [values, setValues] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();

    const toastOptions: ToastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (handleValidation()) {
            const { username, password } = values;
            request.login(username, password)
                .then((response) => {
                    localStorage.setItem("Credentials", JSON.stringify({
                        user: username,
                        accessToken: response.data.token
                    }))
                    navigate("/")
                })
                .catch((error) => {
                    const response: ErrorResponse = error.response
                    let message = ""
                    if (response.status === 0) {
                        message = "please check your or server network"
                    }
                    // message = error.statusText
                    if (response.data != "") {
                        message = response.data
                    } else if (response.statusText != "") {
                        message = error.statusText
                    } else {
                        message = "Bad Request"
                    }
                    toast.error(message, toastOptions);
                })
        }
    }

    const handleValidation = () => {
        const { username, password } = values;
        if (password === "" || username === "") {
            toast.error("UserName and password are require!", toastOptions)
            return false
        }
        if (username.length < 4) {
            toast.error("UserName at least four characters", toastOptions)
            return false
        }
        return true
    }


    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <h1>chat</h1>
                    </div>

                    <input
                        type="text"
                        placeholder="UserName"
                        name="username"
                        onChange={(e) => setValues({ ...values, username: e.target.value })}
                    >
                    </input>

                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => setValues({ ...values, password: e.target.value })}
                    />

                    <button type="submit">Login</button>

                    <span>
                        Dont' have an account? <Link to="/register">Register</Link>
                    </span>
                </form>
            </FormContainer >
            <ToastContainer />
        </>
    )
}

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.brand {
display: flex;
align-items: center;
gap: 1rem;
justify-content: center;
img {
    height: 5rem;
}
h1 {
    color: white;
    text-transform: uppercase;
}
}
form {
display: flex;
flex-direction: column;
gap: 2rem;
background-color: #00000076;
border-radius: 2rem;
padding: 3rem 5rem;
}
input {
background-color: transparent;
padding: 1rem;
border: 0.1rem solid #4e0eff;
border-radius: 0.4rem;
color: white;
width: 100%;
font-size: 1rem;
&:focus {
    border: 0.1rem solid #997af0;
    outline: none;
}
}
button {
background-color: #4e0eff;
color: white;
padding: 1rem 2rem;
border: none;
font-weight: bold;
cursor: pointer;
border-radius: 0.4rem;
font-size: 1rem;
text-transform: uppercase;
&:hover {
    background-color: #4e0eff;
}
}
span {
color: white;
text-transform: uppercase;
a {
    color: #4e0eff;
    text-decoration: none;
    font-weight: bold;
}
}
`;


export default Login