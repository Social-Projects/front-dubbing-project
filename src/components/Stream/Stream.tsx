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

import classes from './Stream.module.css';

interface streamState {
    perfomanceId: number,
    isFirst: boolean
}

interface streamProps {
    match: {
        params: {
            number: number
        }
    },
    isPlaying: boolean,
    currentSpeechId: number,
    speeches: {
        id: number,
        text: string,
        duration: number
    }[],
    onSavePerformanceId: Function,
    onLoadSpeeches: Function,
    onSaveCurrentSpeechId: Function,
    onChangeStreamingStatus: Function,
    onChangeStreamStateToInitial: Function
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
            isFirst: true
        };
    }

    getCurrentSpeechId = async () => {
        const resp = await this.apiManager.getCurrentSpeechId();

        if(resp.status == 200) {
            const data: number = await resp.json();
            this.props.onSaveCurrentSpeechId(data);
        } else {
            console.log('Something went wrong!');
        }
    }

    playByIdHandler = async(id: number) => {
        // if ((this.props.isPlaying && id !== this.props.currentSpeechId) || this.state.isFirst) {
        //     await this.apiManager.playSpeechById(id);
        //     await this.getCurrentSpeechId();

        //     this.props.onChangeStreamingStatus(true);
        //     this.setState({
        //         isFirst: false
        //     });
        // }
        // else {
        //     await this.apiManager.pauseSpeech();
        //     this.props.onChangeStreamingStatus(false);
        // }

        if (this.state.isFirst || (this.props.isPlaying && id !== this.props.currentSpeechId)) {
            await this.apiManager.playSpeechById(id);
            await this.getCurrentSpeechId();
            this.props.onChangeStreamingStatus(true);

            if (this.state.isFirst) {
                this.setState({
                    isFirst: false
                });
            }
        } else if (!this.props.isPlaying) {
            await this.apiManager.playSpeechById(id);
            await this.getCurrentSpeechId();
            this.props.onChangeStreamingStatus(true);
        } else {
            await this.apiManager.pauseSpeech();
            this.props.onChangeStreamingStatus(false);
        }
    }
    
    playPauseHandler = async (event: Event) => {
        event.preventDefault();

        if (!this.props.isPlaying) {
            await this.apiManager.playSpeechById(this.props.currentSpeechId);
            this.props.onChangeStreamingStatus(true);
        }
        else {
            await this.apiManager.pauseSpeech();
            this.props.onChangeStreamingStatus(false);
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
                    name="Назва вистави"
                    isPlaybacking={this.props.isPlaying}
                    clicked={this.playPauseHandler} />
                <StreamAudios
                    audios={this.props.speeches !== undefined ? this.props.speeches : []}
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
        await this.apiManager.load(this.state.perfomanceId);

        this.props.onSavePerformanceId(this.state.perfomanceId);
        this.props.onLoadSpeeches(this.state.perfomanceId);;
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
        onChangeStreamStateToInitial: () => dispatch(actionCreators.changeStreamStateToInitial())
    };
};

const mapStateToProps = (state: StateType) => {
    return {
        speeches: state.stream.speeches,
        isPlaying: state.stream.isPlaying,
        currentSpeechId: state.stream.currentSpeechId
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithClass(Stream, classes.stream));