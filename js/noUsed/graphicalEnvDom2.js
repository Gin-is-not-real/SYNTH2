function gecCreateDomPanel1(gec) {
    let divs = [
        {div: "divTitle", childs: [
            document.createTextNode(gec.name),
        ]},

        {div: "gecDivMode", subDivs: [
            {subDiv: "toggleMode", childs: [
                document.createTextNode("MODE "),
                gecCreateToggleMode(gec),
            ]},

        ]},

        {div: "gecDivCanvas", subDivs: [
            {subDiv: "inGate", childs: [
                document.createTextNode("GATE "),
                gecCreateInGate(gec),
            ]},
            {subDiv: "inQuantity", childs: [
                document.createTextNode("% "),
                gecCreateInQuantity(gec),
            ]},
            {subDiv: "canvas", childs: [
                gec.canvas,
            ]}
        ]},

        {div: "gecDivEnvTimes", subDivs: [
            {subDiv: "inAttack", childs: [
                document.createTextNode("A "),
                gecCreateInAttack(gec),
            ]},
            {subDiv: "inSustain", childs: [
                document.createTextNode("S "),
                gecCreateInSustain(gec),
            ]},
            {subDiv: "inDecay", childs: [
                document.createTextNode("D "),
                gecCreateInDecay(gec),
            ]},
        ]}
    ];
    generateDivs(gec, divs);

    gec.divList = gec.domPanel.childNodes;
}
///////////////////////////////////////////////////////
//NEW DOM PANEL 
function gecCreateDomPanel1Gec2(gec) {
    let divs = [
        {div: "divTitle", childs: [
            document.createTextNode(gec.name)
        ]},

        {div: "gecDivCanvas", subDivs: [
            {subDiv: "inGate", childs: [
                document.createTextNode("GATE "),
                gecCreateInGate(gec),
            ]},
            {subDiv: "inQuantity", childs: [
                document.createTextNode("% "),
                gecCreateInQuantity(gec),
            ]},
            {subDiv: "canvas", childs: [
                gec.canvas,
            ]}
        ]},

    ];
    generateDivs(gec, divs);

    gec.divList = gec.domPanel.childNodes;
}

///////////////////////////////////////////////////////////
//GATE
function gecCreateInGate(gec) {
    let inNbrGate = createNumericController(gec, "Gate", gec, "gate", "0", "6000", "10");

    inNbrGate.personnalFunction = function() {
        defaultControlOnInput(this);
        gec.updateCanvas();
    }
    // console.log("in gate", inNbrGate);
    return inNbrGate;
}
///////////////////////////////////////////////////////////
//QUANTITY
function gecCreateInQuantity(gec) {
    let inNbrQuantity = createNumericController(gec, "Quantity", gec, "quantity", 0, 200);

    inNbrQuantity.personalFunction = function() {
        defaultControlOnInput(this);
        gec.updateCanvas();
    }

    return inNbrQuantity;
}
///////////////////////////////////////////////////////////
//MODE
function gecCreateToggleMode(gec) {
    let toggleModeValues = [
        {value: "ASD", text: "ASD"},
        {value: "ADS", text: "ADS"}
    ];
    let subDivToggle = createSubDiv("gecToggle");
    let togglesMode = createToggleButton("gecToggleMode", gec.name, gec, "mode", toggleModeValues);
    togglesMode.forEach(btn => {
        subDivToggle.appendChild(btn);
        btn.personalFunction = function() {
            let divToRemoveChilds = document.querySelector(".gecDivEnvTimes");
            // console.log(divToRemoveChilds);
            gecReplaceEnvTimesSubDivs(divToRemoveChilds, gec);
            gec.updateCanvas();
        }
    });

    return subDivToggle;
}

///////////////////////////////////////////////////////////
//TIME CONTROLS
function gecReplaceEnvTimesSubDivs(div, gec) {
    // console.log(div.childNodes);
    let nodes = [];
    let length = div.childNodes.length;

    for(let i = 0; i < length; i++) {
        let child = div.childNodes[0];
        console.log(div.childNodes[0]);

        if(child.id.includes("Attack")) {
            nodes["A"] = child;
        }
        else if(child.id.includes("Sustain")) {
            nodes["S"] = child;
        }
        else if(child.id.includes("Decay")) {
            nodes["D"] = child;
        }
        div.removeChild(child);
    }
    // console.log("nodes", nodes);

    let chars = gec.mode.split('');
    chars.forEach(char => {
        div.appendChild(nodes[char]);
    })
}
///////////////////////////////////////////////////////////
//TIMES
function gecCreateInTime(gec, param) {
    let inTime = createNumericController(gec, param, gec, "attack", 0, 1000, 10);
    inTime.oninput = function() {
        defaultControlOnInput(this);
        gec.updateCanvas();
    }

    return inTime;
}

function gecCreateInAttack(gec) {
    let inNbrAttack = createNumericController(gec, "attack", gec, "attack", 0, 1000, 10);

    inNbrAttack.oninput = function() {
        defaultControlOnInput(this);
        gec.updateCanvas();
    }

    return inNbrAttack;
}

function gecCreateInSustain(gec) {
    let inNbrSustain = createNumericController(gec, "sustain", gec, "sustain", 0, 1000, 10);

    inNbrSustain.oninput = function() {
        defaultControlOnInput(this);
        gec.updateCanvas();
    }

    return inNbrSustain;
}

function gecCreateInDecay(gec) {
    let inNbrDecay = createNumericController(gec, "decay", gec, "decay", 0, 1000, 10);

    inNbrDecay.oninput = function() {
        defaultControlOnInput(this);
        gec.updateCanvas();
    }

    return inNbrDecay;
}
