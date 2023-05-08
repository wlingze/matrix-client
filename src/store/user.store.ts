import { StoreBase } from "resub";


class UserStore extends StoreBase {
    private users: string[] = []

    public setUsers(users: string[]) {
        this.users = users;
        this.trigger();
    }

    public getUsers() {
        return this.users
    }
}

export default new UserStore();