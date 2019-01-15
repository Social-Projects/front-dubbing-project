import React, { Component } from 'react';
import StreamHead from './StreamHead/StreamHead';
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
    isPlay: boolean
}

interface streamProps{

}

class Stream extends Component<streamProps, streamState> {
    apiManager = new apiManager();

    constructor(props: any) {
        super(props);
        this.state = {
            isPlay: false,
            audioInfo: []
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


    render() {
        return (
            <Aux>
                <StreamHead name="Назва вистави"/>
            </Aux>
        )
    }
}

export default WithClass(Stream, classes.stream);