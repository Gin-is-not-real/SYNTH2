/////////////////////////////////////////////////////////
//TIME
function gecCreateInTime(gec, index) {
    let subDiv = createSubDiv("gecInTime_"+index);

    subDiv.appendChild(document.createTextNode("TIME "));

    // let inTime = createNumericController(gec, "InTime_"+ index, gec.timesList, index, "0", "1000", "10");
    // let inTime = createNumericController(gec, "InTime_"+ index, gec.timesList[index], "time", "0", "1000", "10");
    // let inTime = createNumericController(gec, "InTime_"+ index, gec.timesList, index, "0", "200", "10");
    let inTime = createInput("number", "inTime", gec.name);
    inTime.min = 0;
    inTime.max = gec.gate;
    inTime.index = index;
    inTime.value = gec.timesList[index];
    gec.canvas.inputX = inTime;
    // console.log("in", inTime.targetsList[index]);

    inTime.addEventListener("input", (event) => {
        let input = event.target;
        // defaultControlOnInput(input);
        gec.timesList[input.index] = input.value;

        console.log(gec.timesList[input.index]);
        gec.updateCanvas();
    })

    subDiv.appendChild(inTime);

    return subDiv;
}
/////////////////////////////////////////////////////////
//TIME QUANTITY
function gecCreateInTimeQuantity(gec, index) {
    console.log(index, gec.pointsList[index]);
    let subDiv = createSubDiv("gecInValue_"+index);

    subDiv.appendChild(document.createTextNode("% "));

    // let inTimeQuantity = createNumericController(gec, "InQuantity_"+ index, gec.valuesList, index, "0", "200", "10");
    // console.log(inTimeQuantity);

    // inTimeQuantity.personalFunction = function() {
    //         console.log(inTimeQuantity.targetsList[index]);
    //         defaultControlOnInput(this);
    //         gec.updateCanvas();
    // }

    let inTimeQuantity = createInput("number", "inTime", gec.name);
    inTimeQuantity.min = 0;
    inTimeQuantity.max = gec.quantity;
    inTimeQuantity.index = index;
    inTimeQuantity.value = gec.valuesList[index];
    gec.canvas.inputY = inTimeQuantity;
    // console.log("in", inTime.targetsList[index]);

    inTimeQuantity.addEventListener("input", (event) => {
        let input = event.target;
        gec.valuesList[input.index] = input.value;

        console.log(gec.valuesList[input.index]);
        gec.updateCanvas();
    })

    subDiv.appendChild(inTimeQuantity);

    return subDiv;
}

///////////////////////////////////////////////////////////
//GATE
function gecCreateInGate(gec) {
    let subDivGate = createSubDiv("gecInGate");

    let textGate = document.createTextNode("GATE ");
    subDivGate.appendChild(textGate);

    let inNbrGate = createNumericController(gec, "Gate", gec, "gate", "0", "6000", "10");

    inNbrGate.personalFunction = function() {
        defaultControlOnInput(this);
        gec.updateCanvas();
    }
    subDivGate.appendChild(inNbrGate);

    return subDivGate;
}

///////////////////////////////////////////////////////////
//QUANTITY
function gecCreateInQuantity(gec) {
    let subDivInQuantity = createDiv("subDiv", "gecInQuantity");

    let textQuantity = document.createTextNode("% ");
    subDivInQuantity.appendChild(textQuantity);

    let inNbrQuantity = createNumericController(gec, "Quantity", gec, "quantity", 0, 200);

    inNbrQuantity.personalFunction = function() {
        defaultControlOnInput(this);
        gec.updateCanvas();
    }

    subDivInQuantity.appendChild(inNbrQuantity);

    return subDivInQuantity;
}
///////////////////////////////////////////////////////////
//CANVAS
function gecCreateCanvas(gec) {
    let subDivCanvas = createDiv("subDiv", "gecCanvas");
    subDivCanvas.appendChild(gec.canvas);

    return subDivCanvas;
}
///////////////////////////////////////////////////////////
//MODE
function gecCreateToggleMode(gec) {
    let subDivMode = createDiv("subDiv", "gecToggleMode");

    let textMode = document.createTextNode("MODE ");
    subDivMode.appendChild(textMode);

    let toggleModeValues = [
        {value: "ASD", text: "ASD"},
        {value: "ADS", text: "ADS"}
    ];
    let togglesMode = createToggleButton("gecToggleMode", gec.name, gec, "mode", toggleModeValues);
    togglesMode.forEach(btn => {
        subDivMode.appendChild(btn);
        btn.personalFunction = function() {
            let divToRemoveChilds = document.querySelector(".gecDivEnvTimes");
            gecReplaceEnvTimesSubDivs(divToRemoveChilds, gec);
            gec.updateCanvas();
        }
    });

    return subDivMode;
}

///////////////////////////////////////////////////////////
//REPLACE TIMES DIVS
function gecReplaceEnvTimesSubDivs(div, gec) {
    let nodes = [];
    let length = div.childNodes.length;

    for(let i = 0; i < length; i++) {
        let child = div.childNodes[0];

        if(child.id.includes("attack")) {
            nodes["A"] = child;
        }
        else if(child.id.includes("sustain")) {
            nodes["S"] = child;
        }
        else if(child.id.includes("decay")) {
            nodes["D"] = child;
        }
        div.removeChild(child);
    }

    let chars = gec.mode.split('');
    chars.forEach(char => {
        div.appendChild(nodes[char]);
    })
}
///////////////////////////////////////////////////////////
//ATTACK
function gecCreateInAttack(gec) {
    let subDivInAttack = createDiv("subDiv", "attackTime");

    let textAttack = document.createTextNode("A ");
    subDivInAttack.appendChild(textAttack);

    let inNbrAttack = createNumericController(gec, "attack", gec, "attack", 0, 1000, 10);

    inNbrAttack.oninput = function() {
        defaultControlOnInput(this);
        gec.updateCanvas();
    }
    subDivInAttack.appendChild(inNbrAttack);

    return subDivInAttack;
}
///////////////////////////////////////////
//SUSTAIN
function gecCreateInSustain(gec) {
    let subDivInSustain = createDiv("subDiv", "sustainTime");

    let textSustain = document.createTextNode("S ");
    subDivInSustain.appendChild(textSustain);

    let inNbrSustain = createNumericController(gec, "sustain", gec, "sustain", 0, 1000, 10);

    inNbrSustain.oninput = function() {
        defaultControlOnInput(this);
        gec.updateCanvas();
    }
    subDivInSustain.appendChild(inNbrSustain);

    return subDivInSustain;
}
///////////////////////////////////////////
//DECAY
function gecCreateInDecay(gec) {
    let subDivInDecay = createDiv("subDiv", "decayTime");

    let textDecay = document.createTextNode("D ");
    subDivInDecay.appendChild(textDecay);

    let inNbrDecay = createNumericController(gec, "decay", gec, "decay", 0, 1000, 10);

    inNbrDecay.oninput = function() {
        defaultControlOnInput(this);
        gec.updateCanvas();
    }
    subDivInDecay.appendChild(inNbrDecay);

    return subDivInDecay;
}
