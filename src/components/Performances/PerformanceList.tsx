import React, { Component } from "react";
import Performance from "./Performance"
class PerformanceList extends Component
{
    constructor(props){
        super(props);
        this.state={
            performances:[]
        }
        this.removePerformance = this.removePerformance.bind(this);
    }
    
    getPerformances = async() =>{
       
        const fet = await fetch(`http://localhost:5000/api/Performance`);
        const data = await fet.json();
        this.setState(
            {
                performances:data
            });
        
    }
    async removePerformance(index:number) {

        const fet = await fetch(`http://localhost:5000/api/Performance/${index}`,{
            
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*'
        }});
        const arr = this.state.performances.slice(index + 1, 1);
        this.setState(
            {
                performances:arr
            });
        

       
    }
    componentDidMount(){
        this.getPerformances();
    }
    render(){
        
        return(
        <div>
            <button className="addPerfBtn">Додати виставу</button>
            {
                this.state.performances.map((item)=>{
                    return <Performance deleteMethod={this.removePerformance} index={item.id} key={item.id} title={item.title} description={item.description} />;
                }
            )}
        </div>
        );
    }
}
export default PerformanceList