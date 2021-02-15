function createNumericController(module, name, target, targetedParam, min, max) {
    // let subDiv = createSubDiv(module.name + name);

    let control = createControlInput("number", "in" + name, module.name, target, targetedParam);
    control.min = min;
    control.max = max;
    // subDiv.appendChild(control);

    return control;
}


// let FrequencyNumController = {
//     elt: "input",
//     properties: {
//         type: "number",
//         minValue: 20,
//         maxValue: 5000,
//         className: "freqNumController",
//     }
// }

// let AttackNumController = {
//     elt: "input",
//     properties: {
//         type: "number",
//         minValue: 0,
//         maxValue: 1000, 
//         className: "attackNumController",
//     }
// }

// let AttackNumController = {
//     elt: "input",
//     properties: {
//         type: "number",
//         minValue: 0,
//         maxValue: 1000, 
//         className: "attackNumController",
//     }
// }