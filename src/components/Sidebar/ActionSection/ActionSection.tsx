import React, { Component } from 'react';
import ButtonSection from './ButtonSection/ButtonSection';
import PlaySection from './PlaySection/PlaySection';
import Aux from '../../../hoc/Auxiliary';
import WithClass from '../../../hoc/WithClass';
import classes from './ActionSection.module.css';

interface ActionSectionProps {}

class ActionSection extends Component<ActionSectionProps, any> {
    constructor(props: ActionSectionProps) {
        super(props);
        this.state = {
            numAudio: 1,
            totalTime: 90,
            currentTime: 35
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