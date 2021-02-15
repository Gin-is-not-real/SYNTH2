function oscCreateDomPanel1(osc) {
    let divTitle = createDiv("divTitle", osc.name);
    divTitle.textContent = osc.name;
    osc.domPanel.appendChild(divTitle);

    let divWaves = createDiv("oscDivWave", osc.name);
    divWaves.appendChild(oscCreateToggleWave(osc));
    osc.domPanel.appendChild(divWaves);

    let divFreqAndDetune = createDiv("oscDivFreqAndDetune", osc.name);
    divFreqAndDetune.appendChild(oscCreateInFreq(osc));
    divFreqAndDetune.appendChild(oscCreateInDetune(osc));
    osc.domPanel.appendChild(divFreqAndDetune);

    let divNoteAndOctave = createDiv("oscDivNoteAndOctave", osc.name);
    divNoteAndOctave.appendChild(oscCreateInNote(osc));
    osc.domPanel.appendChild(divNoteAndOctave);

    //#TEST
    // console.log(osc.controllablesParams);
}
//////////////////////////////////////////////////
//WAVE
function oscCreateToggleWave(osc) {
    let subDivBtnsWave = createDiv("subDiv", "oscToggleWave");

    let textWave = document.createTextNode("WAVE ");
    subDivBtnsWave.appendChild(textWave);

    let toggleWaveValues = [
        {value: "sine", text: "sine"},
        {value: "square", text: "sqr"},
        {value: "sawtooth", text: "saw"},
        {value: "triangle", text:"tri"}
    ];
    let togglesWave = createToggleButton("oscToggleWave", osc.name, osc, "type", toggleWaveValues);

    togglesWave.forEach(btn => {
        subDivBtnsWave.appendChild(btn);
        // osc.controllersList.push("type", btn);
    })
    // osc.controllersList["type"] = osc.type.controlsList;
    

    return subDivBtnsWave;
}
//////////////////////////////////////////////////
//FREQ
function oscCreateInFreq(osc) {
    let subDivInFreq = createDiv("subDiv", "oscInFreq");

    let textFreq = document.createTextNode("FREQ ");
    subDivInFreq.appendChild(textFreq);

    let inFreq = createNumericController(osc, "freq", osc.frequency, "value", 60, 5000);
    inFreq.personnalFunction = function() {
        //min freq: 32.75 do 0
        //65.5 do 1
        
    }
    subDivInFreq.appendChild(inFreq);

    // osc.controllersList.push("frequency", inFreq);
    // osc.controllersList["frequency"].push(osc.frequency.controlsList);
    
    return subDivInFreq;
}
//////////////////////////////////////////////////
//DETUNE
function oscCreateInDetune(osc) {
    let subDivInDetune = createDiv("subDiv", "oscInDetune");

    let textDetune = document.createTextNode("DETUNE ");
    subDivInDetune.appendChild(textDetune);

    // let inDetune = createControlInput("number", "inOscDetune", osc.name, osc.detune, "value");
    // inDetune.minValue = 0;
    // inDetune.maxValue = 100;
    let inDetune = createNumericController(osc, "detune", osc.detune, "value", 0, 100);
    
    subDivInDetune.appendChild(inDetune);
    
    // osc.controllersList.push("detune", inDetune);

    return subDivInDetune;
}
//////////////////////////////////////////////////
//NOTE
function oscCreateInNote(osc) {
    let subDivInNote = createDiv("subDiv", "oscInNote");

    let textNote = document.createTextNode("NOTE ");
    subDivInNote.appendChild(textNote);

    let tabNotes = [
        {value: 262, text: "do"},//oct 3
        {value: 294, text: "re"},
        {value: 330, text: "mi"},
        {value: 349, text: "fa"},
        {value: 392, text: "sol"},
        {value: 440, text: "la"},
        {value: 494, text: "si"}
    ];

    let inNote = createControlSelect("number", "oscInNote", osc.frequency, "value", tabNotes);
    // inNote.personnalFunction = function() {

    // }
    inNote.value = 440;
    subDivInNote.appendChild(inNote);
    // osc.controllersList.push("frequency", inNote);

    return subDivInNote;
    
}
