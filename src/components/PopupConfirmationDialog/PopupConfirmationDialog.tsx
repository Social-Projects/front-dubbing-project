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

interface props {
  removeMethod: any,
  message: string,
  labelDangerButton: string,
  labelPrimaryButton: string
}

interface state {
  tooltipOpen: boolean
  modal: boolean;
}

export default class PopupConfirmationDialog extends React.Component<props, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      tooltipOpen: false,
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.tooltipToggle = this.tooltipToggle.bind(this);
  }


  toggle() {
    this.setState({
      tooltipOpen: false,
      modal: !this.state.modal
    });
    console.log("toggle");
  }

  tooltipToggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="removePerformancePopup">
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