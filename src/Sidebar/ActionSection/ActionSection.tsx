import React, { Component } from 'react';
import ButtonSection from './ButtonSection/ButtonSection';
import PlaySection from './PlaySection/PlaySection';
import Aux from '../../hoc/Auxiliary';
import WithClass from '../../hoc/WithClass';
import classes from './ActionSection.module.css';
import apiManager from '../../apiManager';

class ActionSection extends Component<any, any> {
    apiManager = new apiManager();
    constructor(props: any) {
        super(props);
        this.state = {
            numAudio: 1,
            totalTime: 90,
            currentTime: 35,
            currentSpeechId: null,
            isPlaying: null
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
        this.apiManager.nextSpeech();
    }

    prevSpeechHandler = async (event : any) => {
        await event.preventDefault();
        this.apiManager.prevSpeech();   
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