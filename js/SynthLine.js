class SynthLine {
    name;
    audioCtx;
    domPanel;
    osc;

    controllablesParams = [];
    controllersModulesList = [];
    nodesModulesList = [];
    trigList = [];

    connectionsChain = [];
    
    constructor(name) {
        this.name = name;
        this.audioCtx = audioCtx;
        this.generalOutput = this.audioCtx.destination;

        this.domPanel = createDiv("synthPanel", name);
        this.domPanel2 = createDiv("synthPanel2", name);

        console.log(this, "created");
    }
    updateGeneralOutput(output) {
        this.connectionsChain.forEach(e => {
            if(e.defaultOutput === this.generalOutput) {
                e.defaultOutput = output; 
            }
            if(e.output === this.generalOutput) {
                e.output = output;
            }
        })
    }
    updateConnections() {
        let chain = this.connectionsChain.slice();

        let i = 0;
        while(i < chain.length - 1) {
            chain[i].disconnect();
            chain[i].output = chain[i + 1]
            chain[i].connect(chain[i + 1]);
            i ++;
        }  
        chain[chain.length - 1].disconnect();
        chain[chain.length - 1].output = this.generalOutput;
        chain[chain.length - 1].connect(chain[chain.length - 1].output);

        // console.log("synth chain:", chain); 
    }
    displayOnSynthView() {
        if(synthView.childNodes.length < 1) {
            synthView.appendChild(this.domPanel);
            synthView.appendChild(this.domPanel2);

        }
        else {
            synthView.replaceChild(this.domPanel, synthView.childNodes[0]); 
            synthView.replaceChild(this.domPanel2, synthView.childNodes[1]); 

        }
    }
    addControllable(module) {
        // let entry = [module.name, module.controllablesParams];
        
        let entry = {name: module.name, controllablesParams: module.controllablesParams};

        this.controllablesParams.push(entry);

        // this.controllablesParams.push(module.name, module.controllablesParams);
    }
    listControllables() {
        this.controllablesParams.forEach(module => {
            console.log("-----------------------------------");    
        
            console.log(module.name);
            module.controllablesParams.forEach(param => {
                console.log(param);
            })       
        });
    }

}
///////////////////////////////////////////////////////////
//
function createDefaultSynthLine(name) {
    let synthLine = new SynthLine(name || "defaultSynth");
    
    let osc = createOscillator1(synthLine);
    synthLine.osc = osc;  
    // synthLine.osc.gainNode.gain.value = 1;  

    // synthLine.modulesList[nodesList].push(osc);
    synthLine.connectionsChain.push(osc.gainNode);
    synthLine.domPanel.appendChild(osc.domPanel);
    // synthLine.domPanel.appendChild(osc.gainNode.domPanel);
    
    let gecOscGain = createGraphicalEnvController1("gecOscGain", synthLine, synthLine.osc.gainNode.gain, "value", "1");
    synthLine.domPanel.appendChild(gecOscGain.domPanel);

    let gec2OscFreq = createGraphicalEnvController1("gec2OscFreq", synthLine, synthLine.osc.frequency, "value");
    synthLine.domPanel.appendChild(gec2OscFreq.domPanel);

    let filterModule = createFilter2filters("filter2Filters", synthLine, osc.gainNode);
    synthLine.domPanel.appendChild(filterModule.domPanel);

    // console.log(filterModule.filtersList[0].frequency.controlsList["value"][0].value);

    let spectrum = createSpectrum1(synthLine);
    synthLine.domPanel.appendChild(spectrum.domPanel);

    synthLine.updateGeneralOutput(spectrum);
    synthLine.generalOutput = spectrum;
    synthLine.updateConnections();

    // synthLine.updateConnections();
    synthLine.displayOnSynthView();

    return synthLine;
}