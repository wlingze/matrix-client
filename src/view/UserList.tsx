import React from "react";
import DataStore from "../store/data"

interface UserListProps {
    setroom: (user: string) => void
}

interface UserListState {
    users?: string[]
}

export default class UserList extends React.Component<UserListProps, UserListState> {
    constructor(props: UserListProps) {
        super(props);
        this.state = {
            users: DataStore.getUser()
        }
    }

    render() {
        return (
            <div>
                {this.state.users ? (
                    <ul>
                        {this.state.users.map(user => {
                            return (
                                <li key={user} onClick={() => { this.props.setroom(user) }}>
                                    {user}
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