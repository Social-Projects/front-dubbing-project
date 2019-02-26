import React, { Component } from "react";
import KeyBinding from "react-keybinding-component";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxiliary";
import WithClass from "../../hoc/WithClass";
import StreamAudios from "./StreamAudios/StreamAudios";
import StreamHead from "./StreamHead/StreamHead";

import * as actionCreators from "../../store/actions/index";
import StateType from "../../store/state/state";

import { signalRManager } from "../../index";
import ApiManager from "../../util/apiManager";
import { KeyChars } from "../../util/keyChars";
import { playbackManager } from "../../util/playbackManager";

import classes from "./Stream.module.css";

interface IStreamState {
    perfomanceId: number;
    performanceName: string;
    isFirst: boolean;
    isWarning: boolean;
}

interface IStreamProps {
    match: {
        params: {
            number: number,
        },
    };
    performanceId: number;
    connectingStatus: boolean;
    isPlaying: boolean;
    currentSpeechId: number;
    maxDuration: number;
    speeches: Array<{
        id: number,
        text: string,
        duration: number,
    }>;
    onSavePerformanceId: Function;
    onLoadSpeeches: Function;
    onSaveCurrentSpeechId: Function;
    onChangeStreamingStatus: Function;
    onChangeStreamStateToInitial: Function;
    onChangeCurrentPlaybackTime: Function;
    onChangeConnectingStatus: Function;
}

interface IMapKeysBinding {
    [KeyChars.Space]: boolean;
    [key: string]: boolean;
}

class Stream extends Component<IStreamProps, IStreamState> {
    private apiManager: ApiManager = new ApiManager();
    private map: IMapKeysBinding = {
        [KeyChars.Space]: false,
    };
    private repeat: boolean = true;

    constructor(props: any) {
        super(props);
        this.state = {
            isFirst: true,
            isWarning: false,
            perfomanceId: this.props.match.params.number,
            performanceName: "",
        };
    }

    public changeConnectingStatus = async (event: Event) => {
        event.preventDefault();

        if (!this.props.connectingStatus) {
            await signalRManager.connectToHub()
                                .catch((error) => console.log(error));
            await signalRManager.sendCommand("Start")
                                .catch((error) => console.log(error));

            this.props.onChangeConnectingStatus(true);
        } else {
            if (this.props.isPlaying) {
                await this.pause();
            }
            await signalRManager.sendCommand("End")
                                .catch((error) => console.log(error));
            await signalRManager.disconnectFromHub()
                                .catch((error) => console.log(error));

            this.props.onChangeConnectingStatus(false);
            this.props.onSaveCurrentSpeechId(this.props.speeches[0].id);
        }
    }

    public playByIdHandler = async (id: number) => {
        if (this.props.connectingStatus) {
            if (this.state.isFirst || (this.props.isPlaying && id !== this.props.currentSpeechId)) {
                await signalRManager.sendCommand(this.props.performanceId + "_" + id);
                this.props.onSaveCurrentSpeechId(id);
                this.props.onChangeStreamingStatus(true);

                playbackManager.reset(this.props.onChangeCurrentPlaybackTime);
                playbackManager.play(
                    this.props.onChangeCurrentPlaybackTime,
                    this.pause.bind(this),
                    this.props.maxDuration);

                if (this.state.isFirst) {
                    this.setState({
                        isFirst: false,
                    });
                }
            } else if (!this.props.isPlaying) {
                await signalRManager.sendCommand(this.props.performanceId + "_" + id);
                this.props.onSaveCurrentSpeechId(id);
                this.props.onChangeStreamingStatus(true);

                playbackManager.play(
                    this.props.onChangeCurrentPlaybackTime,
                    this.pause.bind(this),
                    this.props.maxDuration);
            } else {
                await this.pause();
            }
        }
    }

    public pause = async (): Promise<void> => {
        return await signalRManager.sendCommand("Pause")
                    .then(() => {
                        this.props.onChangeStreamingStatus(false);
                        playbackManager.reset(this.props.onChangeCurrentPlaybackTime);
                    })
                    .catch((error) => console.log(error));
    }

    public playPauseHandler = async (event: Event) => {
        if (this.props.connectingStatus) {
            event.preventDefault();

            if (!this.props.isPlaying) {
                await signalRManager.sendCommand(this.props.performanceId + "_" + this.props.currentSpeechId);
                this.props.onChangeStreamingStatus(true);

                playbackManager.play(
                    this.props.onChangeCurrentPlaybackTime,
                    this.pause.bind(this),
                    this.props.maxDuration);
            } else {
                await this.pause();
            }
        }
    }

    public checkKeys = (...keys: string[]) => {
        for (const key of keys) {
            if (!this.map[key]) {
                return false;
            }
        }

        return true;
    }

    public onKeyDownUpHandler = async (event: KeyboardEvent) => {
        this.map[event.key] = event.type === "keydown";

        if (this.checkKeys(KeyChars.Space) && this.repeat) {
            await this.playPauseHandler(event);
            this.repeat = false;
        } else if (event.type === "keyup") {
            this.repeat = true;
        }
    }

    public render() {
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
                <KeyBinding onKey={(event: KeyboardEvent) => this.onKeyDownUpHandler(event)} type="keydown"/>
                <KeyBinding onKey={(event: KeyboardEvent) => this.onKeyDownUpHandler(event)} type="keyup"/>
            </Aux>
        );
    }

    public async componentDidMount() {
        console.log("state: " + this.state.perfomanceId);

        if (this.state.performanceName === "") {
            const response = await this.apiManager.getPerformanceById(this.state.perfomanceId);
            const performance = await response.json();
            this.setState({
                performanceName: performance.title,
            });
        }

        this.props.onSavePerformanceId(this.state.perfomanceId);
        this.props.onLoadSpeeches(this.state.perfomanceId);
    }

    public async componentWillUnmount() {
        if (this.props.connectingStatus) {
            if (this.props.isPlaying) {
                await this.pause();
            }

            await signalRManager.sendCommand("End")
                                .catch((error) => console.log(error));
            await signalRManager.disconnectFromHub()
                                .catch((error) => console.log(error));

            this.props.onChangeStreamStateToInitial();
        }
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onChangeConnectingStatus: (status: boolean) => dispatch(actionCreators.changeConnectingStatus(status)),
        onChangeCurrentPlaybackTime: (time: number) => dispatch(actionCreators.changeCurrentPlaybackTime(time)),
        onChangeStreamStateToInitial: () => dispatch(actionCreators.changeStreamStateToInitial()),
        onChangeStreamingStatus: (status: boolean) => dispatch(actionCreators.changeStreamingStatus(status)),
        onLoadSpeeches: (id: number) => dispatch(actionCreators.loadSpeeches(id)),
        onSaveCurrentSpeechId: (id: number) => dispatch(actionCreators.saveCurrentSpeechId(id)),
        onSavePerformanceId: (id: number) => dispatch(actionCreators.savePerformanceId(id)),
    };
};

const mapStateToProps = (state: StateType) => {
    return {
        connectingStatus: state.stream.connectingStatus,
        currentSpeechId: state.stream.currentSpeechId,
        isPlaying: state.stream.isPlaying,
        maxDuration: state.stream.maxDuration,
        performanceId: state.stream.performanceId,
        speeches: state.stream.speeches,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithClass(Stream, classes.stream));
