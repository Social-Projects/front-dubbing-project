import React, { Component } from 'react';
import ButtonSection from './ButtonSection/ButtonSection';
import PlaySection from './PlaySection/PlaySection';
import Aux from '../../../../hoc/Auxiliary';
import WithClass from '../../../../hoc/WithClass';
import classes from './ActionSection.module.css';
import apiManager from '../../../../util/apiManager';

interface ActionSectionProps {
    performanceId: number;
};

interface ActionSectionState {
    performanceId: number,
    numCurrentSpeech: number,
    totalTime: number,
    currentTime: number,
    currentSpeechId: any,
    isPlaying: boolean
};

class ActionSection extends Component<ActionSectionProps, ActionSectionState> {
    apiManager = new apiManager();
    constructor(props: any) {
        super(props);

        this.state = {
            performanceId: this.props.performanceId,
            numCurrentSpeech: 1,
            totalTime: 90,
            currentTime: 0,
            currentSpeechId: null,
            isPlaying: false
        };
    }

    playPauseHandler = async(event : any) => {
        event.preventDefault();
        if (!this.state.isPlaying) {
            await this.apiManager.playSpeech();
            this.setState(
                {
                    isPlaying: true
                }
            )
            
        }
        else {
            await this.apiManager.pauseSpeech();
            this.setState(
                {
                    isPlaying: false
                }
            )
            
        }
    }

    nextSpeechHandler = async (event : any) => {
        await event.preventDefault();
        if (this.state.isPlaying) {
            this.apiManager.nextSpeech();

            const updatedState = {
                ...this.state
            };

            updatedState.numCurrentSpeech = updatedState.numCurrentSpeech + 1;
            this.setState(updatedState);
        }
    }

    prevSpeechHandler = async (event : any) => {
        await event.preventDefault();
        if (this.state.isPlaying) {
            this.apiManager.prevSpeech();   
    
            const updatedState = {
                ...this.state
            };
    
            if (updatedState.numCurrentSpeech > 1) {
                updatedState.numCurrentSpeech = updatedState.numCurrentSpeech - 1;
            }
            this.setState(updatedState);
        }
    }

    playByIdHandler = async (index: number) => {
        await this.apiManager.playSpeechById(index);
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
                    playPauseHandler={this.playPauseHandler}
                    nextSpeechHandler={this.nextSpeechHandler}
                    prevSpeechHandler={this.prevSpeechHandler}
                    isPlaying={this.state.isPlaying}
                />
                <PlaySection
                    numAudio={this.state.numCurrentSpeech}
                    totalTime={this.state.totalTime}
                    currentTime={this.state.currentTime} />
            </Aux>
        )
    }
}

export default WithClass(ActionSection, classes.actionSection);