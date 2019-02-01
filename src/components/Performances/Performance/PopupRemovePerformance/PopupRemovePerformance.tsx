import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Tooltip } from 'reactstrap';
import { checkPropTypes } from 'prop-types';
import "./PopupRemovePerformance.css";

interface props {
  buttonLabel: string,
  removeMethod: any
}

interface state {
  modal: boolean,
  tooltipOpen: boolean
}

class PopupRemovePerformance extends React.Component<props, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      modal: false,
      tooltipOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.tooltipToggle = this.tooltipToggle.bind(this);
  }
  

  toggle() {
    this.setState({
      modal: !this.state.modal,
      tooltipOpen: false
    });

  }

  tooltipToggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }
  

  render() {
    return (
      <div>
        <span className="close" onClick={this.toggle} id="xbutton">{this.props.buttonLabel}</span>
        <Tooltip placement="left" isOpen={this.state.tooltipOpen} autohide={true} target="xbutton" toggle={this.tooltipToggle}>
          Видалити виставу
        </Tooltip>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="removePerformancePopup">
          <ModalHeader
            className="popupHeader"
            toggle={this.toggle}></ModalHeader>
          <ModalBody
            className="popupBody">
            Видалення вистави приведе до видалення всіх фраз і аудіофайлів. Ви дійсно хочете видалити виставу? Натисніть 'Видалити', щоб видалити виставу або натисніть 'Відмінити', щоб відмінити видалення.
          </ModalBody>
          <ModalFooter
            className="popupHeader">
            <Button color="danger" onClick={this.props.removeMethod}>Видалити</Button>
            <Button color="primary" onClick={this.toggle}>Відмінити</Button>
          </ModalFooter>
        </Modal>
      </div >
    );
  }
}

export default PopupRemovePerformance;