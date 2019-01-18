import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import WithClass from '../../../hoc/WithClass';
import classes from './ButtonSection.module.css';

interface buttonSectionProps {
    isPlaying: boolean,
    playPauseHandler:any,
    nextSpeechHandler:any,
    prevSpeechHandler:any
};

const buttonSection = (props: buttonSectionProps) => {

    const btnClasses = [classes.act, classes.play];
    const iconClasses = ["fas", "fa-play"];

    if (props.isPlaying === true) {
        btnClasses.pop();
        btnClasses.push(classes.pause);

        iconClasses.pop();
        iconClasses.push("fa-pause");
    }

    return (
        <Aux>
            <a href="" className={classes.prev} onClick={(event) => props.prevSpeechHandler(event)}>
                <i className="fas fa-fast-backward"></i>
            </a>

            <a href="" className={btnClasses.join(' ')} onClick={(event) => props.playPauseHandler(event)}>
                <i className={iconClasses.join(' ')} ></i>
            </a>

            <a href="" className={classes.next} onClick={(event) => props.nextSpeechHandler(event)}>
                <i className="fas fa-fast-forward"></i>
            </a>
        </Aux>
    )
}

export default WithClass(buttonSection, classes.btnSection);