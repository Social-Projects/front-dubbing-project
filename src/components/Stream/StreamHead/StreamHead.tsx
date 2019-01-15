import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import WithClass from '../../../hoc/WithClass';
import classes from './StreamHead.module.css';
import Button from '../../Button/Button';

interface streamHeadProps {
    name: string;
}

const streamHead = (props: streamHeadProps) => {
    return (
        <Aux>
            <span className={classes.title}>{props.name}</span>
            <Button
                width="263px"
                height="45px"
                backgroundColor="#0057c6"
                fontSize="18px"
                borderRadius="25px"
                text="Розпочати трансляцію"
                transitionDuration="0.3s"
                className={classes.btn}>
                <i className="fas fa-play-circle"></i>
            </Button>
        </Aux>
    )
};

export default WithClass(streamHead, classes.streamHead);