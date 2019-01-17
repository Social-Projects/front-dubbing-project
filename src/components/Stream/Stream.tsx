import React, { Component } from 'react';
import StreamHead from './StreamHead/StreamHead';
import StreamAudios from './StreamAudios/StreamAudios';
import Aux from '../../hoc/Auxiliary';
import WithClass from '../../hoc/WithClass';
import classes from './Stream.module.css';
import apiManager from '../../apiManager';
import { async } from 'q';

interface streamState {
    audioInfo: {
        id: number,
        text: string,
        duration: number
    }[],
    isPlay: boolean,
    currentSpeechId: number
}

interface streamProps {

}

class Stream extends Component<streamProps, streamState> {
    apiManager = new apiManager();

    constructor(props: any) {
        super(props);
        this.state = {
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


    componentDidMount() {
        this.apiManager.load(1);

        this.getSpeechInfo(1);
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