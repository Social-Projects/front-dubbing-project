import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import WithClass from '../../../hoc/WithClass';
import classes from './StreamHead.module.css';
import Button from '../../UI/Button/Button';
import Radium from 'radium';

interface streamHeadProps {
    name: string;
    connectingStatus: boolean,
    clicked: Function
}

const streamHead = (props: streamHeadProps) => {
    const btnStyles = {
        width: "305px",
        height: "45px",
        fontSize: "18px",
        borderRadius: "25px",
        transitionDuration: "0.3s",
        className: classes.btn,
        text: "Приєднатись до сервера",
        backgroundColor: "#0057c6",
        hover: {
            backgroundColor: '#083d81',
            cursor: 'pointer'
        }
    };
    let icon = <i className="fas fa-play-circle"></i>;

    if (props.connectingStatus)
    {
        btnStyles.backgroundColor = "#da4453";
        btnStyles.text = "Відключитись від сервера!";
        btnStyles.hover.backgroundColor = "#cf1225";
        icon = <i className="fas fa-stop-circle"></i>;
    }

    return (
        <Aux>
            <span className={classes.title}>{props.name}</span>
                <Button {...btnStyles} clicked={props.clicked}>
                    {icon}
                </Button>
        </Aux>
    )
};

export default WithClass(streamHead, classes.streamHead);