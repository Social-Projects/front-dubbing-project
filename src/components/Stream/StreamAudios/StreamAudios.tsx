import React from 'react';
import StreamAudio from './StreamAudio/StreamAudio';
import withClass from '../../../hoc/WithClass';
import classes from './StreamAudios.module.css';

interface StreamAudioProps {
    audios: any,
    currentAudioId: number
}

const streamAudios = (props: StreamAudioProps) => {

    const audios = props.audios.map((audio: any, index: number) => {
        return <StreamAudio
                    text={audio.text}
                    duration={audio.duration}
                    key={index}
                    isPlaying={props.currentAudioId === audio.id ? true : false} />
    });

    return (
        audios   
    )
}

export default withClass(streamAudios, classes.audios);