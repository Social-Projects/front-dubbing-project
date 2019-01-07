class apiManager
{
    
   
    backendUrl = "";
    constructor(backendUrl:string)
    {
        this.backendUrl = backendUrl;
    }
    async createPerformance(json: string): Promise<Response> {
        const response = await fetch(`http://localhost:5000/api/Performance`,{
            
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin':'*'
            }, 
            body:json
        });
            return response;
    }
    async updatePerformance(json:string): Promise<Response> {
        const response = await fetch(`http://localhost:5000/api/Performance`,{
            
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin':'*'
            }, 
            body:json
        });
            return response;
    }
    async getPerformances(): Promise<Response>
    {
        const response = await fetch(`${this.backendUrl}/api/Performance`);
        return response;
    }
    async getPerformanceById(index:number): Promise<Response>
    {
        const response = await fetch(`${this.backendUrl}/api/Performance/${index}`);
        return response;
    }
    async removePerformance(index:number): Promise<Response>
    {
        const response = await fetch(`http://localhost:5000/api/Performance/${index}`,{
            
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin':'*'
            }});
            return response;
    }
}
export default apiManager;