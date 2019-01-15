import React, { Component } from 'react';
import StreamHead from './StreamHead/StreamHead';
import StreamAudios from './StreamAudios/StreamAudios';
import Aux from '../../hoc/Auxiliary';
import WithClass from '../../hoc/WithClass';
import classes from './Stream.module.css';

class Stream extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            isPlay: false,
            audios: [
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
            currentAudioId: 0
        };
    }

    render() {
        return (
            <Aux>
                <StreamHead name="Назва вистави" isPlaybacking={this.state.isPlay}/>
                <StreamAudios audios={this.state.audios} currentAudioId={this.state.currentAudioId}/>
            </Aux>
        )
    }
}

export default WithClass(Stream, classes.stream);