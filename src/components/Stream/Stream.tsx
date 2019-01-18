import React, { Component } from 'react';
import StreamHead from './StreamHead/StreamHead';
import StreamAudios from './StreamAudios/StreamAudios';
import Aux from '../../hoc/Auxiliary';
import WithClass from '../../hoc/WithClass';
import classes from './Stream.module.css';
import apiManager from '../../apiManager';
import { async } from 'q';
import SidebarItem from '../../Sidebar/SidebarItem';

interface streamState {
    perfomanceId: number,
    audioInfo: {
        id: number,
        text: string,
        duration: number
    }[],
    isPlay: boolean,
    currentSpeechId: number
}

interface streamProps {
    match: {
        params: {
            number: number
        }
    }
}

class Stream extends Component<streamProps, streamState> {
    apiManager = new apiManager();

    constructor(props: any) {
        super(props);
        this.state = {
            perfomanceId: this.props.match.params.number,
            isPlay: false,
            audioInfo: [],
            currentSpeechId: -1
        };
    }

    getSpeechInfo = async (index: number) => {
        const resp = await this.apiManager.getSpeechInfo(index);
        const data = await resp.json();
        
        this.setState(
            {
                audioInfo: data
            });
    }

    getCurrentSpeechId = async () => {
        const resp = await this.apiManager.getCurrentSpeechId();

        if(resp.status == 200){
        const data: number = await resp.json();
        this.setState(
            {
                currentSpeechId: data
            }
        )
        return data;
        }
        else {
            return -1;
        }
    }

    playByIdHandler = async(index: number) => {
        await this.apiManager.playSpeechById(index);
        await this.getCurrentSpeechId();
    }

    async componentDidMount() {
        // this.setState({
        //     perfomanceId: parseInt(this.props.match.params.number.toString())
        // });
        console.log("state: " + this.state.perfomanceId);

        await this.apiManager.load(this.state.perfomanceId);
        await this.getSpeechInfo(this.state.perfomanceId);
    }
    
    render() {
        return (
            <Aux>
                <StreamHead name="Назва вистави" isPlaybacking={this.state.isPlay} />
                <StreamAudios
                    audios={this.state.audioInfo}
                    currentAudioId={this.state.currentSpeechId}
                    playByIdHandler={this.playByIdHandler} />
            </Aux>
        )
    }
}

export default WithClass(Stream, classes.stream);