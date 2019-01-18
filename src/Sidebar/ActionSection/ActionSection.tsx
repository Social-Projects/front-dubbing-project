import React, { Component } from 'react';
import ButtonSection from './ButtonSection/ButtonSection';
import PlaySection from './PlaySection/PlaySection';
import Aux from '../../hoc/Auxiliary';
import WithClass from '../../hoc/WithClass';
import classes from './ActionSection.module.css';
import apiManager from '../../apiManager';

interface ActionSectionProps {
    performanceId: number;
};

interface ActionSectionState {
    performanceId: number,
    numAudio: number,
    totalTime: number,
    currentTime: number,
    currentSpeechId: any,
    isPlaying: any
};

class ActionSection extends Component<ActionSectionProps, ActionSectionState> {
    apiManager = new apiManager();
    constructor(props: any) {
        super(props);

        this.state = {
            performanceId: this.props.performanceId,
            numAudio: 1,
            totalTime: 90,
            currentTime: 35,
            currentSpeechId: null,
            isPlaying: null
        };
    }

    playPauseHandler = () => {
        if (!this.state.isPlaying) {
            this.apiManager.playSpeech();
            this.setState(
                {
                    isPlaying: true
                }
            )
            this.getStateCurrentSpeechId();
        }
        else {
            this.apiManager.pauseSpeech();
            this.setState(
                {
                    isPlaying: true
                }
            )
            this.getStateCurrentSpeechId();
        }
    }

    nextSpeechHandler = () => {
        this.apiManager.nextSpeech();
        this.getStateCurrentSpeechId();
    }

    prevSpeechHandler = async () => {
        this.apiManager.prevSpeech();
        this.getStateCurrentSpeechId();
    }

    playByIdHandler = (index: number) => {
        this.apiManager.playSpeechById(index);
        this.getStateCurrentSpeechId();
    }

    getStateCurrentSpeechId = async () => {
        const resp = await this.apiManager.getCurrentSpeechId();
        const data = await resp.json();
        this.setState(
            {
                currentSpeechId: data
            }
        )
    }

    render() {
        return (
            <Aux>
                <ButtonSection
                    playHandler={this.playPauseHandler}
                    nextSpeechHandler={this.nextSpeechHandler}
                    prevSpeechHandler={this.prevSpeechHandler}
                    isPlaying={this.state.isPlaying}
                />
                <PlaySection
                    numAudio={this.state.numAudio}
                    totalTime={this.state.totalTime}
                    currentTime={this.state.currentTime} />
            </Aux>
        )
    }
}

export default WithClass(ActionSection, classes.actionSection);