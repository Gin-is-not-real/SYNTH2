function createOscillator1(synth) {
    let osc = createOsc(synth);
    // oscInitState1(osc);
    oscInitConnections(osc);
    oscCreateDomPanel1(osc);
    gainCreateDomPanel(osc.gainNode);

    return osc;
}
/////////////////////////////////////////////////////////////////////
function createOsc(synth) {
    //OSC
    let osc = synth.audioCtx.createOscillator();
    osc.synth = synth;
    osc.name = synth.name + "Osc";
    // osc.controllablesParams = [];
    osc.controllersList = [];
    osc.frequency.value = 440;

    osc.domPanel = createDiv("modulePanel", osc.name); 

    //GAIN
    osc.gainNode = synth.audioCtx.createGain();
    osc.gainNode.name = "oscGain_" + synth.name;

    osc.gainNode.gain.value = 0;
    osc.gainNode.domPanel = createDiv("modulePanel", osc.name + "Gain"); 


    osc.controllablesParams = [
        // {text: "type", target: osc, targetedParam: "type"},
        {text: "frequency", target: osc.frequency, targetedParam: "value"},
        {text: "detune", target: osc.detune, targetedParam: "value"},
        {text: "gain", target: osc.gainNode.gain, targetedParam: "value"}
    ];
    synth.addControllable(osc);
    // synth.controllablesParams[osc.name] = osc.controllablesParams;
    // synth.modulesList[nodesList].push(osc);

    console.log(osc, "created");
    return osc;
}

function oscInitConnections(osc) {
    osc.defaultOutput = osc.gainNode;
    osc.output = osc.defaultOutput;
    osc.connect(osc.output);

    osc.gainNode.defaultOutput = osc.synth.generalOutput;
    osc.gainNode.output = osc.gainNode.defaultOutput;
    osc.gainNode.connect(osc.gainNode.output);
   
    osc.start();
}





