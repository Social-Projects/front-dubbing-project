import React, { Component } from 'react';
import StreamHead from './StreamHead/StreamHead';
import StreamAudios from './StreamAudios/StreamAudios';
import Aux from '../../hoc/Auxiliary';
import WithClass from '../../hoc/WithClass';
import classes from './Stream.module.css';
import apiManager from '../../apiManager';
import { async } from 'q';

interface streamState{
    audioInfo: {
        id:number,
        text: string,
        duration: number
    }[],
    isPlay: boolean,
    currentSpeechId: number
}

interface streamProps{

}

class Stream extends Component<streamProps, streamState> {
    apiManager = new apiManager();

    constructor(props: any) {
        super(props);
        this.state = {
            isPlay: false,
            audioInfo: [
                {
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt" +
                        "ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco" +
                        "laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate" +
                        "velit esse cillum dolore eu fugiat nulla pariatur.",
                    duration: 120,
                    id: 1
                },
                {
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt" +
                        "ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco" +
                        "laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate" +
                        "velit esse cillum dolore eu fugiat nulla pariatur.",
                    duration: 80,
                    id: 2
                },
                {
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt" +
                        "ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco" +
                        "laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate" +
                        "velit esse cillum dolore eu fugiat nulla pariatur.",
                    duration: 65,
                    id: 3
                },
                {
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt" +
                        "ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco" +
                        "laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate" +
                        "velit esse cillum dolore eu fugiat nulla pariatur.",
                    duration: 100,
                    id: 4
                },
                {
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt" +
                        "ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco" +
                        "laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate" +
                        "velit esse cillum dolore eu fugiat nulla pariatur.",
                    duration: 95,
                    id: 5
                },
                {
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt" +
                        "ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco" +
                        "laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate" +
                        "velit esse cillum dolore eu fugiat nulla pariatur.",
                    duration: 180,
                    id: 6
                },
                {
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt" +
                        "ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco" +
                        "laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate" +
                        "velit esse cillum dolore eu fugiat nulla pariatur.",
                    duration: 194,
                    id: 7
                },
                {
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt" +
                        "ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco" +
                        "laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate" +
                        "velit esse cillum dolore eu fugiat nulla pariatur.",
                    duration: 132,
                    id: 8
                },
                {
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt" +
                        "ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco" +
                        "laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate" +
                        "velit esse cillum dolore eu fugiat nulla pariatur.",
                    duration: 177,
                    id: 9
                },
                {
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt" +
                        "ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco" +
                        "laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate" +
                        "velit esse cillum dolore eu fugiat nulla pariatur.",
                    duration: 185,
                    id: 10
                },
            ],
            //audioInfo: [],
            currentSpeechId: -1
        };
    }

    getAudioInfo = async(index:number) =>{
        const resp = await this.apiManager.getSpeechInfo(index);
            const data = await resp.json();
            this.setState(
                {
                    audioInfo: data
                });
    }

    getCurrentSpeechId=async() => {
        const resp = await this.apiManager.getCurrentSpeechId();
        const data : number = await resp.json();
        this.setState(
            {
                currentSpeechId: data
            }
        )
        return data;
    }


    render() {
        return (
            <Aux>
                <StreamHead name="Назва вистави" isPlaybacking={this.state.isPlay}/>
                <StreamAudios audios={this.state.audioInfo} currentAudioId={this.state.currentSpeechId}/>
            </Aux>
        )
    }
}

export default WithClass(Stream, classes.stream);