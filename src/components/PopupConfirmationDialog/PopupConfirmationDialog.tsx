import React, { Dispatch } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip
} from 'reactstrap';
import './PopupConfirmationDialog.css';
import '../Performances/Performance/Performance.css';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import * as actions from '../../store/actions/PopupConfirmationDialog/actions';
import State from '../../store/state/state';

interface props {
  labelActionButton: string,
  toolTipActionButton:string,
  removeMethod: any,
  message: string,
  labelDangerButton: string,
  labelPrimaryButton: string,
  type: string,
}

interface IReduxStateType {
  modal: boolean;
}

interface IDispatchPropsType {
  onModalShow: () => void,
  onModalHide: () => void
}

interface state {
  tooltipOpen: boolean
}

interface AllProps extends IReduxStateType, IDispatchPropsType, props {}

class PopupConfirmationDialog extends React.Component<AllProps, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      tooltipOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.tooltipToggle = this.tooltipToggle.bind(this);
  }


  toggle() {
    this.props.modal
      ? this.props.onModalHide()
      : this.props.onModalShow();

    this.setState({
      tooltipOpen: false
    });
  }

  tooltipToggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }


  render() {
    const { modal, labelActionButton } = this.props;
    let button = null;
    switch (this.props.type) {
      case "button":
        button = (<button className="actionButton" onClick={this.toggle} id="actionButton">{labelActionButton}</button>);
        break;
      case "Button":
        button = (<Button className="actionButton" onClick={this.toggle} id="actionButton">{labelActionButton}</Button>);
        break;
      case "span":
        button = (<span className="actionButton" onClick={this.toggle} id="actionButton">{labelActionButton}</span>);
        break;
    }
    return (
      <div>
        {button}
        <Tooltip placement="left" isOpen={this.state.tooltipOpen} autohide={true} target="actionButton" toggle={this.tooltipToggle}>
          {this.props.toolTipActionButton}
        </Tooltip>
        <Modal isOpen={modal} toggle={this.toggle} className="removePerformancePopup">
          <ModalHeader
            className="popupHeader"
            toggle={this.toggle}></ModalHeader>
          <ModalBody
            className="popupBody">
            {this.props.message}
          </ModalBody>
          <ModalFooter
            className="popupHeader">
            <Button color="danger" onClick={this.props.removeMethod}>{this.props.labelDangerButton}</Button>
            <Button color="primary" onClick={this.toggle}>{this.props.labelPrimaryButton}</Button>
          </ModalFooter>
        </Modal>
      </div >
    );
  }
}

const mapStateToProps = (state: State) => {
  const { modal } = state.popupConfirmationDialog;
  return {
      modal: modal
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    onModalShow: () => dispatch(actions.modalShow()),
    onModalHide: () => dispatch(actions.modalHide())
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopupConfirmationDialog);