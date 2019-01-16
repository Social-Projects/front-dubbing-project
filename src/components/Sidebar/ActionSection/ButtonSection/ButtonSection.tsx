import React from 'react';
import Aux from '../../../../hoc/Auxiliary';
import WithClass from '../../../../hoc/WithClass';
import classes from './ButtonSection.module.css';

interface buttonSectionProps {};

const buttonSection = (props: buttonSectionProps) => {
    return (
        <Aux>
            <a href="" className={classes.prev}>
                <i className="fas fa-fast-backward"></i>
            </a>

            <a href="" className={classes.act}>
                <i className="fas fa-play"></i>
            </a>

            <a href="" className={classes.next}>
                <i className="fas fa-fast-forward"></i>
            </a>
        </Aux>
    )
}

export default WithClass(buttonSection, classes.btnSection);