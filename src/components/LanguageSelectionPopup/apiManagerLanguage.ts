class apiManagerLanguage
{
    backendUrl = "";
    
    constructor()
    {
        this.backendUrl = "http://localhost:5000/";
    }
    async createLang(json: string): Promise<Response> {
        console.log("createLang");
        const response = await fetch(`${this.backendUrl}api/Language`,{
            
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
    
    async updateLang(json:string): Promise<Response> {
        const response = await fetch(`${this.backendUrl}api/Language`,{
            
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
    async getLang(): Promise<Response>
    {
        const response = await fetch(`${this.backendUrl}api/Language`,{
            
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin':'*'
            }
        });
        return response;
    }
    async getLangById(index:number): Promise<Response>
    {
        const response = await fetch(`${this.backendUrl}api/Language/${index}`);
        return response;
    }
    async removeLang(index:number): Promise<Response>
    {
        const response = await fetch(`${this.backendUrl}api/Language/${index}`,{
            
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin':'*'
            }});
            return response;
    }
}
export default apiManagerLanguage;