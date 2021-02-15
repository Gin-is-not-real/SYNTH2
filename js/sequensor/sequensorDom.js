function seqCreateDomPanel1(seq) {
    let divSequensor = createDiv("seqDivSequensor", seq.name);
    divSequensor.appendChild(seqCreateBtnPlay(seq));
    divSequensor.appendChild(seqCreateInRunInterval(seq));
    seq.domPanel.appendChild(divSequensor);

    let divNewSynth = createDiv("seqDivNewSynth", seq.name);
    divNewSynth.appendChild(seqCreateBtnNewSynth(seq));
    seq.domPanel.appendChild(divNewSynth);

    seq.divList = seq.domPanel.childNodes;
}
///////////////////////////////////////////////////////
//PLAY
function seqCreateBtnPlay(seq) {
    let subDivPlay = createDiv("subDiv", "seqBtnPlay");

    btnPlay = createInput("button", "btnPlay", seq.name);
    btnPlay.value = "play";
    btnPlay.addEventListener("click", (event) => {
        seq.playSequensor(event.target);
    })
    subDivPlay.appendChild(btnPlay);

    return subDivPlay;
}
///////////////////////////////////////////////////////
//IN RUN INTERVAL
function seqCreateInRunInterval(seq) {
    let subDivRunInterval = createDiv("subDiv", "seqInRunInterval");

    let textInRunInterval = document.createTextNode("run interval");
    subDivRunInterval.appendChild(textInRunInterval);

    let inRunInterval = createNumericController(seq, "runInterval", seq, "runInterval", 0, 1000, 10);
    subDivRunInterval.appendChild(inRunInterval);

    subDivRunInterval.appendChild(document.createTextNode(" ms"));

    return subDivRunInterval;
}
//////////////////////////////////////////////////////////////////////////////
//BTN SYNTH
function seqCreateBtnSynth(seq, synthLine) {
    let subDivSynth = createDiv("subDiv", "seqBtnSynth");

    let btnSynth = createButton("btnSynth", seq.name, synthLine.name, synthLine.name);
    btnSynth.onclick = function() {
        synthLine.displayOnSynthView();
    }
    
    subDivSynth.appendChild(btnSynth);

    return subDivSynth;
}
//////////////////////////////////////////////////////////////////////////////
//BTNS STEPS
function seqCreateBtnsSteps(seq, synthLine) {
    let subDivSteps = createDiv("subDiv", "seqBtnsSteps");
    synthLine.steps = [];

    for(let s = 0; s < seq.nbrSteps; s++) {
        let step = createControlButton("step", s, 0, "-", seq.steps, s);
        step.id = s;

        if(s % 4 == 0) {
            step.defaultBgColor = "#37393a";
        }
        else {
            step.defaultBgColor = "#181a1b"
        }
        step.style.backgroundColor = step.defaultBgColor;
        
        step.personalFunction = function() {
            if(this.value == "0") {
                this.value = "1";
            }
            else {
                this.value = "0";
            }
            // seq.steps[this.id] = this.value;
            synthLine.steps[this.id] = this.value;
        }

        step.updateStyle = function() {
            this.style.backgroundColor = this.value == "1" ?
                "green" :
                this.defaultBgColor;
        }

        subDivSteps.appendChild(step);
        // seq.steps.push("0");
        synthLine.steps.push("0");
        // console.log(step);
    }

    return subDivSteps;
}
//////////////////////////////////////////////////////////////////////////////
//BTN NEW SYNTH
function seqCreateBtnNewSynth(seq) {
    let subDivNewSynth = createDiv("subDiv", "seqBtnNewSynth");

    let btnNewSynth = createInput("button", "btnNewSynth", seq.name);
    btnNewSynth.value = "add new synth";
    btnNewSynth.addEventListener("click", (event) => {
        // console.log("function btnNewSynth");
        seq.createSynthLine();
    })

    subDivNewSynth.appendChild(btnNewSynth);

    return subDivNewSynth;
}
//////////////////////////////////////////////////////////////////////////////
//BTNS STEPS
function seqCreateSteps(seq, synthLine) {
    let divSteps = createDiv("seqDivSteps",synthLine.name); 
    divSteps.appendChild(seqCreateBtnSynth(seq, synthLine));
    divSteps.appendChild(seqCreateBtnsSteps(seq, synthLine));
    seq.domPanel.insertBefore(divSteps, seq.domPanel.lastChild);
}


