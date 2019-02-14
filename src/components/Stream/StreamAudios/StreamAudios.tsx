import React from 'react';
import StreamAudio from './StreamAudio/StreamAudio';
import withClass from '../../../hoc/WithClass';
import classes from './StreamAudios.module.css';

interface StreamAudioProps {
    audios: any,
    currentAudioId: number,
    playByIdHandler: any,
    isPlaying: boolean,
    connectingStatus: boolean
}

const streamAudios = (props: StreamAudioProps) => {
    const audios = props.audios.map((audio: any, index: number) => {
        return <StreamAudio
                    key={index}
                    text={audio.text}
                    duration={audio.duration}
                    currentAudioId={audio.id}
                    isPlaying={props.currentAudioId === audio.id && props.isPlaying ? true : false}
                    playByIdHandler={props.playByIdHandler}
                    connectingStatus={props.connectingStatus} />
    });

    return (
        audios
    )
}

export default withClass(streamAudios, classes.audios);