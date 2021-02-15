function modMatriceCreateDomPanel1(modMatrice) {
    let divTitle = createDiv("divTitle", modMatrice.name);
    divTitle.textContent = modMatrice.name;
    modMatrice.domPanel.appendChild(divTitle);

    for(let i = 0; i < modMatrice.modulationsNbr; i ++) {
        let divController = createDiv("modMatriceDivController", modMatrice.name);
        divController.appendChild(modMatriceCreateSelectController(modMatrice, i));
        divController.appendChild(modMatriceCreateSelectTarget(modMatrice, i));
        divController.appendChild(modMatriceCreateBtnOn(modMatrice, i));
        modMatrice.domPanel.appendChild(divController);
    
        // let divBtnOn = createDiv("modMatriceDivOnOff", modMatrice.name);
        // divBtnOn.appendChild(modMatriceCreateBtnOn(modMatrice, i));
        // modMatrice.domPanel.appendChild(divBtnOn);
    }
}

function modMatriceCreateSelectController(modMatrice, num) {
    let subDivController = createSubDiv("modMatriceSelectController");

    let tabOptions = [];
    modMatrice.controllersList.forEach(element => {
        tabOptions.push({value: modMatrice.controllersList.indexOf(element), text: element.name});
    });
    let inController = createSelectElement("modMatriceSelect", modMatrice.name, tabOptions);
    inController.addEventListener("input", (event) => {
        modMatrice.modulationsList[num].controller = modMatrice.controllersList[event.target.value];

        // console.log(modMatrice.modulationsList);
    });


    modMatrice.modulationsList[num] = {controller: modMatrice.controllersList[inController.value]};

    // console.log(modMatrice.modulationsList[num]);
    subDivController.appendChild(inController);

    // console.log(tabOptions);
    return subDivController;
}

function modMatriceCreateSelectTarget(modMatrice, num) {
    let subDivTarget = createSubDiv("modMatriceSelectTarget");

    let tabOptions = [];

    modMatrice.controllablesParams.forEach(element => {
        // console.log(element);
        tabOptions.push({value: modMatrice.controllablesParams.indexOf(element), text: element.text})

    });
    let inTarget = createSelectElement("modMatriceSelect", modMatrice.name, tabOptions);
    inTarget.addEventListener("input", (event) => {
        // console.log(modMatrice.controllablesParams[event.target.value]);
        modMatrice.modulationsList[num].text = modMatrice.controllablesParams[event.target.value].text;
        modMatrice.modulationsList[num].target = modMatrice.controllablesParams[event.target.value].target;
        modMatrice.modulationsList[num].targetedParam = modMatrice.controllablesParams[event.target.value].targetedParam;

        console.log(modMatrice.modulationsList);
    });
    // let inTarget = createControlSelect("modMatriceSelect", modMatrice.name, modMatrice.modulationsList, num, tabOptions);

    modMatrice.modulationsList[num].target = modMatrice.controllablesParams[inTarget.value].target;
    modMatrice.modulationsList[num].targetedParam= modMatrice.controllablesParams[inTarget.value].targetedParam;

    // console.log(modMatrice.modulationsList[num]);

    subDivTarget.appendChild(inTarget);

    // console.log(tabOptions);
    return subDivTarget;
}

function modMatriceCreateBtnOn(modMatrice, num) {
    let subDivOn = createSubDiv("modMatriceSelectTarget");

    // let btnOn = createInput("button", "modMatriceBtnOn", modMatrice.name);
    // btnOn.value = num;
    let btnOn = createCommutator("modMatriceBtnOn", modMatrice.name);
    // btnOn.id = num;
    btnOn.addEventListener("click", (event) => {
        let btn = event.target;
        btn.commutate();
        if(btn.value === "1") {
            modMatrice.addModulation(num);
        }
        else if(btn.value === "0") {
            modMatrice.removeModulation(num);
        }
    })

    subDivOn.appendChild(btnOn);

    return subDivOn;
}