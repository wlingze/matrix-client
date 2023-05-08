import { Component } from 'react';
import userStore from './user.store';

interface UserListProps {
    changeChat: (index: number, username: string) => void;
    currentSelected: number | undefined
}

interface UserListState {
    users: string[]
}

class UserList extends Component<UserListProps, UserListState> {
    public state: UserListState = {
        users: userStore.getUsers(),
    }
    private subscribe_number = 0;

    public componentDidMount(): void {
        this.subscribe_number = userStore.subscribe(this.handlerStoreUpdate);
    }

    public componentWillUnmount(): void {
        userStore.unsubscribe(this.subscribe_number);
    }

    private handlerStoreUpdate = () => {
        this.setState({ users: userStore.getUsers() });
    };


    render() {
        return (
            <>
                <div className="contacts">
                    {this.state.users === undefined ? (<></>) : (
                        this.state.users
                            .map((username: string, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        className={`contact ${index === this.props.currentSelected ? "selected" : ""}`}
                                        onClick={() => this.props.changeChat(index, username)}
                                    >
                                        <div className="username">
                                            <h3>{username}</h3>
                                        </div>
                                    </div>
                                )
                            })
                    )}
                </div>
            </>
        )
    }
}




export default UserList;