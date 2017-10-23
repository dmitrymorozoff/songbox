export default class Sound {
    constructor(url, audioContext) {
        this.url = url;
        this.audioContext = audioContext;
        this.gainNode = this.audioContext.createGain();
        this.isReadyToPlay = false;
        this.source = null;
    }
    loadSoundFile = () => {
        this.source = this.audioContext.createBufferSource();
        const myRequest = new Request(this.url);
        fetch(myRequest)
            .then(response => {
                return response.arrayBuffer();
            })
            .then(buffer => {
                this.audioContext.decodeAudioData(buffer, decodedData => {
                    if (!this.source.buffer) {
                        this.source.buffer = decodedData;
                    }
                    this.source.connect(this.gainNode);
                    this.gainNode.connect(this.audioContext.destination);
                });
            });
    };
    changeVolume = value => {
        this.gainNode.gain.value = value;
    };
    play = () => {
        this.source.start(0);
    };
}
