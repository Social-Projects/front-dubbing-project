import config from 'react-global-configuration';
import * as signalR from "@aspnet/signalr";

class signalrManager {
    connection: signalR.HubConnection;

    constructor() {
        let backendURL = config.get("urlApi");

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(`${backendURL}StreamHub`)
            .build();
    }

    async connectToHub() {
        console.log('Try to connect to SignalR Hub');

        await this.connection.start()
            .catch(err => console.log(err));
    }

    async disconnectFromHub() {
        console.log('Try to disconnect from SignalR Hub');

        await this.connection.stop()
            .catch(err => console.log(err));
    }

    async sendCommand(command: string) {
        console.log('Try send to SignalR Hub:' + command);

        await this.connection.send("SendMessage", command)
            .catch(err => console.log(err));
    }
}

export default signalrManager;