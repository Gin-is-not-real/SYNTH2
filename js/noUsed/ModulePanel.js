class ModulePanel {
    module;  //osc, gainNode... le module cible
    domPanel; //ou module.domPanel -> <div class="modulePanel", id=module.name>
    divList = []; //divList = [div, div, div];

    constructor(module) { //osc, gainNode...
        this.module = module;
    }

    //divList = [{className, moduleName}]

    createDomPanel() { // modulePanel
        let panel = createDiv("modulePanel", this.module.name);
        this.module.domPanel = panel;
    }

    addNewDiv(name) {
        let div = createDiv(name, this.module.name);
        div.addNewSubDiv = function() {
            
        }
        this.module.domPanel.appendChild(div);
    }

    addNewSubDiv(div, contentList) {
        let subDiv = createDiv("subDiv", div.className);
    }
}
/*

*/
let subDivTest = [
    [{dom: "textNode", text: "TEST "}],
    [    
        {
            dom: "input", 
            type: "number", 
            className: "inTest", 
            objName: "objName",
            target: "", 
            targetedParam: "", 
            alternativeFunction: function() {
            }
        }
    ]
];

let controlListTest = [
    {
        dom: "input", 
        type: "number", 
        className: "inTest", 
        target: "", 
        targetedParam: "", 
        alternativeFunction: function() {
        }
    }
]

function createSubDivTest(div, subDiv) {
    let subDiv = createDiv = createDiv("subDiv", div.className);

    subDiv.content.forEach(elt => {
        let node;
        if(elt.dom === "textNode") {
            node = document.createTextNode(elt.text);
        }
        else if(elt.dom === "input") {
            node = createControlInput(elt.type, elt.className, elt.objName, elt.target, elt.targetedParam);
            if(elt.alternativeFunction != undefined) {
                node.alternativeFunction = elt.alternativeFunction();
            }
        }
        subDiv.appendChild(node);
    })

    div.appendChild(subDiv);
}

