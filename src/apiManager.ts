class apiManager {


    backendUrl = "";
    
    constructor()
    {
        this.backendUrl = "https://localhost:44323/";
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
        const response = await fetch(`${this.backendUrl}api/Performance`);
        return response;
    }
    async getPerformanceById(index: number): Promise<Response> {
        const response = await fetch(`${this.backendUrl}api/Performance/${index}`, {

            method: 'GET',
            mode: 'no-cors',
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


    //Using for display list of audio on stream page
    async getSpeechInfo(indexPerfomance: number): Promise<Response> {
        console.log("getSpeechInfo");
        const response = await fetch(`${this.backendUrl}api/performance/${indexPerfomance}/speeches`,
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
    async playSpeech(): Promise<Response> {
        const response = await fetch(`${this.backendUrl}api/Streaming/Play`, {
            method: 'GET'
        });
        return response;
    }
    async playSpeechById(index: number): Promise<Response> {
        const response = await fetch(`${this.backendUrl}api/Streaming/Play/${index}`, {
            method: 'GET'
        });
        return response;
    }
    async pauseSpeech(): Promise<Response> {
        const response = await fetch(`${this.backendUrl}api/Streaming/Pause`, {
            method: 'GET'
        });
        return response;
    }
    async nextSpeech(): Promise<Response> {
        const response = await fetch(`${this.backendUrl}api/Streaming/NextSpeech`, {
            method: 'GET'
        });
        return response;
    }
    async prevSpeech(): Promise<Response> {
        const response = await fetch(`${this.backendUrl}api/Streaming/PrevSpeech`, {
            method: 'GET'
        });
        return response;
    }
    async getCurrentSpeechId(): Promise<Response> {
        const response = await fetch(`${this.backendUrl}api/Streaming/CurrentSpeechId`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        return response;
    }

    async load(performanceId:number): Promise<Response> {
        const response = await fetch(`${this.backendUrl}api/streaming/load/${performanceId}`, {
            method: 'GET'
        });
        return response;
    }


}
export default apiManager;