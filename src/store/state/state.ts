export default interface State {
    stream: {
        performanceId: number,
        speeches: {
            id: number,
            text: string,
            duration: number
        }[],
        isPlaying: boolean,
        currentSpeechId: number,
        currentSpeechIndex: number,
        currentPlaybackTime: number,
        maxDuration: number
    }
}