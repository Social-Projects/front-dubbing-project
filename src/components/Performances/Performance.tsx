import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Performance.css"

interface performanceProps {
    deleteMethod:any,
    index:number,
    title:string,
    description:string
}
class Performance extends Component<performanceProps>
{
    remove(){
        this.props.deleteMethod(this.props.index);
    }
    render(){
        
        return(
        <div className="performance">
            
            <div className="row">
            
                <p className="col-md-6 pull-left perfTitle" >{this.props.title}</p>
                <div className="col-md-6 text-right PerformanceButtons ">
                        <Link to={"/performance/"+this.props.index} >
                            <button className="editBtn" />
                        </Link>
                  
                    <button className="close" onClick={this.remove.bind(this)} >x</button>
                </div>
            </div>

            <p>
                {this.props.description}
            </p>
            <button className="gotoPerfBtn ">Перейти до вистави <div className="gotoImage" /></button>
            </div>
        );
    }
}

export default Performance