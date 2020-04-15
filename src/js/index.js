
    getData();
     function getData() { //for first method: add async before function
        //option1
        /*
        const responseDeathsGlobalsCovid19 = await fetch("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv");
        const deathsGlobalCovid19 = await responseDeathsGlobalsCovid19.text();
        const responseInfectedGlobalsCovid19 = await fetch("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv");
        const infectedGlobalCovid19 = await responseInfectedGlobalsCovid19.text();
        const responseRecoveredCovid19 = await fetch("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv")
        const recoveredCovid19 = await responseRecoveredCovid19.text;
         */

        //option2 to get csv data
        d3.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv", 
        function(deathsGlobalCovid19) {
            console.log(deathsGlobalCovid19)
        });

        d3.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv", 
        function(infectedGlobalCovid19) {
            console.log(infectedGlobalCovid19)
        });

        d3.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv", 
        function(recoveredGlobalCovid19) {
            console.log(recoveredGlobalCovid19)
        });
    }






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

