import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import WithClass from '../../../hoc/WithClass';
import classes from './StreamHead.module.css';
import Button from '../../UI/Button/Button';
import Radium from 'radium';

interface streamHeadProps {
    name: string;
    isPlaybacking: boolean
}

const streamHead = (props: streamHeadProps) => {

    const btnStyles = {
        width: "263px",
        height: "45px",
        fontSize: "18px",
        borderRadius: "25px",
        transitionDuration: "0.3s",
        className: classes.btn,
        text: "Розпочати трансляцію",
        backgroundColor: "#0057c6",
        hover: {
            backgroundColor: '#083d81',
            cursor: 'pointer'
        }
    };
    let icon = <i className="fas fa-play-circle"></i>;

    if (props.isPlaybacking)
    {
        btnStyles.backgroundColor = "#da4453";
        btnStyles.text = "Зупинити трансляцію";
        btnStyles.hover.backgroundColor = "#cf1225";
        icon = <i className="fas fa-stop-circle"></i>;
    }

    return (
        <Aux>
            <span className={classes.title}>{props.name}</span>
                <Button {...btnStyles}>
                    {icon}
                </Button>
        </Aux>
    )
};

export default WithClass(streamHead, classes.streamHead);