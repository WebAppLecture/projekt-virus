export class Data {

   //option1 to get csv data
    columDeathsGlobalCovid19Data() {
        d3.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv")
        
        //todo: rename headers

        //arrange data alphabetically
        .then(data => this.sort(data))

        //some countries are listed multiple times -> aggregate total numbers
        .then(data => this.clean(data))
        //.catch(function(error) {
          //  console.log("Had an error loading file.");
        //})
    
    }
    

    //todo
    getInfectedGlobalCovid19Data() {
       d3.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv", 
        function(error, infectedGlobalCovid19) {
            if(error) {
                console.log("Had an error loading file.")
            }
            
            //console.log(infectedGlobalCovid19)
        });
    }

    getRecoveredCoivd19Data() {
        d3.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv", 
        function(error, recoveredGlobalCovid19) {
            if(error) {
                console.log("Had an error loading file.") 
            }
            
            //console.log(recoveredGlobalCovid19)
        });
    }

    sort(data) { //data is now whole data set (->then!)
        console.log(data.sort(this.compare));
        return data.sort(this.compare);
    }

    clean(data) {
        for(let i = data.length - 1; i >= 0; i--) {
            let j = i - 1;
            let currentCountry = data[i]['Country/Region']; //todo: rename headers because of frontslash
            let nextCountry = data[j]['Country/Region'];
            data[i]["4/15/20"] = parseInt(data[i]["4/15/20"], 10); //todo: how to get last element? So it would update automatically
            data[j]["4/15/20"] = parseInt(data[j]["4/15/20"], 10);

            if (currentCountry.localeCompare(nextCountry) == 0) { 
                //console.log(currentCountry);
                //console.log(nextCountry)
                //console.log(data[i]['4/14/20'])
                //console.log(data[j]['4/14/20'])
                data[j]['4/15/20'] += data[i]['4/15/20'];
                //console.log(data[j]['4/14/20'])
                data.splice(i, 1);
            }
        }
        console.log(data);
        return data;
    }

    compare(a, b) { //todo: outsource method
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


    
}
