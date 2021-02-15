function filterCreateDomPanel1(filter) {
    let divTitle = createDiv("divTitle", filter.name);
    divTitle.textContent = filter.name;
    filter.domPanel.appendChild(divTitle);

    let divOnOff = createDiv("filterDivOnOff", filter.name);
    divOnOff.appendChild(filterCreateBtnOnOff("btnOn2", filter));
    filter.domPanel.appendChild(divOnOff);

    let divFilter = createDiv("filterDivFilter", filter.name);
    divFilter.appendChild(filterCreateSelectType(filter));
    divFilter.appendChild(filterCreateInCutoff(filter));
    filter.domPanel.appendChild(divFilter);
}
/////////////////////////////////////////////////////////
function filterCreateDomPanelModuleFilters(moduleFilter) {
    let divTitle = createDiv("divTitle", moduleFilter.name);
    divTitle.textContent = moduleFilter.name;
    divTitle.appendChild(filterCreateBtnOnOff("btnOn", moduleFilter));

    moduleFilter.domPanel.appendChild(divTitle);

    // let divOnOff = createDiv("filterDivOnOff", moduleFilter.name);
    // divOnOff.appendChild(filterCreateBtnOnOff(moduleFilter));
    // moduleFilter.domPanel.appendChild(divOnOff);

    moduleFilter.filtersList.forEach(filter => {
        let divFilter = createDiv("filterDivFilter", filter.name);
        // divFilter.appendChild(filterCreateBtnOnOff("btnOn2", filter));
        divFilter.appendChild(filterCreateSelectType(filter));
        divFilter.appendChild(filterCreateInCutoff(filter));
        moduleFilter.domPanel.appendChild(divFilter);
    })

}
///////////////////////////////////////////////////////////////////
//BTN ON
function filterCreateBtnOnOff(className, filter) {
    let subDivOnOff = createDiv("subDiv", "filterOnOff");

    let btnOn = createCommutator(className, filter.name);
        
    btnOn.addEventListener("click", (event) => {
        let btn = event.target;
        btn.commutate();
        if(btn.value === "1") {
            filter.plug();
        }
        else if(btn.value === "0") {
            filter.unplug();
        }
    })
    subDivOnOff.appendChild(btnOn);

    return subDivOnOff;
}
///////////////////////////////////////////////////////////////////
//TYPE
function filterCreateSelectType(filter) {
    let subDivType = createDiv("subDiv", filter.name);

    subDivType.appendChild(document.createTextNode("FILTER "));

    let tabOptions =[
        {value: "lowpass", text: "LP"},
        {value: "highpass", text: "HP"},
        {value: "notch", text: "NOTCH"},
        {value: "bandpass", text: "BP"}
    ];

    let selectType = createControlSelect("selectType", "filterSelectType", filter, "type", tabOptions);
    selectType.value = filter.type;
    subDivType.appendChild(selectType);
    
    return subDivType;
}
///////////////////////////////////////////////////////////////////
//CUTOFF
function filterCreateInCutoff(filter) {
    let subDivCutoff = createDiv("subDiv", filter.name);

    subDivCutoff.appendChild(document.createTextNode("CUTOFF "));

    let inNbrCutoff = createControlInput("number", "filterInNbrCutoff", filter.name, filter.frequency, "value");
    subDivCutoff.appendChild(inNbrCutoff);

    return subDivCutoff;
}