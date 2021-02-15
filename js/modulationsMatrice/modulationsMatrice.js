class ModulationsMatrice {
    name;
    synth;
    domPanel;
    controllablesParams = [];
    controllersList = [];
    modulationsList = [];
    modulationsNbr = 3;
    /*
modulationsList = [
    {controller}
]
    */

    constructor(name, synth) {
        this.name = name;
        this.synth = synth;

        this.domPanel = createDiv("modulePanel", this.name);

        // this.controllablesParams = synth.controllablesParams;
       
        synth.controllablesParams.forEach(element => {
            // console.log("e",element.name);
            element.controllablesParams.forEach(e => {
                // console.log(e);
                this.controllablesParams.push({text: element.name + " " + e.text, target: e.target, targetedParam: e.targetedParam});
            })
        });
        this.controllersList = synth.controllersModulesList;

        console.log(this, "created");
    }

    addModulation(index) {
        // console.log(this.modulationsList[index]);
        let mod = this.modulationsList[index];

        mod.controller.targetsList["matrice"+index] = {index: index, target: mod.target, targetedParam: mod.targetedParam};

        console.log(mod.controller.targetsList);
    }

    removeModulation(index) {
        let mod = this.modulationsList[index];
        // console.log(mod.controller.targetsList["matrice"+index]);

        mod.controller.targetsList.splice("matrice"+index, 1);
        console.log(mod.target.controlsList);
    }
}

function createModulationsMatrice1(name, synth) {
    let modMatrice = new ModulationsMatrice(name, synth);

    modMatriceCreateDomPanel1(modMatrice);
    this.modulationsList = new Array(this.modulationsNbr);
    return modMatrice;
}



