export class Data {
  
    deathsGlobalCovid19Data() {
        d3.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv")
        .then(data => this.sort(data)) 
        .then(data => this.clean(data))
        .then(data => this.visualWorldMap(data))
        //.catch(function(error) {
          //  console.log("Had an error loading file.");
        //})
    }

    infectedGlobalCovid19Data() {
       d3.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv")
       .then(data => this.sort(data)) 
       .then(data => this.clean(data))
      
       .catch(function(error) {
           console.log("Had an error loading file.");
       })
   }

    recoveredCoivd19Data() {
        d3.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv") 
        .then(data => this.sort(data)) 
        .then(data => this.clean(data))
        .catch(function(error) {
            console.log("Had an error loading file.");
        })
    }

    //arrange data alphabetically
    sort(data) { //data is now whole data set (->then!)
        return data.sort(this.compareCountry);
    }

    compareCountry(a, b) { 
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

      compareTotal(a, b) { 
        let country1 = a['4/15/20']; 
        let country2 = b['4/15/20'];

        let comparison = 0;
        if (country1 > country2) {
          comparison = -1;
        } else if (country1 < country2) {
          comparison = 1;
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
        return data;
    }

    visualWorldMap(data) { 
    let title = svg.append('text')
     .attr('class', 'title')
     .attr('y', 24) 
     .html('Total Deaths due to Covid19 - GLOBAL');

     let subTitle = svg.append("text")
     .attr("class", "subTitle")
     .attr("y", 55) 
     .html("Total deaths");
     
    const chart = svg.append('g')
      .attr('transform', `translate(${margin}, ${margin})`);
      
    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, 20000]);

    chart.append('g')
      .call(d3.axisLeft(yScale));

    
    let countriesSortedByTotalNumbers = data.sort(this.compareTotal)
    let contriesHighestNumberDeaths = []
    for(let i = 1; i < 9; i++) {
         contriesHighestNumberDeaths.push(countriesSortedByTotalNumbers[i]['Country/Region'])
    }
    console.log(contriesHighestNumberDeaths)

    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(contriesHighestNumberDeaths) 
      .padding(0.2)

    chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));


    }
}
