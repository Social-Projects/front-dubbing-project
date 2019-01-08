import React, { Component } from "react";
import Performance from "./Performance"
import apiManager from "../../apiManager";
import { Link } from "react-router-dom";
import "./PerformanceList.css"
class PerformanceList extends Component
{
    apimanager = new apiManager();
    
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
        const arr = this.state.performances.filter(obj=>{
            return obj.id !== index;
        })
        
        this.setState(
            {
                performances:arr
            });
         }
         else{
             this.getPerformances();
             console.log(resp.status);
         }

       
    }
    componentDidMount(){
        this.getPerformances();
    }
    render(){
        
        return(
        <div>
            <div className="header">
                <h3 className="">Вистави</h3>
                <Link to="/performance/new" >
                    <button className=" addButton"><div className="addImage" />Додати виставу</button>
                </Link>
            </div>
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