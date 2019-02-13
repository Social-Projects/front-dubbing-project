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

        await this.connection.start()
            .then(value => this.sendCommand('Start'))
            .catch(err => console.log(err));
    }

    async disconnectFromHub() {
        console.log('Try to disconnect from SignalR Hub');

        await this.sendCommand('End')
                .then(() => this.connection.stop())
                .catch(error => console.log(error));
    }

    async sendCommand(command: string): Promise<void> {
        console.log('Try send to SignalR Hub:' + command);

        let response = await this.connection.send("SendMessage", command)
                                .catch(err => console.log(err));

        return response;
    }
}

export default signalrManager;