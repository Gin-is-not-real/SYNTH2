////////////////////////////////////////////
function loadScript(src) {
    return new Promise(function(resolve, reject) {
        let script = document.createElement("script");
        script.src = src;

        document.head.append(script);
        // console.log("-----> script " + src + " chargé");

        script.onload = () => resolve("script " + src + " chargé");
        script.onerror = () => reject(new Error("Echec du chargement du script " + src))
    });
}

loadScript("js/domFunctions.js")
.then(r => loadScript("js/domPanel/domPanelCreator.js", r))
.then(result => loadScript("js/SynthLine.js", result))
.then(result2 => loadScript("js/oscillator/oscillator.js", result2))
.then(result3 => loadScript("js/oscillator/oscillatorDom.js", result3))
.then(result4 => loadScript("js/gain/gainDom.js", result4))
.then(result5 => loadScript("js/graphicalEnv/graphicalEnv.js", result5))
.then(result51 => loadScript("js/graphicalEnv/graphicalEnv2.js", result51))
.then(result6 => loadScript("js/graphicalEnv/graphicalEnvDom.js", result6))
.then(result61 => loadScript("js/graphicalEnv/graphicalEnvComponents.js", result61))
// .then(result61 => loadScript("js/graphicalEnv/graphicalEnvDom2.js", result61))
.then(result7 => loadScript("js/sequensor/sequensor.js", result7))
.then(result8 => loadScript("js/sequensor/sequensorDom.js", result8))
.then(result9 => loadScript("js/filter/filter.js", result9))
.then(result11 => loadScript("js/filter/filterDom.js", result11))
.then(result10 => loadScript("js/spectrum/spectrum.js", result10))
.then(result11 => loadScript("js/modulationsMatrice/modulationsMatrice.js", result11))
.then(result12 => loadScript("js/modulationsMatrice/modulationsMatriceDom.js", result12))
.then(resultFinal => loadScript("js/main.js", resultFinal))
.catch(alert);