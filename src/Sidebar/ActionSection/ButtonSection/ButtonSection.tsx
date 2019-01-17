import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import WithClass from '../../../hoc/WithClass';
import classes from './ButtonSection.module.css';

interface buttonSectionProps {
    playPauseHandler:any,
    nextSpeechHandler:any,
    prevSpeechHandler:any
 };

const buttonSection = (props: buttonSectionProps) => {
    return (
        <Aux>
            <a href="" className={classes.prev} onClick={(event) => props.prevSpeechHandler(event)}>
                <i className="fas fa-fast-backward"></i>
            </a>

            <a href="" className={classes.act} onClick={(event) => props.playPauseHandler(event)}>
                <i className="fas fa-play" ></i>
            </a>

            <a href="" className={classes.next} onClick={(event) => props.nextSpeechHandler(event)}>
                <i className="fas fa-fast-forward"></i>
            </a>
        </Aux>
    )
}

export default WithClass(buttonSection, classes.btnSection);