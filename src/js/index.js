
import { Data } from "/src/data/dataVisualization.js";

let data = new Data();
let deaths = data.deathsGlobalCovid19Data();
    document.querySelector(".deaths").addEventListener("click", () => data.deathsGlobalCovid19Data());
    document.querySelector(".recovered").addEventListener("click", () => data.recoveredCoivd19Data());
    document.querySelector(".infected").addEventListener("click", () => data.infectedGlobalCovid19Data());

//let deaths = data.deathsGlobalCovid19Data();
//let recovered = data.recoveredCoivd19Data();
//let infected = data.infectedGlobalCovid19Data();






