export class Data{

    //get csv data
    deathsGlobalCovid19Data() {
        d3.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv")
        .then(data => this.sortDatabyCountryNames(data)) 
        .then(data => this.cleanData(data))
        .then(data => this.filterTopTenCountries(data))
        .then((data, type = "DEATHS") => this.visualData(data, type))
        .catch(error => this.error())
    }

    infectedGlobalCovid19Data() {
       d3.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv")
       .then(data => this.sortDatabyCountryNames(data)) 
       .then(data => this.cleanData(data))
       .then(data => this.filterTopTenCountries(data))
       .then((data, type = "INFECTED") => this.visualData(data, type))
       .catch(error => this.error())
   }

    recoveredCoivd19Data() {
        d3.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv")
        .then(data => this.sortDatabyCountryNames(data)) 
        .then(data => this.cleanData(data))
        .then(data => this.filterTopTenCountries(data))
        .then((data, type = "RECOVERED") => this.visualData(data, type))
        .catch(error => this.error())
    }

    error() {
      console.log("Had an error loading file.")
    }

    //arrange data alphabetically
    sortDatabyCountryNames(data) { 
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

    //extract top ten countries with highest numbers
    filterTopTenCountries(data) { 
      let header = data['columns'].map(header => header);
      let lastEntryInHeaders = (header[header.length - 1])
    
      //sort data in descending order by total numbers
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
      return countriesSortedByTotalNumbers.slice(0, 10)
    }  
    

    //Following guided by https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript/ 
    visualData(data, datatype) {
      //remove existent svg-element
      d3.selectAll("svg")
      .selectAll("g")
      .remove();
      
      //create date-variable
      // necessary because column variable is not included anymore
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      let formattedDate = (yesterday.getMonth() + 1) + "/" + ((yesterday.getDate()) + "/" + yesterday.getFullYear().toString().substring(2))
      if(data[0][formattedDate] == undefined) {
        yesterday.setDate(yesterday.getDate() - 1)
        console.log("yesterday not found. Taking the day before yesterday")
        if(data[0][formattedDate] == undefined) {
          console.log("ERROR: COULD NOT FOUND DATA OF YESTERDAY AND THE DAY BEFORE")
        }
      }

      const margin = 80;
      const width = 1000 - 2 * margin; 
      const height = 600 - 2 * margin; 
      let countrynames = data.map(countryname =>  countryname['Country/Region']) 
      
      const svg = d3.select('svg');
       
      //creates the chart-variable
      const chart = svg.append('g')
        .attr('transform', `translate(${margin}, ${margin})`);
      
      //define title
      chart.append('text')
        .attr('class', 'title')
        .attr('y', -35) 
        .text("Top ten most affected countries - " + datatype);

      //create y-axe
      const yScale = d3.scaleLinear() 
        .range([height, 0]) 
        .domain([0, data[0][formattedDate] + 11000]); 
  
        chart.append('g')
        .attr('class', 'axes')
        .call(d3.axisLeft(yScale)); 
  
      //create x-axe
      const xScale = d3.scaleBand()
        .range([0, width])
        .domain(countrynames) 
        .padding(0.2)
  
      chart.append('g')
        .attr('class', 'axes')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));
      
      // text label of x axis
      chart.append("text")
        .attr('class', 'axisLabel')
        .attr("text-anchor", "middle")
        .attr("transform", "translate("+ (width/2) +","+(height+50)+")")
        .text("Countries");

      // text label for the y axis
      chart.append("text")
        .attr('class', 'axisLabel')
        .attr("text-anchor", "middle")
        .attr("transform", "translate("+ (-57) +","+(height/2)+")rotate(-90)")
        .text("Total " + datatype[0] + datatype.substring(1,datatype.length).toLowerCase());      

      //create rectangles 
      chart.selectAll() 
        .data(data) 
        .enter() 
        .append('rect') 
        .attr('x', (d,i) => xScale(data[i]['Country/Region']) ) 
        .attr('y', (d,i) => yScale(data[i][formattedDate])) 
        .attr('width', xScale.bandwidth())
        .attr('height', (d, i) =>  height - yScale(data[i][formattedDate]))
        .on("mouseover", onMouseOver)
        .on("mouseout", onMouseOut) 

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

      //add Date
      chart.append('text')
        .attr('class', 'date')
        .attr('x', 790)
        .attr('y', 510)
        .text("Database updated: " + formattedDate);

      //Add event handler
      //highlight and resize bar for onMouseOver-Event
      function onMouseOver(d, i) {
        data[i]['Country/Region'].toString().length
        d3.select(this).attr('class', 'highlight');
        d3.select(this)
          .transition() //adds animation
          .duration(400)
          .attr('width', xScale.bandwidth() + 5)
          .attr("y", y => yScale(data[i][formattedDate]))
          .attr("height", h => height - yScale(data[i][formattedDate] + 10 ))

          //add text of total numbers for onMouse-Event
          chart.append("text")
            .attr('class', 'val') 
            .attr('x', x => xScale(data[i]['Country/Region']) + (xScale.bandwidth() + 6) / 2)
            .attr("text-anchor", "middle")
            .attr('y', y => yScale(data[i][formattedDate]) + 23 )
            .text([data[i][formattedDate].toString()]); // value of text in bar -> total Numbers for country
    }

    function onMouseOut(d, i) {
      // use the text label class to remove label on mouseout
      d3.select(this).attr('class', 'bar');
      d3.select(this)
        .transition() 
        .duration(400)
        .attr('width', xScale.bandwidth())
        .attr("text-anchor", "middle")
        .attr("y", y => yScale(data[i][formattedDate]))
        .attr("height", h => height - yScale(data[i][formattedDate]));
      d3.selectAll('.val')
        .remove()
      }
    return data; 
    } 
  }

