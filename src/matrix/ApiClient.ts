
import { Credentials } from "../models/Credentials";
import AsyncStorage from "../modules/AsyncStorage";

class ApiClient {
    public credentials!: Credentials;

    public async getStoredCredentials(): Promise<Credentials | undefined> {
        const credentials = await AsyncStorage.getItem("credentials");
        if (credentials) {
            this.credentials = JSON.parse(credentials) as Credentials
            return Promise.resolve(this.credentials);
        } else {
            return Promise.resolve(undefined);
        }
    }
}

export default new ApiClient();