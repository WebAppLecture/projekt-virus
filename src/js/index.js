
import { Data } from "/src/data/data.js";

let data = new Data();

//let deathsUncleaned = data.getDeathsGlobalCovid19Data();
let deaths = data.columDeathsGlobalCovid19Data();
console.log(deaths);



/*
fetch("src/data/data.json")
    .then(e => e.json())
    .then(json => {
        let title = document.createElement("h2"),
            content = document.createElement("p"),
            image = document.createElement("img");

        title.innerHTML = json.title;
        content.innerHTML = json.content;
        image.setAttribute("src", "./src/images/sql magic.jpg");

        document.body.appendChild(title);
        document.body.appendChild(content);
        document.body.appendChild(image);
    })
    */

