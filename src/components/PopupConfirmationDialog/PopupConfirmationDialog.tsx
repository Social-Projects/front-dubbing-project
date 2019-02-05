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
  removeMethod: any,
  message: string,
  labelDangerButton: string,
  labelPrimaryButton: string
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
    const { modal} = this.props;
    
    return (
      <div>
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