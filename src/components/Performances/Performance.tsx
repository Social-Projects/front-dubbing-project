import React, { Component } from "react";
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
                <button className="editButton">Edit</button>
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