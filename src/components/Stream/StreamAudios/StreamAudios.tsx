import React from 'react';
import StreamAudio from './StreamAudio/StreamAudio';
import withClass from '../../../hoc/WithClass';
import classes from './StreamAudios.module.css';
import Aux from '../../../hoc/Auxiliary';

interface StreamAudioProps {
    audios: any
}

const streamAudios = (props: StreamAudioProps) => {

    const audios = props.audios.map((audio: any, index: number) => {
        return <StreamAudio text={audio.text} duration={audio.duration} key={index} />
    });

    return (
        audios   
    )
}

export default withClass(streamAudios, classes.audios);