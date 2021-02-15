function createSpectrum1(synth) {
    let spectrum = createSpectrum(synth);
    // spectrumInitConnections(spectrum);
    spectrumCreateDomPanel1(spectrum);

    return spectrum;
}

function createSpectrum(synth) {
    let spectrum = synth.audioCtx.createAnalyser();
    spectrum.synth = synth;
    spectrum.name = "spectrum_" + synth.name;

    spectrumInitConnections(spectrum);

    spectrum.canvas = createCanvas("spectrumCanvas", spectrum.name, 100, 50);
    spectrum.canvasCtx = spectrum.canvas.getContext("2d");

    spectrum.domPanel = createDiv("modulePanel", spectrum.name);

    spectrum.fftSize = 256;
    spectrum.buffer = spectrum.frequencyBinCount;
    spectrum.tabData = new Uint8Array(spectrum.buffer);

     spectrum.run = () => {
         runSpectrum.call(spectrum);
    };

    spectrum.run();

    console.log(spectrum, "created");
    return spectrum;
}

function spectrumInitConnections(spectrum) {
    spectrum.defaultOutput = spectrum.synth.generalOutput;
    spectrum.output = spectrum.defaultOutput;
    // spectrum.input = spectrum.synth.connectionsChain[spectrum.synth.connectionsChain.length - 1];

    spectrum.connect(spectrum.output);
}

function runSpectrum() {
    this.reqAnimationId = undefined;
    spectrumAnimationStart(this);

    this.getByteFrequencyData(this.tabData);

    let r, g, b;
    let unityHeight = this.canvas.height /255;
    let barHeight;
    let barWidth = this.canvas.width /this.buffer;

    drawScreen(this);
    let str = "";
    let x = 0;
    for(let i = 0; i < this.buffer; i++) {
        str += this.tabData[i];
        barHeight = (this.tabData[i] * unityHeight) - 5;
        r = (barHeight + 100),
        g = (x + i -100) + (barHeight),
        b = barWidth - i;

        this.canvasCtx.fillStyle = 'rgb(' + r + ", " + g+ ", " + b + ")";            

        this.canvasCtx.fillRect(x, this.canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
    }
}

function drawScreen(spectrum) {
    let ctx = spectrum.canvasCtx;
    
    ctx.fillStyle = '#131010';
    ctx.fillRect(0, 0, spectrum.canvas.width, spectrum.canvas.height);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#afa735";
    ctx.strokeRect(0, 0, spectrum.canvas.width, spectrum.canvas.height);
}

function spectrumAnimationStart(spectrum) {
    if(spectrum.reqAnimationId === undefined) {
        spectrum.reqAnimationId = window.requestAnimationFrame(spectrum.run);
    }
}
function spectrumAnimationStop(spectrum) {
    if(spectrum.reqAnimationId) {
        window.cancelAnimationFrame(spectrum.reqAnimationId);
        spectrum.reqAnimationId = undefined;
        drawScreen(spectrum);
    }
}

///////////////////////////////////////////
//DOM

function spectrumCreateDomPanel1(spectrum) {
    let divTitle = createDiv("divTitle", spectrum.name);
    divTitle.textContent = spectrum.name;
    spectrum.domPanel.appendChild(divTitle);

    let divCanvas = createDiv("divCanvas", )
    divCanvas.appendChild(spectrumCreateCanvas(spectrum));
    spectrum.domPanel.appendChild(divCanvas);

}

function spectrumCreateCanvas(spectrum) {
    let subDivCanvas = createDiv("subDiv", "spectrumCanvas");
    subDivCanvas.appendChild(spectrum.canvas);

    return subDivCanvas;
}