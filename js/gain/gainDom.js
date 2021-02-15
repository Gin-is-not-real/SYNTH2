function gainCreateDomPanel(gainNode) {
    gainCreateDivGain(gainNode);
    gainNode.controlList.forEach(element => {
        element.value = 1;
    });

    gainNode.divList = gainNode.domPanel.childNodes;
}

//////////////////////////////////////////////////
//DIV
function gainCreateDivGain(gainNode) {
    let divGain = createDiv("gainDivGain", gainNode.name);
    divGain.textContent = "GAIN";

    gainCreateSubDivInNbrGain(divGain, gainNode);
    gainCreateSubDivInRangeGain(divGain, gainNode);

    gainNode.domPanel.appendChild(divGain);
}
//////////////////////////////////////////////////
//SUB DIV
function gainCreateSubDivInNbrGain(div, gainNode) {
    let subDivInNbrGain = createDiv("subDiv", div.className);

    let inNbrGain = createControlInput("number", "inNbrGain", gainNode.name, gainNode.gain, "value");
    subDivInNbrGain.appendChild(inNbrGain);
    gainNode.controlList.push(inNbrGain);

    div.appendChild(subDivInNbrGain);
}

function gainCreateSubDivInRangeGain(div, gainNode) {
    let subDivInRangeGain = createDiv("subDiv", div.className);

    let inRangeGain = createControlInput("range", "inRangeGain", gainNode.name, gainNode.gain, "value");
    div.appendChild(inRangeGain);
    gainNode.controlList.push(inRangeGain);

    div.appendChild(subDivInRangeGain);
}