import React, { Component } from 'react';
import apiManager from "../../apiManager";
import { Link } from 'react-router-dom';

class editPerformance extends Component
{
    apimanager = new apiManager("http://localhost:5000");
    constructor(props)
    {
        super(props);
        this.state={
            id:-1,
            title:'',
            description:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);

    }
    handleChange(e) {
        var val = e.target.value;
        if(e.target.name == "title"){
       
            this.setState(
            {
                title: val
            });
        }
        else if(e.target.name == "description"){
            this.setState(
            {
                description: val
            });
        }
    }
   async handleSave(){
    if(this.state.id != -1){
        const resp = await this.apimanager.updatePerformance(JSON.stringify(this.state));
        if(resp.status == 200){
            history.back(); 
        }
        else {
            console.log(resp.status);
        }
    }
    else {
        const resp = await this.apimanager.createPerformance(JSON.stringify(this.state));
        if(resp.status == 201){
            history.back(); 
        }
        else {
            console.log(resp.status);
        }
    }
   }
    
    async componentDidMount(){
        if(this.props.match.params.number != 'new'){
        const resp = await this.apimanager.getPerformanceById(this.props.match.params.number);
        if(resp.status == 200){
            const data = await resp.json();
            this.setState({
                id:data.id,
                title:data.title,
                description:data.description
            })
        }
        else {
            console.log(resp.status)
        }
    }

    }
 
    render(){
        return(
            <div>
                <div>
                    <h3>Додавання вистави</h3>
                    <button onClick={this.handleSave} >Зберегти</button>
                    <span className="input-group-btn">
                        <Link to="/performance/">Вiдмiна</Link>  
                    </span>
                </div>  
                <form>
                    <input type="hidden" readOnly={true} value={this.state.id} />
                    <input type="text" name="title" onChange={this.handleChange}  value={this.state.title} />
                    <input type="text" name="description" onChange={this.handleChange}  value={this.state.description} />

                </form>
            </div>
        )
    }
}

export default editPerformance