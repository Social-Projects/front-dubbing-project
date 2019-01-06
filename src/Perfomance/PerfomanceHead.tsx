import React from 'react';
import Button from '../Button/Button';
import addLogo from './img/add-logo.png';
import './PerfomanceHead.css';

interface PerfomanceHeadProps {
    text: string;
}

class PerfomanceHead extends React.Component<PerfomanceHeadProps> {
    
    render() {
        return (
            <div className="contentHead">
                <span className="contentHead-text">{this.props.text}</span>
                <Button
                    className="contentHead-btn"
                    text="Додати виставу"
                    width="200px"
                    height="45px"
                    borderRadius="25px"
                    backgroundColor="#563a9d"
                    transitionDuration="0.3s"
                    fontSize="18px"><img src={addLogo} alt="" /></Button>
            </div>
        )
    }
}

export default PerfomanceHead;