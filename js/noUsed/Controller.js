class ModulePanel {
    name;
    sections;
    domPanel;
    controls;

    constructor(name) {
        this.name = name;
        this.sections = [];

        this.controls = [];
        this.domPanel = this.createModuleDomPanel();
    }

    createModuleDomPanel() {
        let domPanel = document.createElement("div");
        domPanel.className = "modulePanel";
        domPanel.textContent = this.name;

        return domPanel;
    }

    addNewDiv(name, domParent) {
        let div = document.createElement("div");
        div.className = name;
        div.textContent = name;

        this.sections.push(div);

        domParent.appendChild(div);
        return div;
    }

    addControl(control, domParent) {
        // this.controls.push(control);
        this.controls[control.name] = control;

        domParent.append(control.dom);
    }
}

///////////////////////////////////////
class Controller2 {
    name;
    class;
    target;
    targetedParam;
    // dom;

    constructor(name, target, targetedParam, obj) {
        this.name = name;
        this.target = target;
        this.targetedParam = targetedParam;

        this.class = "Controller";
        this.dom = this.createDom(obj);
    }

    createDom(obj) {
        let controller = this;

        let subDiv = document.createElement("div");
        subDiv.className = "subDiv";
        subDiv.id = "subDiv_" + controller.name;

        let elt = generate(obj);

        subDiv.appendChild(elt);
        
        return subDiv;
    }

    controlTarget(value) {
        this.target[this.targetedParam] = value;
    }

    describe() {
        for(var i in this) {
            if(this.hasOwnProperty(i)) {
                console.log(i + ": " + this[i]);
            }
        }
    }
}

class Controller {
    constructor(obj) {
        this.createDom(obj);
    }
    createDom(obj) {
        let subDiv = document.createElement("div");
        subDiv.className = "subDiv";

        

    }
}

///////////////////////////////////////
class InputController extends Controller {
    class;

    constructor(type, name, target, targetedParam, obj) {
        super(name, target, targetedParam);

        this.class = "InputController_" + type;
        this.dom = this.createDom(type);
    }

    createDom(type) {
        let controller = this;

        let subDiv = document.createElement("div");
        subDiv.className = "subDiv";
        subDiv.id = "subDiv_" + controller.name;

        let elt = document.createElement("input");
        elt.type = type;
        elt.oninput = function() {
            controller.controlTarget(this.value);
        }
        
        subDiv.appendChild(elt);
        return subDiv;
    }
}

class ButtonController extends Controller {
    class;

    constructor(name, target, targetedParam) {
        super(name, target, targetedParam);

        this.class = "ButtonController";
        this.dom = this.createDom();
    }

    createDom() {
        let controller = this;

        let elt = document.createElement("button");
        elt.onclick = function() {
            console.log("please implement");
        }
    }
}


function generate(obj) {
    let elt = document.createElement(obj.elt);

    for(var i in obj.properties) {
        if(obj.properties.hasOwnProperty(i)) {
            elt[i] = obj.properties[i];
        }
    }

    console.log(elt, "generated");
    return elt;
}
