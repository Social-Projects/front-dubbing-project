import React, { Component } from 'react';
import apiManager from "../../apiManager";
import { Link } from 'react-router-dom';
import "./EditPerformance.css"; 
interface editPerformanceState {
    id: number,
    title:string,
    description:string
}
interface editPerformanceProps {
    match: {
        params: {
            number: any
        }
    }
}
class editPerformance extends Component<editPerformanceProps,editPerformanceState>
{
    apimanager = new apiManager();
    constructor(props : any)
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
    handleChange(e:any) {
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
            <div className="editForm">
                <div className="formHeader">
                    <p>{this.props.match.params.number=="new"?"Створення вистави":"Редагування вистави"}</p>
                    <div className="text-right">
                        <button  className="saveButton" onClick={this.handleSave} ><i className="fas fa-check-circle saveIcon"></i>Зберегти</button>
                        <Link to="/performance/">
                            <button className="cancelButton">
                            <i className="fas fa-times-circle saveIcon"></i>Вiдмiна
                            </button>
                        </Link>  
                    </div>
                </div>  

                    <input type="hidden" readOnly={true} value={this.state.id} />
                    <p className="formTitles">Назва вистави</p>
                    <input type="text" name="title" onChange={this.handleChange}  value={this.state.title} />
                    <p className="formTitles">Опис вистави</p>
                    <textarea className="descrField" name="description" onChange={this.handleChange}  value={this.state.description} />

                
            </div>
        )
    }
}

export default editPerformance