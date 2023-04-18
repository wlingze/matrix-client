import data from "./data"
import { ComponentBase } from 'resub';

interface UserListProps {
    changeChat: (index: number, username: string) => void;
    currentSelected: number | undefined
}

interface UserListState {
    users?: string[]
}

class UserList extends ComponentBase<UserListProps, UserListState> {
    protected _buildState(_props: UserListProps, _initialBuild: boolean, _incomingState: Readonly<UserListState> | undefined): Partial<UserListState> | undefined {
        return {
            users: data.getUser()
        }
    }


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