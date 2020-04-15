export class Data {

   //option1 to get csv data
    getDeathsGlobalCovid19Data() {
        d3.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv", 
        function(error, deathsGlobalCovid19) {
        if(error) {
            console.log("Had an error loading file.")
        }
            console.log(deathsGlobalCovid19);
        });
    }

    getInfectedGlobalCovid19Data() {
       d3.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv", 
        function(infectedGlobalCovid19) {
       console.log(infectedGlobalCovid19)
        });
    }

    getRecoveredCoivd19Data() {
        d3.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv", 
        function(recoveredGlobalCovid19) {
        console.log(recoveredGlobalCovid19)
        });
    }
    

   //option2 to get csv data
   /*
   const responseDeathsGlobalsCovid19 = await fetch("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv");
   const deathsGlobalCovid19 = await responseDeathsGlobalsCovid19.text();
   const responseInfectedGlobalsCovid19 = await fetch("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv");
   const infectedGlobalCovid19 = await responseInfectedGlobalsCovid19.text();
   const responseRecoveredCovid19 = await fetch("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv")
   const recoveredCovid19 = await responseRecoveredCovid19.text;
    */
}
