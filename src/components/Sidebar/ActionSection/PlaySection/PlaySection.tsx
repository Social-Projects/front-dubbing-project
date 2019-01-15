import React from 'react';
import Aux from '../../../../hoc/Auxiliary';
import WithClass from '../../../../hoc/WithClass';
import classes from './PlaySection.module.css';

interface PlaySectionProps {
    numAudio: number,
    totalTime: number,
    currentTime: number
};

const playSection = (props: any) => {

    const getViewNumber = (number: number): string => {
        if (number < 10)
        {
            return `0${number}`;
        }
        else {
            return number.toString();
        }
    };

    const convSecondsToMinutes = (second: number): string => {
        const minutes: number = Math.floor(second / 60);
        const seconds: number = second % 60;

        return `${getViewNumber(minutes)}:${getViewNumber(seconds)}`;
    };

    return (
        <Aux>
            <span className={classes.numAudio}>#{getViewNumber(props.numAudio)}</span>
            <span className={classes.playbackTime}>
                {convSecondsToMinutes(props.currentTime)} / {convSecondsToMinutes(props.totalTime)}
            </span>
            <input className={classes.playbackScale} type="range" value={props.currentTime} max={props.totalTime}/>
        </Aux>
    )
}

export default WithClass(playSection, classes.playSection);