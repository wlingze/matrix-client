import React from "react";
import { HAVE_AN_ACCOUNT, LOGIN, NO_ACCOUNT, PASSWORD, REGISTER, REPEAT_PASSWORD, USER_ID } from "../ui/info";
import ApiClient from "../matrix/ApiClient";
import "../ui/style.css";
import { ErrorResponse } from "../models/Error";

interface LoginProps {
}


interface LoginState {
    register: boolean;
    repeatPassword: string;
    userId: string | undefined;
    error_content: string | undefined;
}

export default class Login extends React.Component<LoginProps, LoginState> {
    private userid = "";
    private password = "";
    private repeat_password = "";

    constructor(props: LoginProps) {
        super(props);
        this.state = {
            repeatPassword: "",
            register: false,
            userId: "",
            error_content: undefined,
        };
    }

    private handlerRequestError = (error: ErrorResponse) => {
        console.log("handler error", error)
        console.trace("traing")
        let error_content = ""
        if (typeof error.statusText == 'string') {
            error_content = error.statusText
        }
        if (error.statusCode == 400) {
            error_content = this.state.register ? "register" : "login" + " error, username or password error"
        } else if (error.statusCode == 0) {
            error_content = "network don't connect or server can't connect!"
        }
        this.setState({ error_content })
    }

    private onPressMainButton = async () => {
        if (!this.userid || !this.password) {
            console.log("userid and password is null");
        }

        // here is login logical
        console.log(this.userid, this.password, this.repeat_password);
        if (this.state.register) {
            // register check two password
            if (this.password == this.repeat_password) {
                // register
                await ApiClient.register(this.userid, this.password)
                    .then(() => {
                        window.location.reload();
                    })
                    .catch((error) => { this.handlerRequestError(error) })

            } else {
                // password not same 
                this.setState({ error_content: "please re-input password" })
            }
        } else {
            // login 
            let result = ApiClient.login(this.userid, this.password)
            console.log("api result:", result);

            result
                .then(() => {
                    window.location.reload();
                })
                .catch((error) => { this.handlerRequestError(error) })
        }
    }

    render() {
        const content = (
            <div>
                <div>
                    {/* user id */}
                    <input
                        placeholder={USER_ID}
                        onChange={input => this.userid = input.target.value}
                    />
                </div>

                <div>
                    {/* password  */}
                    <input
                        type="password"
                        placeholder={PASSWORD}
                        onChange={input => this.password = input.target.value}
                    />
                </div>

                <div>
                    {this.state.register ? (
                        <input
                            type="password"
                            placeholder={REPEAT_PASSWORD}
                            onChange={input => this.repeat_password = input.target.value}
                        />
                    ) : null}
                </div>
            </div>
        )

        const loginDialog = (
            <div>
                {content}

                <button onClick={this.onPressMainButton}>
                    {this.state.register ? REGISTER : LOGIN}
                </button>

                <div onClick={() => { this.setState({ register: !this.state.register }) }}>
                    {this.state.register ? HAVE_AN_ACCOUNT : NO_ACCOUNT}
                </div>
            </div>
        )

        const loginError = (
            <div>
                <div>
                    {this.state.error_content}
                </div>

                <button onClick={() => { this.setState({ error_content: undefined }) }}>
                    Close
                </button>
            </div>
        )

        const loginpage = (
            <div className="container">
                {this.state.error_content ? loginError : loginDialog}
            </div>
        )


        return (
            <div>
                {loginpage}
            </div>
        )
    }
}