class PlaybackManager {
    public currentTime: number;
    private maxDuration: number;
    private isPause: boolean;
    private timerId: any;

    constructor() {
        this.currentTime = 0;
        this.maxDuration = 0;
        this.isPause = true;
        this.timerId = 0;
    }

    play = (changeCurrentPlaybackTime: Function, pause: Function, totalDuration: number) => {
        if (!this.timerId) {
            this.isPause = false;
            this.maxDuration = totalDuration;
            this.timerId = setInterval(() => {
                if (!this.isPause && this.currentTime < this.maxDuration) {
                    this.currentTime++;
                    changeCurrentPlaybackTime(this.currentTime);
                }
                else if (this.currentTime >= this.maxDuration) {
                    pause();
                }
            }, 1000);
        }
    };

    pause = () => {
        if (this.timerId)
            this.isPause = true;
    }
    
    continue = () => {
        if (this.timerId)
            this.isPause = false;
    };

    reset = (onChangeCurrentPlaybackTime: Function) => {
        if (this.timerId) {
            this.isPause = true;
            this.currentTime = 0;
            onChangeCurrentPlaybackTime(this.currentTime);

            clearInterval(this.timerId);
            this.timerId = 0;
        }
    }
}

export const playbackManager = new PlaybackManager();