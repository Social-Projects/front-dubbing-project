import signalrManager from "../../util/signalrManager";

export default interface State {
    stream: {
        performanceId: number,
        speeches: {
            id: number,
            text: string,
            duration: number
        }[],
        connectingStatus: boolean,
        isPlaying: boolean,
        currentSpeechId: number,
        currentSpeechIndex: number,
        currentPlaybackTime: number,
        maxDuration: number
    }
}