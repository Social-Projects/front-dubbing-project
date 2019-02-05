import React, { Component, Dispatch, ReactEventHandler } from "react";
import { Link } from "react-router-dom";
import "./Performance.css"
import PopupConfirmationDialog from "../../PopupConfirmationDialog/PopupConfirmationDialog"
import { Tooltip } from 'reactstrap';

interface IPerformanceProps {
    deleteMethod: any,
    index: number,
    title: string,
    description: string
}

interface performanceState {
    tooltipEditOpen: boolean,
    tooltipRemoveOpen: boolean,
}
export default class Performance extends Component<IPerformanceProps, performanceState>
{
    child = React.createRef<PopupConfirmationDialog>();
    constructor(props: any) {
        super(props);
        this.tooltipEditToggle = this.tooltipEditToggle.bind(this);
        this.tooltipRemoveToggle = this.tooltipRemoveToggle.bind(this);
        this.state = {
            tooltipEditOpen: false,
            tooltipRemoveOpen: false
        };
    }

    tooltipEditToggle() {
        this.setState({
            tooltipEditOpen: !this.state.tooltipEditOpen
        });
    }
    tooltipRemoveToggle() {
        this.setState({
            tooltipRemoveOpen: !this.state.tooltipRemoveOpen
        });
    }

    remove() {
        this.props.deleteMethod(this.props.index);
    }

    toggleChildComponent = async (e: any) => {
        if (!this.child.current) {
            return;
        }
        this.child.current.toggle();
    }
    render() {
        return (
            <div className="performance">

                <div className="row">

                    <p className="col-md-6 pull-left perfTitle" >{this.props.title}</p>
                    <div className="col-md-6 text-right PerformanceButtons ">
                        <Link to={"/performance/" + this.props.index} >
                            <button className="editBtn" id="editBtn" />
                            <Tooltip placement="left" isOpen={this.state.tooltipEditOpen} autohide={false} target="editBtn" toggle={this.tooltipEditToggle}>
                                Редагувати виставу
                            </Tooltip>
                        </Link>
                        <div>
                            <span className="close" onClick={this.toggleChildComponent} id="actionButton">x</span>
                        </div>
                        <Tooltip placement="left" isOpen={this.state.tooltipRemoveOpen} autohide={true} target="actionButton" toggle={this.tooltipRemoveToggle}>
                            Видалити виставу
                        </Tooltip>
                        <PopupConfirmationDialog
                            removeMethod={this.remove.bind(this)}
                            message="Видалення вистави приведе до видалення всіх фраз і аудіофайлів. Ви дійсно хочете видалити виставу?"
                            labelDangerButton="Видалити"
                            labelPrimaryButton="Відмінити"
                            ref={this.child}
                        />
                    </div>
                </div>

                <p>
                    {this.props.description}
                </p>
                <Link to={"/stream/" + this.props.index}>
                    <button className="gotoPerfBtn ">Перейти до вистави <div className="gotoImage" /></button>
                </Link>
            </div>
        );
    }
}
