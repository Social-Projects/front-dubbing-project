import config from "react-global-configuration";

class ApiManager {
    public backendUrl = "";

    constructor() {
        this.backendUrl = config.get("urlApi");
    }

    public async createPerformance(json: string): Promise<Response> {
        const response = await fetch(`${this.backendUrl}api/Performance`, {
            body: json,
            headers: {
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            method: "POST",
        });
        return response;
    }

    public async updatePerformance(json: string): Promise<Response> {
        const response = await fetch(`${this.backendUrl}api/Performance`, {
            body: json,
            headers: {
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            method: "PUT",
        });
        return response;
    }

    public async getPerformances(): Promise<Response> {
        const response = await fetch(`${this.backendUrl}api/Performance`,
            {
                headers: {
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                },
                method: "GET",
            });
        return response;
    }

    public async getPerformanceById(index: number): Promise<Response> {
        const response = await fetch(`${this.backendUrl}api/Performance/${index}`, {
            headers: {
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            method: "GET",
        });
        return response;
    }

    public async removePerformance(index: number): Promise<Response> {
        console.log("here");
        const response = await fetch(`${this.backendUrl}api/Performance/${index}`, {
            headers: {
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            method: "DELETE",
        });

        return response;
    }

    // Using for display list of speeches on stream page
    public async getSpeechInfo(indexPerfomance: number): Promise<Response> {
        const response = await fetch(`${this.backendUrl}api/performance/${indexPerfomance}/speeches`, {
            headers: {
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            method: "GET",
        });
        return response;
    }
}

export default ApiManager;
