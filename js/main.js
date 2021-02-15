////////////////////////////////////////////////////////////////
let root = document.querySelector(".root");
////////////////////////////////////////////////////////////////
//AUDIO CTX
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
///////////////////////////////////////////////////////////////
//SYNTH VIEW
let synthView = createDiv("synthView", "");
root.appendChild(synthView);

let sequensor = createSequensor("sequensor");
sequensor.createSynthLine();

let synth = sequensor.synthLines[0];
// console.log(synth);

console.log(synth.controllersModulesList[0]);
//////////////////////////////////////////////////:
//MATRICE
// let modMatrice = createModulationsMatrice1("matrice", synth);
// synthView.prepend(modMatrice.domPanel);

// console.log(synth.controllersModulesList[0].pointsList);


//////////////////////////////////////////////////
//MATRICE list
// let matrice = [];
// let matricePanel = createDiv("synthPanel", synth.name);

// synth.controllablesParams.forEach(module => {
//     let modulePanel = createDiv("modulePanel", module.name);
//     let title = createDiv("divTitle", module.name);
//     title.textContent = module.name;
//     modulePanel.appendChild(title);
    
//     module.controllablesParams.forEach(param => {
//         let div = createDiv("div", param.text);
//         div.textContent = param.text;
//         modulePanel.appendChild(div);
//     })    
//     matricePanel.appendChild(modulePanel);  
// });

// let btnHide = createButton("btnHide", "matrice", "flex", "hide");
// btnHide.addEventListener("click", (event) => {
//     let btn = event.target;
//     if(btn.value === "flex") {
//         btn.value = "none";
//         btn.textContent = "display controllables";
//     } 
//     else {
//         btn.value = "flex";
//         btn.textContent = "hide";
//     }
//     matricePanel.style.display = btn.value;

// })
// // matricePanel.appendChild(btnHide);

// root.prepend(matricePanel);
// root.prepend(btnHide);



// console.log("list param");
// synth.listControllables();


