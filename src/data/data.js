export class Data {
  
    deathsGlobalCovid19Data() {
        d3.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv")
        .then(data => this.sortDatabyCountryNames(data)) 
        .then(data => this.clean(data))
        .then(data => this.visualCountriesWithMaxNumberOfDeaths(data))
        //.catch(function(error) {
          //  console.log("Had an error loading file.");
        //})
    }

    infectedGlobalCovid19Data() {
       d3.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv")
       .then(data => this.sortDatabyCountryNames(data)) 
       .then(data => this.clean(data))
       .catch(function(error) {
           console.log("Had an error loading file.");
       })
   }

    recoveredCoivd19Data() {
        d3.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv") 
        .then(data => this.sortDatabyCountryNames(data)) 
        .then(data => this.clean(data))
        .catch(function(error) {
            console.log("Had an error loading file.");
        })
    }




    //arrange data alphabetically
    sortDatabyCountryNames(data) { //data is now whole data set (->then!)
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

      tenCountriesTotalNumberMaxDeath(data){
        let countriesSortedByTotalNumbers = data.sort(this.compareTotal)
        let contriesHighestNumberDeaths = []
        for(let i = 0; i < 10; i++) {
             contriesHighestNumberDeaths.push(countriesSortedByTotalNumbers[i]['4/15/20'])
        }
        return contriesHighestNumberDeaths;
      }
  
      tenCountriesMaxDeath(data) {
        let countriesSortedByTotalNumbers = data.sort(this.compareTotal)
        let contriesHighestNumberDeaths = []
        for(let i = 0; i < 10; i++) {
             contriesHighestNumberDeaths.push(countriesSortedByTotalNumbers[i]['Country/Region'])
        }
        return contriesHighestNumberDeaths;
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




    visualCountriesWithMaxNumberOfDeaths(data) { 
      const margin = 60;
      const width = 1000 - 2 * margin; //width of svg
      const height = 600 - 2 * margin; //height of svg
      const padding = 10;
      
      const svg = d3.select('svg');
      
      let title = svg.append('text')
       .attr('class', 'title')
       .attr('y', 24) 
       .html('Total Deaths due to Covid19 - GLOBAL');
       
       //moves the start of the chart to the (60;60) position of SVG
      const chart = svg.append('g')
        .attr('transform', `translate(${margin}, ${margin})`);
      
      //create x- and y-axes
      const yScale = d3.scaleLinear()
        .range([height, padding]) //svg element starts in up left corner
        .domain([0, 30000]); 
  
      chart.append('g')
        .call(d3.axisLeft(yScale));
  
      const xScale = d3.scaleBand()
        .range([0, width])
        .domain(this.tenCountriesMaxDeath(data)) 
        .padding(0.2)
  
      chart.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));
      
      //add text label of x axis
      chart.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "translate("+ (width/2) +","+(height+50)+")")
        .text("Top ten most affected countries");
    

      // text label for the y axis
      chart.append("text")
        .style("text-anchor", "middle")
        .attr("transform", "translate("+ (-48) +","+(height/2)+")rotate(-90)")
        .text("Deaths");      

      //create rectangles as bars
      chart.selectAll()
        .data(this.tenCountriesMaxDeath(data))
        .enter()
        .append('rect')
        .attr('x', xScale(this.tenCountriesMaxDeath(data)))
        .attr('y', yScale(this.tenCountriesTotalNumberMaxDeath(data)) )
        .attr('height', height) //todo: Height minus data value
        .attr('width', xScale.bandwidth())
        .attr("fill", "teal")
  
        .attr('x', (actual, index, array) =>
        xScale(this.tenCountriesMaxDeath(data)))

        //create grid system
      chart.append('g')
        .attr('class', 'grid')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom()
        .scale(xScale)
        .tickSize(-height, 0, 0)
        .tickFormat(''))

      chart.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft()
        .scale(yScale)
        .tickSize(-width, 0, 0)
        .tickFormat(''))

      }     
}
