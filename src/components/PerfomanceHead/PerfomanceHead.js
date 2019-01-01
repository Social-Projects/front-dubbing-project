import React from 'react';
import Button from '../Button/Button';
import addLogo from '../Perfomance/img/add-logo.png';
import './PerfomanceHead.css';

class PerfomanceHead extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="contentHead">
                <span className="contentHead-text">{this.props.text}</span>
                <Button
                    className="contentHead-btn"
                    text="Додати виставу"
                    imgSrc={addLogo}
                    width="200px"
                    height="45px"
                    borderRadius="25px"
                    backgroundColor="#563a9d"
                    fontSize="18px" ><img src={addLogo} alt="" /></Button>
            </div>
        )
    }
}

export default PerfomanceHead;