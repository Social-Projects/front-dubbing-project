import React, { Component } from "react";
import Performance from "./Performance"
import apiManager from "../../apiManager";
import { Link } from "react-router-dom";
class PerformanceList extends Component
{
    apimanager = new apiManager("http://localhost:5000");
    
    constructor(props){
        super(props);
        this.state={
            performances:[]
        }
        this.removePerformance = this.removePerformance.bind(this);
    }
    
    getPerformances = async() =>{
        const resp = await this.apimanager.getPerformances();
        const data = await resp.json();
        this.setState(
            {
                performances:data
            });
        
    }
    async removePerformance(index:number) {

        const resp = await this.apimanager.removePerformance(index);
        if(resp.status == 200){
        const arr = this.state.performances.splice(index + 1, 1);
        
        this.setState(
            {
                performances:arr
            });
         }
         else{
             console.log(resp.status);
         }

       
    }
    componentDidMount(){
        this.getPerformances();
    }
    render(){
        
        return(
        <div>
                <span className="input-group-btn">
                   <Link to="/performance/new" >Додати виставу</Link>
                </span>            {
                this.state.performances.map((item)=>{
                    return <Performance deleteMethod={this.removePerformance} index={item.id} key={item.id} title={item.title} description={item.description} />;
                }
            )}
        </div>
        );
    }
}
export default PerformanceList