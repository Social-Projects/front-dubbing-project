import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { checkPropTypes } from 'prop-types';
import "./PopupRemovePerformance.css";

interface props {
  buttonLabel: string,
  removeMethod: any
}

interface state {
  modal: boolean
}

class PopupRemovePerformance extends React.Component<props, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <button className="close" onClick={this.toggle}>{this.props.buttonLabel}</button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="removePerformancePopup">
          <ModalHeader
            className="popupHeader"
            toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody
            className="popupBody">
            Видалення вистави приведе до видалення всіх фраз і аудіофайлів. Ви дійсно хочете видалити виставу? Натисніть 'Видалити', щоб видалити виставу або натисніть 'Відмінити', щоб відмінити видалення.
          </ModalBody>
          <ModalFooter
            className="popupHeader">
            <Button color="danger" onClick={this.props.removeMethod}>Видалити</Button>{' '}
            <Button color="primary" onClick={this.toggle}>Відмінити</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default PopupRemovePerformance;