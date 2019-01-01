import React from 'react';
import Button from '../Button/Button';
import gotoLogo from '../Perfomance/img/goto-logo.png'
import './PerfomanceItem.css';

class PerfomanceItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="perfomanceItem">
                <span className="perfomanceItem-head">{this.props.title}</span>
                <p className="perfomanceItem-body">{this.props.text}</p>
                <Button
                    text="Перейти до вистави"
                    className="perfomanceItem-footer"
                    width="233px"
                    height="45px"
                    borderRadius="30px"
                    fontSize="18px"
                    backgroundColor="#8cc152"
                    imgPos="right">
                    <img src={gotoLogo} alt=""/>
                </Button>
            </div>
        )
    }
}

export default PerfomanceItem;