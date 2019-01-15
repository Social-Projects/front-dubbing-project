import React, { Component } from 'react';
import StreamHead from './StreamHead/StreamHead';
import Aux from '../../hoc/Auxiliary';
import WithClass from '../../hoc/WithClass';
import classes from './Stream.module.css';

class Stream extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            isPlay: false
        };
    }

    render() {
        return (
            <Aux>
                <StreamHead name="Назва вистави"/>
            </Aux>
        )
    }
}

export default WithClass(Stream, classes.stream);