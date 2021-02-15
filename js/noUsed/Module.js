class OscillatorModule {
    synth;
    osc;
    
    constructor(synth) {
        this.synth = synth;

        this.osc = this.createOsc();
    }

    createOsc() {
        let osc = this.synth.audioCtx.createOscillator();
        osc.name = "osc_" + this.synth.name;

        osc.gainNode = this.createOscGain();

        this.osc = osc;
        this.initOscAndGain();
    }

    createOscGain() {
        let gainNode = this.synth.audioCtx.createGain();
        gainNode.name = "oscGain_" + this.synth.name;

        return gainNode;
    }
}