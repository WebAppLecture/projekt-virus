export class Data {
    
  //TEST
    deathsGlobalCovid19Data() {
        d3.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv")
        .then(data => this.sort(data)) 
        .then(data => this.clean(data))
        //.catch(function(error) {
          //  console.log("Had an error loading file.");
        //})
    }

    infectedGlobalCovid19Data() {
       d3.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv")
       .then(data => this.sort(data)) 
       .then(data => this.clean(data))
      
       //.catch(function(error) {
         //  console.log("Had an error loading file.");
       //})
   }

    recoveredCoivd19Data() {
        d3.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv") 
        .then(data => this.sort(data)) 
        .then(data => this.clean(data))
        //.catch(function(error) {
          //  console.log("Had an error loading file.");
        //})
    }

    //arrange data alphabetically
    sort(data) { //data is now whole data set (->then!)
        return data.sort(this.compare);
    }

    compare(a, b) { 
        let country1 = a['Country/Region'].toUpperCase(); 
        let country2 = b['Country/Region'].toUpperCase();

        let comparison = 0;
        if (country1 > country2) {
          comparison = 1;
        } else if (country1 < country2) {
          comparison = -1;
        }
        return comparison;
      }

    //some countries are listed multiple times -> aggregate total numbers
    clean(data) {
        for(let i = data.length - 1; i >= 1; i--) {
            let j = i - 1;
            let currentCountry = data[i]['Country/Region']; 
            let nextCountry = data[j]['Country/Region'];
            data[i]["4/15/20"] = parseInt(data[i]["4/15/20"], 10); //todo: how to get last element? So it would update automatically
            data[j]["4/15/20"] = parseInt(data[j]["4/15/20"], 10);

            if (currentCountry.localeCompare(nextCountry) == 0) { 
                data[j]['4/15/20'] += data[i]['4/15/20'];
                data.splice(i, 1);
            }
        }
        console.log(data)
        return data;
    }
}
