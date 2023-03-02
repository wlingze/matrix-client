import React from "react";
import DialogContainer from "../component/DialogContainer";
import { HAVE_AN_ACCOUNT, LOGIN, NO_ACCOUNT, PASSWORD, REGISTER, REPEAT_PASSWORD, SERVER, USER_ID } from "../ui/info";
interface LoginProps {
    showMainPage: () => void;
}

interface LoginState {
    register: boolean;

    repeatPassword: string;
    server: string | undefined;
    userId: string | undefined;
}

export default class Login extends React.Component<LoginProps, LoginState> {
    private userid = "";
    private server = "";
    private password = "";
    private repeat_password = "";

    constructor(props: LoginProps) {
        super(props);
        this.state = {
            repeatPassword: "",
            register: false,
            server: "",
            userId: "",
        };
    }

    private switch = () => {
        this.setState({ register: !this.state.register })
    }

    private onPressMainButton = async () => {
        if (!this.userid || !this.password) {
            console.log("userid and password is null");
        }

        // here is login logical
        console.log(this.userid, this.password, this.server, this.repeat_password);
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
                    {/* server  */}
                    <input
                        placeholder={SERVER}
                        onChange={input => this.server = input.target.value}
                    />
                </div>

                <div>
                    {/* password  */}
                    <input
                        placeholder={PASSWORD}
                        onChange={input => this.password = input.target.value}
                    />
                </div>

                <div>
                    {this.state.register ? (
                        <input
                            placeholder={REPEAT_PASSWORD}
                            onChange={input => this.repeat_password = input.target.value}
                        />
                    ) : null}
                </div>
            </div>
        )


        const bottom = (
            <div onClick={this.switch}>
                {this.state.register ? HAVE_AN_ACCOUNT : NO_ACCOUNT}
            </div>
        )

        const loginDialog = (
            <DialogContainer
                content={content}

                confirmButton={true}
                confirmButtonText={this.state.register ? REGISTER : LOGIN}
                onConfirm={this.onPressMainButton}

                bottom={bottom}
            />
        )


        return (
            <div>
                {loginDialog}
            </div>
        )
    }
}