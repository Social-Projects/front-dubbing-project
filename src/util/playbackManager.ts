class PlaybackManager {
    public currentTime: number;
    private isPause: boolean;
    private timerId: any;

    constructor() {
        this.currentTime = 0;
        this.isPause = true;
        this.timerId = 0;
    }

    play = (changeCurrentPlaybackTime: Function) => {
        if (!this.timerId) {
            this.isPause = false;
            this.timerId = setInterval(() => {
                if (!this.isPause) {
                    this.currentTime++;
                    changeCurrentPlaybackTime(this.currentTime);
                    console.log(this.currentTime);
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