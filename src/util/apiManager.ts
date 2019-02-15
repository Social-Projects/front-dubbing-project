import config from 'react-global-configuration';
import { promises } from 'fs';
import { signalRManager } from '../index';

class apiManager {
    backendUrl = "";

    constructor() {
        this.backendUrl = config.get("urlApi");
    }

    async createPerformance(json: string): Promise<Response> {
        const response = await fetch(`${this.backendUrl}api/Performance`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: json
        });
        return response;
    }

    async updatePerformance(json: string): Promise<Response> {
        const response = await fetch(`${this.backendUrl}api/Performance`, {

            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: json
        });
        return response;
    }

    async getPerformances(): Promise<Response> {
        const response = await fetch(`${this.backendUrl}api/Performance`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        return response;
    }

    //  async register(user:any):Promise<Response>{
    //     const response = await fetch(`http://localhost:5000/users/register`,
    //      {
    //          method: 'POST',
    //          headers: { 
    //           'Content-Type': 'application/json',
    //           'Access-Control-Allow-Origin': '*',
    //           'Accept': 'application/json' },
    //      });
    //      return response;
    //  }

    async getPerformanceById(index: number): Promise<Response> {
        const response = await fetch(`${this.backendUrl}api/Performance/${index}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        return response;
    }

    async removePerformance(index: number): Promise<Response> {
        console.log("here");
        const response = await fetch(`${this.backendUrl}api/Performance/${index}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

        return response;
    }

    //Using to connect to hub
    async connectToHub() {
        await signalRManager.connectToHub();
    }

    async disconnectToHub() {
        await signalRManager.disconnectFromHub();
    }

    async endStream() {
        await signalRManager.sendCommand('End');
    }

    //Using for display list of speeches on stream page
    async getSpeechInfo(indexPerfomance: number): Promise<Response> {
        const response = await fetch(`${this.backendUrl}api/performance/${indexPerfomance}/speeches`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        return response;
    }

    // Load required speeches to stream service
    // async load(performanceId: number): Promise<Response> {
    //     console.log("try load");
    //     const response = await fetch(`${this.backendUrl}api/streaming/load/${performanceId}`, {
    //         method: 'GET'
    //     });
    //     console.log("load");
    //     return response;
    // }

    async playSpeechById(index: string) {
        // const response = await fetch(`${this.backendUrl}api/Streaming/Play/${index}`, {
        //     method: 'GET'
        // });
        await signalRManager.sendCommand(index);
    }

    async pauseSpeech() {
        // const response = await fetch(`${this.backendUrl}api/Streaming/Pause`, {
        //     method: 'GET'
        // });
        await signalRManager.sendCommand('Pause');
    }

    // async playSpeech(): Promise<Response> {
    //     console.log("try to play");
    //     const response = await fetch(`${this.backendUrl}api/Streaming/Play`, {
    //         method: 'GET'
    //     });
    //     console.log("play");
    //     return response;
    // }

    // async nextSpeech(): Promise<Response> {
    //     console.log("try play next speech");
    //     const response = await fetch(`${this.backendUrl}api/Streaming/NextSpeech`, {
    //         method: 'GET'
    //     });
    //     console.log("play next speech");
    //     return response;
    // }

    // async prevSpeech(): Promise<Response> {
    //     console.log("try play previous speech");
    //     const response = await fetch(`${this.backendUrl}api/Streaming/PrevSpeech`, {
    //         method: 'GET'
    //     });
    //     console.log("play previous speech");
    //     return response;
    // }

    // async getCurrentSpeechId(): Promise<Response> {
    //     console.log("try get current speech id");
    //     const response = await fetch(`${this.backendUrl}api/Streaming/CurrentSpeechId`, {
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': '*'
    //         }
    //     });
    //     console.log("get current speech id");
    //     return response;
    // }
}

export default apiManager;