class apiManager
{
    
   
    backendUrl = "";
    
    constructor()
    {
        this.backendUrl = "https://localhost:44323/";
    }
    async createPerformance(json: string): Promise<Response> {
        const response = await fetch(`${this.backendUrl}api/Performance`,{
            
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
        const response = await fetch(`${this.backendUrl}api/Performance`,{
            
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
        const response = await fetch(`${this.backendUrl}api/Performance`);
        return response;
    }
    async getPerformanceById(index:number): Promise<Response>
    {
        const response = await fetch(`${this.backendUrl}api/Performance/${index}`,{
            
            method: 'GET',
            mode:'no-cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin':'*'
            }});
        return response;
    }
    async removePerformance(index:number): Promise<Response>
    {
        const response = await fetch(`${this.backendUrl}api/Performance/${index}`,{
            
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