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

    async connectToHub(): Promise<void> {
        console.log('Try to connect to SignalR Hub');

        return await this.connection.start();
    }

    async disconnectFromHub(): Promise<void> {
        console.log('Try to disconnect from SignalR Hub');

        return await this.connection.stop();
    }

    async sendCommand(command: string): Promise<void> {
        console.log('Try send to SignalR Hub:' + command);

        return await this.connection.send("SendMessage", command);
    }
}

export default signalrManager;