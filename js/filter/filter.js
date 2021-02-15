//STOCK DEFAULT VALUES
let FILTER_DEFAULT_FREQUENCY_VALUE = {
    "lowpass": 500,
    "highpass": 1000,
    "notch": 500,
    "bandpass": 500
};
//////////////////////////////////////////////////////////////////
//CREATE
function createFilter(name, type, synth, moduleInput) {
    let filter = synth.audioCtx.createBiquadFilter();
    filter.name = name;
    filter.type = type;
    filter.frequency.value = FILTER_DEFAULT_FREQUENCY_VALUE[type];

    filter.synth = synth;
    
    filter.defaultInput = moduleInput;
    filter.input = filter.defaultInput;

    filter.domPanel = createDiv("modulePanel", filter.name);

    filter.controllablesParams = [
        // {text: "type", target: filter, targetedParam: "type"},
        {text: "cutoff", target: filter.frequency, targetedParam: "value"},
    ];
    synth.addControllable(filter);
    // synth.controllablesParams[filter.name] = filter.controllablesParams;
    // synth.modulesList[nodesList].push(filter);

    console.log(filter, "created");
    return filter;
}

////////////////////////////////////////////////////////////////
function createFilter1(name, type, synth, moduleInput) {
    let filter = createFilter(name, type, synth, moduleInput);

    filterCreateDomPanel1(filter);

    return filter;
}
/////////////////////////////////////////////////////////////////
function createFilter2filters(name, synth, moduleInput) {
    let filterModule = new Object();
    filterModule.name = name;
    filterModule.synth = synth;

    filterModule.filtersList = [];
    filterModule.domPanel = createDiv("modulePanel", name);

    let filter1 = createFilter("filter2filters1", "lowpass", synth, moduleInput);
    let filter2 = createFilter("filter2filters2", "highpass", synth, filter1);

    filterModule.filtersList.push(filter1, filter2);
    filterInitConnections2filters(filterModule);

    filterModule.plug = function() {
        let chain = this.synth.connectionsChain.slice();

        this.filtersList.forEach(filter => {
            chain.push(filter);
        })
        this.synth.connectionsChain = chain;
        this.synth.updateConnections();
    }

    filterModule.unplug = function() {
        let chain = this.synth.connectionsChain.slice();
        let index = chain.indexOf(this.filtersList[0]);
        chain.splice(index, 1);

        index = chain.indexOf(this.filtersList[1]);
        chain.splice(index, 1);

        this.synth.connectionsChain = chain;
        this.synth.updateConnections();

    };

    filterCreateDomPanelModuleFilters(filterModule);

    console.log(filterModule, "created");
    return filterModule;
}

function filterInitConnections2filters(filterModule) {
    filterModule.filtersList[0].output = filterModule.filtersList[1];
    filterModule.filtersList[0].connect(filterModule.filtersList[0].output);

    filterModule.filtersList[1].output = filterModule.filtersList[0].input.output;

    filterModule.input = filterModule.filtersList[0].input;
    filterModule.output = filterModule.filtersList[1].output;

    filterModule.filtersList.forEach(element => {
        console.log(element);
    });
}

