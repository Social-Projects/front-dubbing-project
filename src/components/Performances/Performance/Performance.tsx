import React, { Component, Dispatch } from "react";
import { Link } from "react-router-dom";
import "./Performance.css"
import PopupConfirmationDialog from "../../PopupConfirmationDialog/PopupConfirmationDialog"
import { Tooltip } from 'reactstrap';
import { AnyAction } from 'redux';
import * as actions from '../../../store/actions/PopupConfirmationDialog/actions';
import { connect } from 'react-redux';

interface IPerformanceProps {
    deleteMethod: any,
    index: number,
    title: string,
    description: string
}

interface IDispatchProps {
    onModalShow: () => void,
    onModalHide: () => void
}

interface AllProps extends IPerformanceProps, IDispatchProps {}

interface performanceState {
    tooltipOpen: boolean
}
class Performance extends Component<AllProps, performanceState>
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

                    <p className="col-md-6 pull-left perfTitle" >{this.props.title}</p>
                    <div className="col-md-6 text-right PerformanceButtons ">
                        <Link to={"/performance/" + this.props.index} >
                            <button className="editBtn" id="editBtn" />
                            <Tooltip placement="left" isOpen={this.state.tooltipOpen} autohide={false} target="editBtn" toggle={this.tooltipToggle}>
                                Редагувати виставу
                            </Tooltip>

                        </Link>
                        <button onClick={(e) => this.props.onModalShow()}>
                            lollo
                        </button>
                        <PopupConfirmationDialog
                            type="span" //span or button or Button or something else (just add case in popup)
                            labelActionButton="X"
                            toolTipActionButton="Видалити виставу" 
                            removeMethod={this.remove.bind(this)}
                            message="Видалення вистави приведе до видалення всіх фраз і аудіофайлів. Ви дійсно хочете видалити виставу? Натисніть 'Видалити', щоб видалити виставу або натисніть 'Відмінити', щоб відмінити видалення."
                            labelDangerButton="Видалити"
                            labelPrimaryButton="Відмінити"
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

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return {
        onModalShow: () => dispatch(actions.modalShow()),
        onModalHide: () => dispatch(actions.modalHide())
    }
};
  
export default connect(
    null,
    mapDispatchToProps
)(Performance);
  