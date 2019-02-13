import React, { Component } from 'react';
import { connect } from 'react-redux';
import KeyBinding from 'react-keybinding-component';

import StreamHead from './StreamHead/StreamHead';
import StreamAudios from './StreamAudios/StreamAudios';
import Aux from '../../hoc/Auxiliary';
import WithClass from '../../hoc/WithClass';
import apiManager from '../../util/apiManager';
import * as actionCreators from '../../store/actions/index'; 
import StateType from '../../store/state/state';
import { KeyChars } from '../../util/keyChars';
import { playbackManager } from '../../util/playbackManager';

import classes from './Stream.module.css';

interface streamState {
    perfomanceId: number,
    performanceName: string,
    isFirst: boolean
}

interface streamProps {
    match: {
        params: {
            number: number
        }
    },
    connectingStatus: boolean,
    isPlaying: boolean,
    currentSpeechId: number,
    maxDuration: number,
    speeches: {
        id: number,
        text: string,
        duration: number
    }[],
    onSavePerformanceId: Function,
    onLoadSpeeches: Function,
    onSaveCurrentSpeechId: Function,
    onChangeStreamingStatus: Function,
    onChangeStreamStateToInitial: Function,
    onChangeCurrentPlaybackTime: Function,
    onChangeConnectingStatus: Function
}

interface IMapKeysBinding {
    [KeyChars.Space]: boolean,
    [key: string]: boolean
};

class Stream extends Component<streamProps, streamState> {
    private apiManager: apiManager = new apiManager();
    private map: IMapKeysBinding = {
        [KeyChars.Space]: false
    };
    private repeat: boolean = true;

    constructor(props: any) {
        super(props);
        this.state = {
            perfomanceId: this.props.match.params.number,
            performanceName: '',
            isFirst: true
        };
    }

    changeConnectingStatus = async (event: Event) => {
        event.preventDefault();

        if (!this.props.connectingStatus) {
            await this.apiManager.connectToHub();
            this.props.onChangeConnectingStatus(true);
        } else {
            await this.apiManager.disconnectToHub();
            this.props.onChangeConnectingStatus(false);
        }
    };

    playByIdHandler = async(id: number) => {
        if (this.props.connectingStatus) {
            if (this.state.isFirst || (this.props.isPlaying && id !== this.props.currentSpeechId)) {
                await this.apiManager.playSpeechById(id);
                this.props.onSaveCurrentSpeechId(id);
                this.props.onChangeStreamingStatus(true);
    
                playbackManager.reset(this.props.onChangeCurrentPlaybackTime);
                playbackManager.play(
                    this.props.onChangeCurrentPlaybackTime,
                    this.pause.bind(this),
                    this.props.maxDuration);
    
                if (this.state.isFirst) {
                    this.setState({
                        isFirst: false
                    });
                }
            } else if (!this.props.isPlaying) {
                await this.apiManager.playSpeechById(id);
                this.props.onSaveCurrentSpeechId(id);
                this.props.onChangeStreamingStatus(true);
    
                playbackManager.play(
                    this.props.onChangeCurrentPlaybackTime,
                    this.pause.bind(this),
                    this.props.maxDuration);
            } else {
                await this.apiManager.pauseSpeech();
                this.props.onChangeStreamingStatus(false);
    
                playbackManager.reset(this.props.onChangeCurrentPlaybackTime);
            }
        }
    }
    
    pause = async () => {
        await this.apiManager.pauseSpeech();
        this.props.onChangeStreamingStatus(false);
        playbackManager.reset(this.props.onChangeCurrentPlaybackTime);
    };

    playPauseHandler = async (event: Event) => {
        if (this.props.connectingStatus) {
            event.preventDefault();

            if (!this.props.isPlaying) {
                await this.apiManager.playSpeechById(this.props.currentSpeechId);
                this.props.onChangeStreamingStatus(true);
    
                playbackManager.play(
                    this.props.onChangeCurrentPlaybackTime,
                    this.pause.bind(this),
                    this.props.maxDuration);
            }
            else {
                await this.pause();
            }
        }
    };
    
    checkKeys = (...keys: string[]) => {
        for (let i = 0; i < keys.length; i++) {
            if (!this.map[keys[i]]) {
                return false;
            }
        }

        return true;
    }

    onKeyDownUpHandler = async (event: KeyboardEvent) => {
        this.map[event.key] = event.type === 'keydown';
        
        if (this.checkKeys(KeyChars.Space) && this.repeat) {
            await this.playPauseHandler(event);
            this.repeat = false;
        }
        else if (event.type === 'keyup'){
            this.repeat = true;
        }
    }

    render() {
        return (
            <Aux>
                <StreamHead
                    name={this.state.performanceName}
                    connectingStatus={this.props.connectingStatus}
                    clicked={(event: Event) => this.changeConnectingStatus(event) } />
                <StreamAudios
                    audios={this.props.speeches !== undefined ? this.props.speeches : []}
                    connectingStatus={this.props.connectingStatus}
                    currentAudioId={this.props.currentSpeechId}
                    playByIdHandler={this.playByIdHandler}
                    isPlaying={this.props.isPlaying} />
                <KeyBinding onKey={(event: KeyboardEvent) => this.onKeyDownUpHandler(event)} type='keydown'/>
                <KeyBinding onKey={(event: KeyboardEvent) => this.onKeyDownUpHandler(event)} type='keyup'/>
            </Aux>
        )
    }

    async componentDidMount() {
        console.log("state: " + this.state.perfomanceId);
        //await this.apiManager.load(this.state.perfomanceId);

        if (this.state.performanceName === '') {
            const response = await this.apiManager.getPerformanceById(this.state.perfomanceId);
            let performance = await response.json();
            this.setState({
                performanceName: performance.title
            });
        }

        this.props.onSavePerformanceId(this.state.perfomanceId);
        this.props.onLoadSpeeches(this.state.perfomanceId);
    }

    componentWillUnmount() {
        this.props.onChangeStreamStateToInitial();
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSavePerformanceId: (id: number) => dispatch(actionCreators.savePerformanceId(id)),
        onLoadSpeeches: (id: number) => dispatch(actionCreators.loadSpeeches(id)),
        onSaveCurrentSpeechId: (id: number) => dispatch(actionCreators.saveCurrentSpeechId(id)),
        onChangeStreamingStatus: (status: boolean) => dispatch(actionCreators.changeStreamingStatus(status)),
        onChangeStreamStateToInitial: () => dispatch(actionCreators.changeStreamStateToInitial()),
        onChangeCurrentPlaybackTime: (time: number) => dispatch(actionCreators.changeCurrentPlaybackTime(time)),
        onChangeConnectingStatus: (status: boolean) => dispatch(actionCreators.changeConnectingStatus(status))
    };
};

const mapStateToProps = (state: StateType) => {
    return {
        speeches: state.stream.speeches,
        isPlaying: state.stream.isPlaying,
        currentSpeechId: state.stream.currentSpeechId,
        maxDuration: state.stream.maxDuration,
        connectingStatus: state.stream.connectingStatus
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithClass(Stream, classes.stream));