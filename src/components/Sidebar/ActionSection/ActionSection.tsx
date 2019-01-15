import React, { Component } from 'react';
import ButtonSection from './ButtonSection/ButtonSection';
import PlaySection from './PlaySection/PlaySection';
import Aux from '../../../hoc/Auxiliary';
import WithClass from '../../../hoc/WithClass';
import classes from './ActionSection.module.css';
import apiManager from '../../../apiManager';

class ActionSection extends Component<any, any> {
    apiManager = new apiManager();
    constructor(props: any) {
        super(props);
        this.state = {
            numAudio: 1,
            totalTime: 90,
            currentTime: 0 
        };
    }

    playHandler =() =>{
        this.apiManager.playAudio();
    }
    
    playByIdHandler = (index:number) => {
        this.apiManager.playAudioById(index);
    }

    pauseHandler =() =>{
        this.apiManager.pauseAudio();
    }

    nextAudioHandler = () =>{
        this.apiManager.nextAudio();
    }

    prevAudioHandler = () =>{
        this.apiManager.prevAudio();
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