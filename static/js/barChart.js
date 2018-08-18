var group = "All";
    
function datasetBarChosen(group, datasetBarChart) {
        var ds = [];
        for (x in datasetBarChart) {
             if(datasetBarChart[x].group==group){
                 ds.push(datasetBarChart[x]);
             } 
            }
        return ds;
}

function d3BarChartBase() {

    var margin = {top: 30, right: 5, bottom: 20, left: 50},
    width = 600 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom,
    colorBar = d3.scaleOrdinal(d3.schemeCategory10),
    barPadding = 1,
    misc = {ylabel: 7, xlabelH : 5, title:11};
    
    return {
        margin : margin, 
        width : width, 
        height : height, 
        colorBar : colorBar, 
        barPadding : barPadding,
        misc: misc
    };
}

function d3BarChart(datasetBarChart) {
	var firstDatasetBarChart = datasetBarChosen(group, datasetBarChart);         	
	
	var basics = d3BarChartBase();
	
	var margin = basics.margin,
		width = basics.width,
	   height = basics.height,
		colorBar = basics.colorBar,
        barPadding = basics.barPadding,
        misc = basics.misc
		;
					
	var 	xScale = d3.scaleLinear()
						.domain([0, firstDatasetBarChart.length])
						.range([0, width])
						;
						
	var yScale = d3.scaleLinear()
		   .domain([0, d3.max(firstDatasetBarChart, function(d) { return d.measure; })])
           .range([height, 0]);
	
	var svg = d3.select("#barChart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id","barChartPlot")
    ;

    // Title

    svg.append("text")
    .attr("x", (width + margin.left + margin.right)/2)
    .attr("y", misc.title)
    .attr("class","title")				
    .attr("text-anchor", "middle")
    .text("Age-group Breakdown of all Survivors");

    var plot = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + (margin.top + misc.ylabel) + ")");
            
    plot.selectAll("rect")
    .data(firstDatasetBarChart)
    .enter()
    .append("rect")
        .attr("x", function(d, i) {
            return xScale(i);
        })
    .attr("width", width / firstDatasetBarChart.length - barPadding)   
        .attr("y", function(d) {
            return yScale(d.measure);
        })  
        .attr("height", function(d) {
            return height-yScale(d.measure);
        })
        .attr("fill", "#6B6B6B");
    
    	
	// Add y labels to plot	
	
	plot.selectAll("text")
	.data(firstDatasetBarChart)
	.enter()
	.append("text")
	.text(function(d) {
			return formatAsInteger(d.measure)+"%";
	})
	.attr("text-anchor", "middle")

	.attr("x", function(d, i) {
			return (i * (width / firstDatasetBarChart.length)) + ((width / firstDatasetBarChart.length - barPadding) / 2);
	})
	.attr("y", function(d) {
			return (yScale(d.measure) - misc.ylabel);
	})
	.attr("class", "yAxis")
    ;
    
    // Add x labels to chart	
	
    var xLabels = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + (margin.top + height + misc.xlabelH)  + ")");

    xLabels.selectAll("text.xAxis")
    .data(firstDatasetBarChart)
    .enter()
    .append("text")
    .text(function(d) { return d.category;})
    .attr("text-anchor", "middle")
    .attr("x", function(d, i) {
        return (i * (width / firstDatasetBarChart.length)) + ((width / firstDatasetBarChart.length - barPadding) / 2);
    })
    .attr("y", 15)
    .attr("class", "xAxis")
    ; 			
}