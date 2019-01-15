export default class ApiManagerStreamPage {
    backendUrl = "";

    constructor() {
        this.backendUrl = "http://localhost:5000/";
    }

    async getAudioInfo(index:number): Promise<Response> {
        const response = await fetch(`${this.backendUrl}api/Perfomance/${index}/AudiosInfo`,
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
}