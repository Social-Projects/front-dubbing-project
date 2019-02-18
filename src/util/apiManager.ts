import config from 'react-global-configuration';

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
}

export default apiManager;