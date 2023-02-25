import React, { ReactElement } from "react";
import Main from "./view/Main";
import Login from "./view/Login";

interface AppState {
    startPage: ReactElement | undefined;
}

interface AppProps {
}

export default class App extends React.Component<AppProps, AppState> {
    constructor(prop: AppProps) {
        super(prop)
        this.state = { startPage: undefined }
    }

    componentDidMount() {
        console.log("component did mount");

        // super.componentDidMount();
        this.showMain()  // if has coockie 
        this.showLogin() // if has't coockie
    }

    private showMain() {
        const mainPage = (
            <Main />
        )
        console.log("set main is startpage ");
        this.setState({ startPage: mainPage })
        // this.state.startPage = mainPage;
    }

    private showLogin() {
        const loginPage = (
            <Login />
        )
        console.log("set login is start page")
        this.setState({ startPage: loginPage })

    }

    render() {
        if (this.state.startPage) {
            console.log("start page");
            console.log(this.state.startPage)
            return this.state.startPage
        }
        console.log("startPape is null")
        return null;
    }
}
