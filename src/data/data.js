export class Data {
  
  //get csv data
    deathsGlobalCovid19Data() {
        d3.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv")
        .then(data => this.sortDatabyCountryNames(data)) 
        .then(data => this.cleanData(data))
        .then(data => this.topTenCountriesDeaths(data))
        .then(data => this.visualCountriesWithMaxNumberOfDeaths(data))
        //.catch(error => this.error())
    }

    infectedGlobalCovid19Data() {
       d3.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv")
       .then(data => this.sortDatabyCountryNames(data)) 
       .then(data => this.cleanData(data))
       .catch(error => this.error())
   }

    recoveredCoivd19Data() {
        d3.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv") 
        .then(data => this.sortDatabyCountryNames(data)) 
        .then(data => this.cleanData(data))
        .catch(error => this.error())
    }

    error() {
      console.log("Had an error loading file.")
    }

    //arrange data alphabetically
    sortDatabyCountryNames(data) { //data is now whole data set (->then!)
        return data.sort(this.compareCountries);
    }

    compareCountries(a, b) { 
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
    //keep in mind: just last column is aggregated!
    cleanData(data) {
      let header = data['columns'].map(header => header);
      let lastEntryInHeaders = (header[header.length - 1])

        for(let i = data.length - 1; i >= 1; i--) {
            let j = i - 1;
            let currentCountry = data[i]['Country/Region']; 
            let nextCountry = data[j]['Country/Region'];
            
            data[i][lastEntryInHeaders] = parseInt(data[i][lastEntryInHeaders], 10); 
            data[j][lastEntryInHeaders] = parseInt(data[j][lastEntryInHeaders], 10);

            if (currentCountry.localeCompare(nextCountry) == 0) { 
                data[j][lastEntryInHeaders] += data[i][lastEntryInHeaders];
                data.splice(i, 1);
            }
        }
        return data;
    }

    //extract top ten countries with highest number of deaths
    topTenCountriesDeaths(data) { //todo
      let header = data['columns'].map((header) => header);
      //let header = data.map(header => data['columns']); Gibt jetzt für jedes Arrayobjekt die headers aus. Soll aber nur EINMAL headers ausgeben
      let headertest =  data.map(header => data['columns'])
      console.log(header)
      console.log(headertest)
      let lastEntryInHeaders = (header[header.length - 1])
    
      //sort data in descending order of number of deaths
      let countriesSortedByTotalNumbers = data.sort(compareTotal);
        function compareTotal(a, b) {
          let country1 = a[lastEntryInHeaders]; 
          let country2 = b[lastEntryInHeaders]; 

          let comparison = 0;
          if (country1 > country2) {
            comparison = -1;
          } else if (country1 < country2) {
            comparison = 1;
          }
          return comparison;
        }

      let topTen = []
      for(let i = 0; i < 10; i++) {
        topTen.push(countriesSortedByTotalNumbers[i]) 
      }
      //possible with map()?
      //let testArrayTopTec = countriesSortedByTotalNumbers.map(i => ...)
      return topTen;
    }  

    visualCountriesWithMaxNumberOfDeaths(data) { 
      const margin = 60;
      const width = 1000 - 2 * margin; //width of svg
      const height = 600 - 2 * margin; //height of svg
      const padding = 10;
      let countrynames = data.map(countryname =>  countryname['Country/Region'])
      
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
        .range([height, 0]) //svg element starts in up left corner
        .domain([0, 30000]); 
  
      chart.append('g')
        .call(d3.axisLeft(yScale));
  
      const xScale = d3.scaleBand()
        .range([0, width])
        .domain(countrynames) //why not possible to define countrynames in .domain() with map()Function?
        //we take an intervall (called domain by d3.js) and transform it to a new intervall (call range by d3.js)
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

      //create rectangles 
      chart.selectAll()
        .data(this.topTenCountriesDeaths(data))
        .enter()
        .append('rect')
        .attr('x', (actual, index, array) => index * 88.5)
        .attr('y',  yScale(this.tenCountriesTotalNumberMaxDeath(data))) //todo
        .attr('height', (actual, index, array) => height - yScale(this.tenCountriesTotalNumberMaxDeath(data)[index]) ) //todo: Height minus data value
        .attr('width', xScale.bandwidth())
        .attr("fill", "teal")

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
