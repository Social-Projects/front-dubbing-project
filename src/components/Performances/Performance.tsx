import React, { Component } from "react";
import { Link } from "react-router-dom";
class Performance extends Component
{
    remove(){
        this.props.deleteMethod(this.props.index);
    }
    render(){
        
        return(
        <div>
            
            <div id="title">
                <h3>{this.props.title}</h3>

                <span className="input-group-btn">
                   <Link to={"/performance/"+this.props.index} >Edit</Link>
                </span>
             
                <button  onClick={this.remove.bind(this)} className="removeButton">Remove</button>
            </div>
            <p>
                {this.props.description}
            </p>
            <button>Перейти до вистави</button>
            </div>
        );
    }
}

export default Performance