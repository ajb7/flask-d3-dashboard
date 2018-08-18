function updateBarChart(group, colorChosen, datasetBarChart) {
	
    var currentDatasetBarChart = datasetBarChosen(group, datasetBarChart);
    
    var basics = d3BarChartBase();

    var margin = basics.margin,
        width = basics.width,
       height = basics.height,
        colorBar = basics.colorBar,
        barPadding = basics.barPadding,
        misc = basics.misc
        ;
    
    var 	xScale = d3.scaleLinear()
        .domain([0, currentDatasetBarChart.length])
        .range([0, width])
        ;
    
        
    var yScale = d3.scaleLinear()
      .domain([0, d3.max(currentDatasetBarChart, function(d) { return d.measure; })])
      .range([height,0])
      ;
      
   var svg = d3.select("#barChart svg");
    
   // Title
   svg.selectAll("text.title") 
        .attr("x", (width + margin.left + margin.right)/2)
        .attr("y", misc.title)
        .attr("class","title")				
        .attr("text-anchor", "middle")
        .text("Age-group Breakdown of Survivors from "+group)
    ;
      
   var plot = d3.select("#barChartPlot")
       .datum(currentDatasetBarChart)
       ;

      plot.selectAll("rect")
      .data(currentDatasetBarChart)
      .transition()
        .duration(750)
        .attr("x", function(d, i) {
            return xScale(i);
        })
       .attr("width", width / currentDatasetBarChart.length - barPadding)   
        .attr("y", function(d) {
            return yScale(d.measure);
        })  
        .attr("height", function(d) {
            return height-yScale(d.measure);
        })
        .attr("fill", colorChosen)
        ;
    
    plot.selectAll("text.yAxis")
        .data(currentDatasetBarChart)
        .transition()
        .duration(750)
       .attr("text-anchor", "middle")
       .attr("x", function(d, i) {
               return (i * (width / currentDatasetBarChart.length)) + ((width / currentDatasetBarChart.length - barPadding) / 2);
       })
       .attr("y", function(d) {
               return yScale(d.measure) - misc.ylabel;
       })
       .text(function(d) {
            return formatAsInteger(d.measure)+"%";
       })
       .attr("class", "yAxis")					 
    ;
    
}
