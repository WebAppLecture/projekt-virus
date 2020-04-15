export class Data {

   //option1 to get csv data
    columDeathsGlobalCovid19Data() {
        d3.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv")
        
       // .then(function renameHeaders(data) {
         //   data[0]['Province/State']
        //})

        //arrange data alphabetically
        .then(function sortData(data) { //data is now whole data set (->then!)
            function compare(a, b) { //todo: outsource method
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
              dataSorted = data.sort(compare);
              //console.log(data)
              //console.log(dataSorted)
              return dataSorted;
        })

        //some countries are listed multiple times -> aggregate total numbers
        .then(function cleaning(data) { 
            
            for(let i = data.length - 1; i >= 1; i--) {
                let j = i - 1;
                let currentCountry = data[i]['Country/Region']; //todo: rename headers because of frontslash
                let nextCountry = data[j]['Country/Region'];
                data[i]['4/14/20'] = parseInt(data[i]['4/14/20'], 10);
                data[i]['4/14/20'] = parseInt(data[j]['4/14/20'], 10);

                if (currentCountry.localeCompare(nextCountry) == 0) { 
                    //console.log(currentCountry);
                    //console.log(data[j]['4/14/20'])
                    data[j]['4/14/20'] += data[i]['4/14/20'];
                    //console.log(nextCountry)
                    //console.log(data[j]['4/14/20'])
                    data.splice(i, 1);
                }
            }
            //console.log(data);
        })
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

    compare(a, b) { //todo: outsource method
        let country1 = a.data['Country/Region'];
        let country2 = b.data['Country/Region'];
        console.log(country1);
        console.log(country2)

        let comparison = 0;
        if (country1 > country2) {
          comparison = 1;
        } else if (country1 < country2) {
          comparison = -1;
        }
        return comparison;
      }
}
