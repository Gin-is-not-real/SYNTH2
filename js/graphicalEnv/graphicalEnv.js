class GraphicalEnvController {
    // synth;
    name; 
    // target;
    // targetedParam;
    
    domPanel;
    canvas;

    mode = "ASD";
    quantity = 100;
    attack = 10;
    sustain = 0;
    decay = 50;
    gate;

    controlsList = [];
    targetsList = [];
    controllablesParams = [];

    triggor = {
        interval: 1,
        attackInterval: 0,
        sustainInterval: 0,
        decayInterval: 0,
        timeCount: 0,
    }

    constructor(name, synth, target, targetedParam, targetedValue) {
        this.name = name;
        this.synth = synth;

        this.targetsList.push({
            target: target, 
            targetedParam: targetedParam, 
            targetedValue: targetedValue,
            targetedInput: undefined
        });

        if(target.controlsList != undefined) {
            this.targetsList[0].targetedInput = target.controlsList[targetedParam][0];
        }

        this.canvas = createCanvas("gecCanvas", this.name, 100, 50);
        this.canvasCtx = this.canvas.getContext("2d");
        
        this.domPanel = createDiv("modulePanel", this.name);

        this.triggor.trig = this.runAttack;

        this.synth.trigList.push(this);
        this.synth.controllersModulesList.push(this);
        
        this.controllablesParams = [
            {text: "attack time", target: this, targetedParam: "attack"},
            {text: "sustain time", target: this, targetedParam: "sustain"},
            {text: "decay time", target: this, targetedParam: "decay"},
            {text: "quantity", target: this, targetedParam: "quantity"},
        ];
        // this.synth.controllablesParams[this.name] = this.controllablesParams;
        this.synth.addControllable(this);
        //# 
        this.drawEnv();

        console.log(this, "created");
    }
/*
- si le gate est infini, la longueur du canvas represente la longueur de l'enveloppe,
- si le gate est un nombre, la longueur du canvas represente le gate time
*/
    drawEnv() {
        let ctx = this.canvasCtx;
        ctx.fillStyle = '#131010';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        let yStep = (this.canvas.height/this.quantity);
        let y = this.canvas.height - (yStep* this.quantity) +5;

    
        // let timeTotal = this.attack + this.sustain + this.decay; 
        let timeTotal = this.attack + this.sustain + this.decay; 
        let lengthTotal;

        if(timeTotal > sequensor.runInterval) {
            lengthTotal = (this.attack + this.sustain + this.decay);
        }
        else {
            lengthTotal = sequensor.runInterval;
        }
        // console.log("lengthTotal", lengthTotal);

        // let xStep = (this.canvas.width/timeTotal);
        let xStep = (this.canvas.width/lengthTotal);

        let diviser = 1;
        let lengthInterval = sequensor.runInterval*xStep;

        while(lengthInterval * diviser < this.canvas.width) {
            ctx.strokeStyle = "grey";
            
            // console.log(lengthInterval, " /", this.canvas.width/diviser);

            ctx.beginPath();
            ctx.moveTo(lengthInterval * diviser, 0);
            ctx.lineTo(lengthInterval * diviser, this.canvas.height);
            ctx.stroke();  

            diviser += 1;         
        }


        let xAttack = (xStep * this.attack);
        let xSustain = xAttack +  (xStep * this.sustain);
        let xDecay = xSustain + (xStep * this.decay);

        ctx.strokeStyle = "yellow";
        ctx.fillStyle = "grey";

        // ctx.beginPath();
        // ctx.arc(xAttack, y, 5, 0, 2*Math.PI);
        // ctx.stroke();
        // ctx.beginPath();
        // ctx.arc(xSustain, y, 5, 0, 2*Math.PI);
        // ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, this.canvas.height);
        ctx.lineTo(xAttack, y);
        ctx.lineTo(xSustain, y);
        // ctx.lineTo(this.canvas.width, this.canvas.height);
        ctx.lineTo(xDecay, this.canvas.height);
        ctx.stroke();

        if(this.gate != undefined) {
            let xGate = this.gate * xStep;
            ctx.strokeStyle = "red";
            ctx.beginPath();
            ctx.moveTo(xGate, 0);
            ctx.lineTo(xGate, this.canvas.height -1);
            ctx.stroke();
        }

    }

    updateCanvas() {
        this.drawEnv();
    }

    trig() {
        console.log(this.name, "trig");
        clearInterval(this.triggor.attackInterval);
        this.runAttack();
    }

    runAttack() {
        console.log("gec run attack");

        this.targetsList.forEach(target => {
            console.log(target);

            let targetedValue = target.targetedInput != undefined ?
                target.targetedInput.value : target.targetedValue;
                
            target.targetedValue = targetedValue;

            target.stepValue = ((this.quantity / 100) * targetedValue) / (this.attack/this.triggor.interval);

            target.stepValue = target.stepValue === Infinity ? 0 : target.stepValue;

            target.target[target.targetedParam] = 0;
        })
        this.triggor.timeCount = 0;
        this.triggor.attackInterval = setInterval(() => {
            // this.target[this.targetedParam] += stepValue;

            this.targetsList.forEach(target => {
                    target.target[target.targetedParam] += target.stepValue;
                    // console.log(target.target[target.targetedParam]);
                })
                
            this.triggor.timeCount += this.triggor.interval;
            // console.log("attack timeCount", this.triggor.timeCount);
    
            if(this.triggor.timeCount > this.attack) {
                clearInterval(this.triggor.attackInterval);
                // console.log("attack interval", this.triggor.attackInterval);

                if(this.mode = "ASD") {
                    this.runSustain();
                }
                else {
                    this.runDecay();
                }
            }
        }, this.triggor.interval);
    
    }

    runSustain() {
        console.log("gec run sustain");
        this.triggor.timeCount = 0;

        this.triggor.sustainInterval = setInterval(() => {

            this.triggor.timeCount += this.triggor.interval;
            // console.log("sustain timeCount", this.triggor.timeCount);

            if(this.triggor.timeCount > this.sustain) {
                clearInterval(this.triggor.sustainInterval);

                if(this.mode === "ASD") {
                  this.runDecay()  
                } 
                else if(this.mode === "ADS") {
                    this.targetsList.forEach(target => {
                        target.target[target.targetedParam] = 0;
                    }); 
                }
            }
        }, this.triggor.interval);
    }

    runDecay() {
        console.log("gec run decay");
        this.triggor.timeCount = 0;

        this.targetsList.forEach(target => {
            target.stepValue = ((this.quantity / 100) * target.targetedValue) / (this.decay/this.triggor.interval);

            target.stepValue = target.stepValue === Infinity ? 0 : target.stepValue;

        })

        this.triggor.decayInterval = setInterval(() => {
            this.targetsList.forEach(target => {
                // console.log(target.target[target.targetedParam]);
                target.target[target.targetedParam] -= target.stepValue;
            })

            this.triggor.timeCount += this.triggor.interval;
    
            if(this.triggor.timeCount > this.decay) {
                clearInterval(this.triggor.decayInterval);

                if(this.mode === "ASD") {
                        // this.target[this.targetedParam] = 0;
                    this.targetsList.forEach(target => {
                        target.target[target.targetedParam] = 0;
                    })
                }
            }
        }, this.triggor.interval);
        // 

    }


}
// ///////////////////////////////////////////////////////////////
// function createGraphicalEnvController(name, synth, target, targetedParam, targetedValue) {
//     let gec = new GraphicalEnvController(name, synth, target, targetedParam, targetedValue);

//     gecCreateDomPanel(gec);

//     synth.domPanel.appendChild(gec.domPanel);
//     // console.log(gec, "created");
//     return gec;
// }

// function createGraphicalEnvController1(name, synth, target, targetedParam, targetedValue) {
//     let gec = new GraphicalEnvController(name, synth, target, targetedParam, targetedValue);

//     gecCreateDomPanel1(gec);
//     synth.domPanel.appendChild(gec.domPanel);
//     // console.log(gec, "created");
//     return gec;
// }