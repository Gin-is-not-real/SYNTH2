class Sequensor {
    name;
    domPanel;

    nbrSteps = 16;
    steps = [];
    interval = 0;
    runInterval = 500;

    synthLines = [];

    // trigList = [];

    constructor(name) {
        this.name = name;

        this.domPanel = createDiv("sequensorPanel", this.name);
        
    }

    playSequensor(btn) {
        console.log(btn.value);
        if(btn.value === "play") {
            this.run();
            btn.value = "stop";
        }
        else {
            clearInterval(this.interval);
            btn.value = "play";
        }
    }

    run() {
        let actualStep = 0;

        this.interval = setInterval(() => {
            // console.log(actualStep, "run interval", this.runInterval);

            // console.log(this.divList[1].childNodes[0].childNodes);
            this.divList[1].childNodes[0].childNodes.forEach(node => {
                node.style.border = node.id == actualStep ? "1px solid yellow" : "1px solid grey";
            })

            this.synthLines.forEach(synth => {
                console.log(synth.steps[actualStep]);
                if(synth.trigList != undefined) {
                    if(synth.steps[actualStep] === "1") {
                        synth.trigList.forEach(triggor => {
                            triggor.trig();
                        })
                    }
                }
            })

            actualStep ++;
    
            if(actualStep === 16) {
                actualStep = 0;
            }           
        }, this.runInterval);
    }

    createSynthLine() {
        let synthLine = createDefaultSynthLine("defaultSynth" + this.synthLines.length);
        seqCreateSteps(this, synthLine);
        this.synthLines.push(synthLine);
        console.log(synthLine);
    }
}

function createSequensor(name) {
    let sequensor = new Sequensor(name);

    root.appendChild(sequensor.domPanel);

    seqCreateDomPanel1(sequensor);

    console.log(sequensor, "created");
    return sequensor;
}

//////////////////////////////////////////////
