import React from 'react';
import Aux from '../../../../hoc/Auxiliary';
import WithClass from '../../../../hoc/WithClass';
import classes from './StreamAudio.module.css';

interface AudioProps {
    text: string;
    duration: number;
}

const audio = (props: AudioProps) => {
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

    const iconActionsClasses = ["fas", classes.icon, "fa-play-circle"];

    return (
        <Aux>
            <i className={iconActionsClasses.join(" ")}></i>
            <span>
                {props.text}
            </span>
            <span className={classes.time}>{convSecondsToMinutes(props.duration)}</span>
        </Aux>
    )
};

export default WithClass(audio, classes.audio);