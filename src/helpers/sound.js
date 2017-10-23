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
    playSynth = (note, beat, volume = 0.15) => {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        oscillator.frequency.value = note / 4;
        oscillator.type = "square";
        oscillator.connect(gainNode);
        gainNode.gain.value = volume;
        gainNode.connect(this.audioContext.destination);
        oscillator.start(0);
        gainNode.gain.setTargetAtTime(
            0,
            this.audioContext.currentTime,
            beat - 0.05 || 0.185
        );
        oscillator.onended = () => this.audioContext.close();
    };
    changeVolume = value => {
        this.gainNode.gain.value = value;
    };
    play = () => {
        this.source.start(0);
    };
}
