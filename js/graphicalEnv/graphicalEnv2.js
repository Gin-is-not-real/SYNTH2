class GraphicalEnvController2 {
    synth;
    name; 
    
    domPanel;
    canvas;

    quantity = 100;
    gate = 200;

    timesList = [];
    valuesList = [];
    pointsList = [] //{time, quantity}

    controlsList = [];
    targetsList = [];
    controllablesParams = [];

    triggor = {
        interval: 1,
        timeCount: 0,
        intervalsList: []
    }

    constructor(name, synth, target, targetedParam) {
        this.name = name;
        this.synth = synth;

        this.targetsList.push({
            target: target, 
            targetedParam: targetedParam, 
        });

        this.canvas = createCanvas("gecCanvas", this.name, 100, 50);
        this.canvasCtx = this.canvas.getContext("2d");

        this.domPanel = createDiv("modulePanel", this.name);

        this.triggor.trig = this.runEnv;

        this.synth.trigList.push(this);
        this.synth.controllersModulesList.push(this);
        
        this.controllablesParams = [
            {text: "quantity", target: this, targetedParam: "quantity"},
            {text: "gate", target: this, targetedParam: "gate"},
        ];
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

        this.canvasCalculValues();

        //dessine les marqueurs de steps en gris
        let diviser = 1;

        while(this.canvas.lengthInterval * diviser < this.canvas.width) {
            ctx.strokeStyle = "grey";
            ctx.beginPath();
            ctx.moveTo(this.canvas.lengthInterval * diviser, 0);
            ctx.lineTo(this.canvas.lengthInterval * diviser, this.canvas.height);
            ctx.stroke();  

            diviser += 1;         
        }

        this.reorderLists();
        this.pointsList = [];
        // console.log("draw", this.timesList, this.valuesList);
        for(let i = 0; i < this.timesList.length; i ++) {
            let point = this.convertTimesAndValuesToPoint(i);
            // console.log("convert ", point);
            this.pointsList.push(point);

            // console.log(" - ", this.pointsList[i]);
        }
        this.drawPoints();
    }

    convertPointToTimesAndValues(pnt) {
        // console.log("to convert", pnt);
        let time = pnt.x / this.canvas.xStep;

        let value = (this.canvas.height / this.canvas.yStep) - (pnt.y / this.canvas.yStep);
        // console.log("as convert to ", time, value);

        return {time: time, value: value};
    }
    convertTimesAndValuesToPoint(index) {
        // console.log("to convert", this.timesList[index], this.valuesList[index]);

        return {
            x: this.timesList[index] * this.canvas.xStep, 
            y: this.canvas.height - (this.valuesList[index] * this.canvas.yStep)
        };
    }

    reorderLists() {
        let timesList = this.timesList.slice();
        let valuesList = this.valuesList.slice();
        let newTimesList = [];
        let newValuesList = [];
        let newPointsList = [];

        while(newTimesList.length < this.timesList.length) {
            // console.log("reorderLists");
            let minValue = this.canvas.lengthTotal;
            let index;

            timesList.forEach(time => {
                // console.log("time", time, minValue);
                if(time < minValue) {
                    minValue = time;
                    // console.log("min", minValue);
                    index = timesList.indexOf(time);
                    // console.log(index);
                }
            })
            newTimesList.push(timesList[index]);
            newValuesList.push(valuesList[index]);
            newPointsList.push({
                x: timesList[index] * this.canvas.xStep, 
                y: valuesList[index] * this.canvas.yStep
            });

            timesList.splice(index, 1);
            valuesList.splice(index, 1);            
        }
        this.timesList = newTimesList;
        this.valuesList = newValuesList;
        this.pointsList = newPointsList;

        // console.log("reorderer", newTimesList, newValuesList, newPointsList);
    }

    drawPoints() {
        let ctx = this.canvasCtx;
        ctx.strokeStyle = "yellow";
        ctx.fillStyle = "grey";

        this.pointsList.forEach(pnt => {
            // this.drawPoint(pnt.x, pnt.y);
            ctx.beginPath();
            ctx.arc(pnt.x, pnt.y, 2, 0, 2*Math.PI);
            ctx.stroke();
        });

        ctx.beginPath();
        ctx.moveTo(0, this.canvas.height);

        this.pointsList.forEach(pnt => {
            ctx.lineTo(pnt.x, pnt.y, 2, 0, 2*Math.PI);
        });
        ctx.lineTo(this.canvas.width, this.canvas.height);
        ctx.stroke();
    }

    canvasCalculValues() {
        this.canvas.yStep = (this.canvas.height/this.quantity);
        this.canvas.yBase = this.canvas.height - (this.canvas.yStep* this.quantity) +5;

        this.canvas.lengthTotal = this.gate;

        // if(this.gate > sequensor.runInterval) {
        //     this.canvas.lengthTotal = this.gate;
        // }
        // else {
        //     this.canvas.lengthTotal = sequensor.runInterval;
        // }
        // console.log("lengthTotal", this.canvas.lengthTotal);

        this.canvas.xStep = (this.canvas.width/this.canvas.lengthTotal);
        // this.canvas.xStep = (this.canvas.width/this.gate);
        this.canvas.lengthInterval = sequensor.runInterval*this.canvas.xStep;
    }
    updateCanvas() {
        this.canvasCalculValues();
        this.drawEnv();
        // console.log("update canvas");
    }

    trig() {
        console.log(this.name, "trig");
        // clearInterval(this.triggor.attackInterval);
        // this.runTimes();
        this.pointsList.forEach(pnt => {
            console.log("trig", pnt, this.convertPointToTimesAndValues(pnt));
            this.runEnv();
        })
    }

    runEnv() {
        console.log("gec2 run env");

        this.targetsList.forEach(target => {
            console.log("target", target);
            target.intervalsList = [];
            target.interval = 0;
            target.valueBase = target.target[target.targetedParam];
            let v = target.valueBase; 
        
            let cumuledTimes = 0;
            this.timesList.forEach(t => {cumuledTimes += t});
            
            this.runSlop(target, target.target[target.targetedParam], this.valuesList[0], this.timesList[0], 0);
            console.log(this.canvasCtx.getImageData(0, 0, this.canvas.width, this.canvas.height));
        }) 
    }

    runSlop(target, v, iValue, iTime, i) {
        console.log(target, v, iValue, iTime, i);
        console.log("run slop", v, "to");

        let sign;
        if(v < target.valueBase + iValue) {
            v += iValue;
            sign = true;
        }
        else if(v > target.valueBase + iValue) {
            v -= iValue;
            sign = false;
        }
        console.log(v, "(", iValue,")");
        
        target.stepValue = iValue / ((iTime) /this.triggor.interval);
        console.log(v, "in", iTime, "steps of", target.stepValue);

        // this.triggor.timeCount = 0;

        let interval;
        if(i != undefined) {
            target.intervalsList[i] = 0;
            interval = target.intervalsList[i];
        }
        else {
            target.intervalsList["final"] = 0;
            interval = target.intervalsList["final"];
        }

        interval = setInterval(() => {
        // this.triggor.intervalsList[i] = setInterval(() => {
            if(sign) {
                target.target[target.targetedParam] += target.stepValue;
            }
            else if(!sign) {
                target.target[target.targetedParam] -= target.stepValue;
            }
            // console.log(target.target[target.targetedParam]);
            this.triggor.timeCount += this.triggor.interval;
        console.log(this.triggor.timeCount);

            if(this.triggor.timeCount > iTime) {
                console.log("end slop", target.target[target.targetedParam]);

                // clearInterval(this.triggor.intervalsList[i]);
                clearInterval(interval);
                if(i != undefined) {
                    let ii = i + 1;
                    if(this.timesList[ii] != undefined) {
                        console.log("NEXT", this.timesList[ii]);

                        this.runSlop(target, target.target[target.targetedParam], this.valuesList[ii], this.timesList[ii], ii);
                    }
                    else {
                        let cumuledTimes = 0;
                        this.timesList.forEach(t => {cumuledTimes += t});
                        let endTime = this.gate - cumuledTimes;
                        console.log("endTime", endTime);

                        this.runSlop(target, target.target[target.targetedParam], target.target[target.targetedParam] - target.valueBase, endTime);
                        console.log("end", target.target[target.targetedParam]);
                    }
                }
                else {
                    target.target[target.targetedParam] = target.valueBase;
                };
                // console.log("interval", interval);
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
// function createGraphicalEnvController2(name, synth, target, targetedParam) {
//     let gec = new GraphicalEnvController2(name, synth, target, targetedParam);

//     gecCreateDomPanel2(gec);
//     synth.domPanel.appendChild(gec.domPanel);

//     // console.log(gec, "created");
//     return gec;
// }