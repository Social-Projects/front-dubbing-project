import React, { Component } from 'react';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import KeyBinding from 'react-keybinding-component';

import * as actions from '../../../../store/actions/index';
import StateType from '../../../../store/state/state';
import ButtonSection from './ButtonSection/ButtonSection';
import PlaySection from './PlaySection/PlaySection';
import Aux from '../../../../hoc/Auxiliary';
import WithClass from '../../../../hoc/WithClass';
import apiManager from '../../../../util/apiManager';
import { KeyChars } from '../../../../util/keyChars';

import classes from './ActionSection.module.css';

interface ActionSectionProps {
    performanceId: number,
    isPlaying: boolean,
    currentSpeechId: number,
    currentSpeechIndex: number,
    speeches: {
        id: number,
        text: string,
        duration: number
    }[],
    onChangeStreamingStatus: Function,
    onChangeCurrentSpeechId: Function
};

interface ActionSectionState {
    performanceId: number,
    totalTime: number,
    currentTime: number
};

interface IMapKeyBindings {
    [KeyChars.Ctrl]: boolean,
    [KeyChars.ArrowRight]: boolean,
    [KeyChars.ArrowLeft]: boolean,
    [key: string]: boolean
};

class ActionSection extends Component<ActionSectionProps, ActionSectionState> {
    private apiManager = new apiManager();
    private map: IMapKeyBindings = {
        [KeyChars.Ctrl]: false,
        [KeyChars.ArrowRight]: false,
        [KeyChars.ArrowLeft]: false
    };
    private repeat: boolean = true;

    constructor(props: any) {
        super(props);

        this.state = {
            performanceId: this.props.performanceId,
            totalTime: 90,
            currentTime: 0
        };
    }

    playPauseHandler = async(event : Event) => {
        // event.preventDefault();
        // if (!this.state.isPlaying) {
        //     await this.apiManager.playSpeech();
        //     this.setState(
        //         {
        //             isPlaying: true
        //         }
        //     )
            
        // }
        // else {
        //     await this.apiManager.pauseSpeech();
        //     this.setState(
        //         {
        //             isPlaying: false
        //         }
        //     )
            
        // }
        event.preventDefault();

        if (!this.props.isPlaying) {
            await this.playByIdHandler(this.props.currentSpeechId);
            this.props.onChangeStreamingStatus(true);
        } else if(this.props.isPlaying) {
            await this.apiManager.pauseSpeech();
            this.props.onChangeStreamingStatus(false);
        }
    }

    nextSpeechHandler = async (event : Event) => {
        // await event.preventDefault();
        // if (this.state.isPlaying) {
        //     this.apiManager.nextSpeech();

        //     const updatedState = {
        //         ...this.state
        //     };

        //     updatedState.numCurrentSpeech = updatedState.numCurrentSpeech + 1;
        //     this.setState(updatedState);
        // }

        event.preventDefault();
        if (this.props.currentSpeechIndex !== this.props.speeches.length - 1) {
            const nextSpeechId = this.props.speeches[this.props.currentSpeechIndex + 1].id;
            this.props.onChangeCurrentSpeechId(nextSpeechId);
            if (this.props.isPlaying) {
                await this.playByIdHandler(nextSpeechId);
            }   
        }
    }

    prevSpeechHandler = async (event : Event) => {
        // await event.preventDefault();
        // if (this.state.isPlaying) {
        //     this.apiManager.prevSpeech();   
    
        //     const updatedState = {
        //         ...this.state
        //     };
    
        //     if (updatedState.numCurrentSpeech > 1) {
        //         updatedState.numCurrentSpeech = updatedState.numCurrentSpeech - 1;
        //     }
        //     this.setState(updatedState);
        // }

        event.preventDefault();

        if (this.props.currentSpeechIndex !== 0) {
            const prevSpeechId = this.props.speeches[this.props.currentSpeechIndex - 1].id;
            this.props.onChangeCurrentSpeechId(prevSpeechId);
            if (this.props.isPlaying) {
                await this.apiManager.playSpeechById(prevSpeechId);
            }
        }
    }

    playByIdHandler = async (id: number) => {
        await this.apiManager.playSpeechById(id);
    }

    checkKeys = (...keys: string[]) => {
        for (let i = 0; i < keys.length; i++) {
            if (!this.map[keys[i]]) {
                return false;
            }
        }

        return true;
    };

    onKeyDownUpHandler = async (event: KeyboardEvent) => {
        this.map[event.key] = event.type === 'keydown';
        
        if (this.checkKeys(KeyChars.Ctrl, KeyChars.ArrowRight) && this.repeat) {
            this.repeat = false;
            await this.nextSpeechHandler(event);
        }
        else if (this.checkKeys(KeyChars.Ctrl, KeyChars.ArrowLeft) && this.repeat) {
            this.repeat = false;
            await this.prevSpeechHandler(event);
        }
        else if (event.type === 'keyup') {
            this.repeat = true;
        }
    };

    render() {
        const totalDuration = this.props.speeches !== undefined
                                ? this.props.speeches[this.props.currentSpeechIndex].duration
                                : 0;
        return (
            <Aux>
                <ButtonSection
                    playPauseHandler={this.playPauseHandler}
                    nextSpeechHandler={this.nextSpeechHandler}
                    prevSpeechHandler={this.prevSpeechHandler}
                    isPlaying={this.props.isPlaying}
                />
                <PlaySection
                    numAudio={this.props.currentSpeechIndex + 1}
                    totalTime={totalDuration}
                    currentTime={this.state.currentTime} />
                <KeyBinding onKey={(event: KeyboardEvent) => this.onKeyDownUpHandler(event) } type='keydown'/>
                <KeyBinding onKey={(event: KeyboardEvent) => this.onKeyDownUpHandler(event) } type='keyup'/>
            </Aux>
        )
    }
}

const mapStateToProps = (state: StateType) => {
    return {
        isPlaying: state.stream.isPlaying,
        speeches: state.stream.speeches,
        currentSpeechId: state.stream.currentSpeechId,
        currentSpeechIndex: state.stream.currentSpeechIndex
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return {
        onChangeStreamingStatus: (status: boolean) => dispatch(actions.changeStreamingStatus(status)),
        onChangeCurrentSpeechId: (id: number) => dispatch(actions.saveCurrentSpeechId(id))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(WithClass(ActionSection, classes.actionSection));