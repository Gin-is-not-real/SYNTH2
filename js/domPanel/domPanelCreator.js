function createDivTitle(module) {
    let divTitle = createDiv("divTitle", module.name);
    divTitle.textContent = module.name;
    return divTitle;
}

/*
let divs = [
    {div: "", childs: []},
    {div: "", subDivs: [
        {subDiv: "", childs: []},
    ]}
]
*/

function generateDivs(module, divs) {
    divs.forEach(d => {
        let div = createDiv(d.div, module.name);

        if(d.subDivs != undefined) {
            d.subDivs.forEach(s => {
                // console.log("d subdivs", s);
                let subDiv = createSubDiv(s.subDiv);
                s.childs.forEach(c => {
                    // console.log("subdiv s add", c);
                    subDiv.appendChild(c);
                })
                div.appendChild(subDiv);
            })
        }
        else if(d.subDivs === undefined) {
            console.log("undef")
            if(d.childs != undefined) {
                d.childs.forEach(c => {
                    // console.log("div d add ", c);
                    div.appendChild(c);
                })  
            }
        }
        module.domPanel.appendChild(div);
    })
}