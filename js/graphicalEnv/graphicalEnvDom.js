///////////////////////////////////////////////////////////////
function createGraphicalEnvController1(name, synth, target, targetedParam, targetedValue) {
    let gec = new GraphicalEnvController(name, synth, target, targetedParam, targetedValue);
    gecCreateDomPanel1(gec);

    // console.log(gec, "created");
    return gec;
}

///////////////////////////////////////////////////////////////
function createGraphicalEnvController2(name, synth, target, targetedParam) {
    let gec = new GraphicalEnvController2(name, synth, target, targetedParam);
    gec.timesList.push(30);
    gec.valuesList.push(50);
    // gec.pointsList.push({x: 100, y: 50});
    gec.gate = 200;
    gec.drawEnv();
            //TEST
        gec.canvas.isMoving = undefined;
        gec.canvas.isSelected = undefined;

        gec.canvas.findPoint = function(x, y) {
            // console.log("find ?", x, y);
            let index;
            gec.pointsList.forEach(pnt => {
                if((x > pnt.x - 5 && x < pnt.x + 5) && (y > pnt.y - 5 && y < pnt.y + 5)) {
                    index = gec.pointsList.indexOf(pnt);

                    console.log("find !", index, pnt.x, pnt.y);

                    // let inGate = gec.valuesList[0].controlsList["gate"];
                    // let inValue = gec.timesList[0].controlsList["quantity"];
                    // console.log(gec.valuesList[0], gec.timesList[0]);
                }
            });
            return index;
        }

        // gec.canvas.addEventListener("click", (event) => {
        //     let c = event.target;
        //     console.log(event.offsetX, event.offsetY);

        //     gec.updateCanvas();
        // });

        gec.canvas.addEventListener("mousedown", (event) => {
            event.target.isMoving = gec.canvas.findPoint(event.offsetX, event.offsetY);
        });

        gec.canvas.addEventListener("mousemove", (event) => {
            let c = event.target;

            if(c.isMoving != undefined) {
                gec.timesList[c.isMoving] = (event.offsetX / c.xStep);
                gec.valuesList[c.isMoving] = ((c.height / c.yStep) -(event.offsetY / c.yStep));

                gec.updateCanvas();
            }
        })
        //#CLIC DROIT
        gec.canvas.addEventListener("mouseup", (event) => {
            let c = event.target;
            c.isMoving = undefined;
            let pntIndex = c.findPoint(event.offsetX, event.offsetY);

            if(c.isMoving === undefined && pntIndex != undefined && event.button === 2) {
                console.log("click droit");
                gec.timesList.splice(pntIndex, 1);
                gec.valuesList.splice(pntIndex, 1);
            }
            //                    
            else if(pntIndex != undefined && event.button != 2) {
                console.log("isSelected", pntIndex);
                gec.canvas.isSelected = pntIndex;
                gec.canvas.updateInputs();
            }
            else if(pntIndex === undefined && event.button != 2) {
                //#
                let converted = gec.convertPointToTimesAndValues({x: event.offsetX, y: event.offsetY});
                console.log("isSelected", pntIndex);
                gec.timesList.push(converted.time);
                gec.valuesList.push(converted.value);
                // gec.timesList.push(event.offsetX / c.xStep);
                // gec.valuesList.push((c.height / c.yStep) -(event.offsetY / c.yStep));

                gec.canvas.isSelected = pntIndex;
                gec.canvas.updateInputs();
            }
            window.addEventListener("contextmenu", function(e) {
                e.preventDefault();
            })
            gec.updateCanvas();
        });
        gec.canvas.updateInputs = function() {
            console.log("up in", this);
            this.inputX.index = this.isSelected;
            this.inputX.value = gec.timesList[this.isSelected];

            this.inputY.index = this.isSelected;
            this.inputY.value = gec.valuesList[this.isSelected];
        }

    gecCreateDomPanel2(gec);

    // console.log(gec, "created");
    return gec;
}
///////////////////////////////////////////////////////////////////
//DOM
function gecCreateDomPanel1(gec) {
    gec.domPanel.appendChild(createDivTitle(gec));
    // gec.domPanel.appendChild(gecCreateDivCanvas(gec));
    let divCanvas = createDiv("gecDivCanvas", gec.name);
    divCanvas.appendChild(gecCreateInQuantity(gec));
    divCanvas.appendChild(gecCreateCanvas(gec));
    gec.domPanel.appendChild(divCanvas);

    // gec.domPanel.appendChild(gecCreateDivEnvTimes(gec));
    let divEnvTimes = createDiv("gecDivEnvTimes", gec.name);
    divEnvTimes.appendChild(gecCreateInAttack(gec));
    divEnvTimes.appendChild(gecCreateInSustain(gec));
    divEnvTimes.appendChild(gecCreateInDecay(gec));
    gec.domPanel.appendChild(divEnvTimes);
    
    gec.divList = gec.domPanel.childNodes;
}

function gecCreateDomPanel2(gec) {
    gec.domPanel.appendChild(createDivTitle(gec));
    // gec.domPanel.appendChild(gecCreateDivCanvas(gec));
    let divCanvas = createDiv("gecDivCanvas", gec.name);
    divCanvas.appendChild(gecCreateInGate(gec));
    divCanvas.appendChild(gecCreateInQuantity(gec));
    divCanvas.childNodes[1].childNodes[0].textContent = "VALUE ";

    divCanvas.appendChild(gecCreateCanvas(gec));
    gec.domPanel.appendChild(divCanvas);

    // gec.domPanel.appendChild(gecCreateDivEnvTime(gec));
    let divEnvTime = createDiv("gecDivEnvTimes", gec.name);
    divEnvTime.appendChild(gecCreateInTime(gec, 0));
    divEnvTime.appendChild(gecCreateInTimeQuantity(gec, 0));
        //
        divEnvTime.childNodes[1].childNodes[0].textContent = "VALUE ";

    gec.domPanel.appendChild(divEnvTime);
   
    gec.divList = gec.domPanel.childNodes;
}
///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
//DIVS

