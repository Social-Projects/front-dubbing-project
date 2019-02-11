import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Performance.css"
import PopupRemovePerformance from "./PopupRemovePerformance/PopupRemovePerformance"
import { Tooltip } from 'reactstrap';

interface performanceProps {
    deleteMethod: any,
    index: number,
    title: string,
    description: string
}
interface performanceState{
    tooltipOpen: boolean
}
class Performance extends Component<performanceProps, performanceState>
{
    constructor(props: any) {
        super(props);
        this.tooltipToggle = this.tooltipToggle.bind(this);
        this.state = {
            tooltipOpen: false
        };
    }

    tooltipToggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    remove() {
        this.props.deleteMethod(this.props.index);
    }
    render() {

        return (
            <div className="performance">

                <div className="row">

                <p className="col-md-11 pull-left perfTitle" >{this.props.title}</p>
                <div className="col-md-1 text-right PerformanceButtons ">
                        <Link to={"/performance/" + this.props.index} >
                            <button className="editBtn" id="editBtn" />
                            <Tooltip placement="left" isOpen={this.state.tooltipOpen} autohide={false} target="editBtn" toggle={this.tooltipToggle}>
                                Редагувати виставу
                            </Tooltip>

                        </Link>
                        <PopupRemovePerformance buttonLabel="x" removeMethod={this.remove.bind(this)}></PopupRemovePerformance>
                    </div>
                </div>

            <p className="perfDescr">
                {this.props.description}
            </p>
            <Link to={"/stream/" + this.props.index}>
                <button className="gotoPerfBtn ">Перейти до вистави <div className="gotoImage" /></button>
            </Link>
        </div>
        );
    }
}

export default Performance