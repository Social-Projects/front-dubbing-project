import React, { Component } from 'react';
import ButtonSection from './ButtonSection/ButtonSection';
import PlaySection from './PlaySection/PlaySection';
import Aux from '../../../hoc/Auxiliary';
import WithClass from '../../../hoc/WithClass';
import classes from './ActionSection.module.css';

class ActionSection extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            numAudio: 1,
            totalTime: 90,
            currentTime: 0 
        };
    }

    render() {
        return (
            <Aux>
                <ButtonSection />
                <PlaySection
                    numAudio={this.state.numAudio}
                    totalTime={this.state.totalTime}
                    currentTime={this.state.currentTime} />
            </Aux>
        )
    }
}

export default WithClass(ActionSection, classes.actionSection);