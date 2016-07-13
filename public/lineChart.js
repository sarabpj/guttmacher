$(document).ready(function(){ 

$("#container").click(function(e){
    var temp = e.currentTarget.attributes[1].ownerElement.innerText
    var clickedState = temp.slice(0, temp.length - 1).replace(/ /g,"_")

    $('#statename').text(clickedState)
    lineData(clickedState)
    
});


//gives back the data i need for the first
function lineData(clickedState){

  var arr =[]
  d3.json('v1/chart2', function(data){
    var stateData = data.filter(val =>{
          return val['US_State'] === clickedState;
    })[0] 
    //data for chart
    console.log(stateData)
  //  
    arr.push({label:"Pregnancy Rate", 
      x:[1988, 1992, 1996, 2000, 2005, 2010, 2011], 
      y:[parseFloat(stateData.PR_1988.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.PR_1992.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.PR_1996.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.PR_2000.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.PR_2005.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.PR_2010.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.PR_2011.replace(/,|_|\[.*\]/g,''))]},
      {label:"Abortion Rate", 
      x:[1988, 1992, 1996, 2000, 2005, 2010, 2011], 
      y:[parseFloat(stateData.AR_1988.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.AR_1992.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.AR_1996.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.AR_2000.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.AR_2005.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.AR_2010.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.AR_2011.replace(/,|_|\[.*\]/g,''))]},
      {label:"Birth Rate", 
      x:[1988, 1992, 1996, 2000, 2005, 2010, 2011], 
      y:[parseFloat(stateData.BR_1988.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.BR_1992.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.BR_1996.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.BR_2000.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.BR_2005.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.BR_2010.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.BR_2011.replace(/,|_|\[.*\]/g,''))]}
      )
    console.log(arr)

var xy_chart = d3_xy_chart()
    .width(560)
    .height(200)
    .xlabel("X Axis")
    .ylabel("Y Axis") ;
var svg = d3.select("body").append("svg")
    .datum(arr)
    .call(xy_chart) ;

function d3_xy_chart() {
    var width = 540,  
        height = 280, 
        xlabel = "X Axis Label",
        ylabel = "Y Axis Label" ;
    
    function chart(selection) {
        selection.each(function(datasets) {
            var margin = {top: 30, right: 110, bottom: 30, left: 50}, 
                innerwidth = width - margin.left - margin.right,
                innerheight = height - margin.top - margin.bottom ;
            
            var x_scale = d3.scale.linear()
                .range([0, innerwidth])
                .domain([ d3.min(datasets, function(d) { return d3.min(d.x); }), 
                          d3.max(datasets, function(d) { return d3.max(d.x); }) ]) ;
            
            var y_scale = d3.scale.linear()
                .range([innerheight, 0])
                .domain([ d3.min(datasets, function(d) { return d3.min(d.y); }),
                          d3.max(datasets, function(d) { return d3.max(d.y); }) ]) ;

            var color_scale = d3.scale.category10()
                .domain(d3.range(datasets.length)) ;

            var x_axis = d3.svg.axis()
                .scale(x_scale)
                .orient("bottom") ;

            var y_axis = d3.svg.axis()
                .scale(y_scale)
                .orient("left") ;

            var x_grid = d3.svg.axis()
                .scale(x_scale)
                .orient("bottom")
                .tickSize(-innerheight)
                .tickFormat("") ;

            var y_grid = d3.svg.axis()
                .scale(y_scale)
                .orient("left") 
                .tickSize(-innerwidth)
                .tickFormat("") ;

            var draw_line = d3.svg.line()
                .interpolate("basis")
                .x(function(d) { return x_scale(d[0]); })
                .y(function(d) { return y_scale(d[1]); }) ;

            var svg = d3.select(this)
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")") ;
            
            svg.append("g")
                .attr("class", "x grid")
                .attr("transform", "translate(0," + innerheight + ")")
                .call(x_grid) ;

            svg.append("g")
                .attr("class", "y grid")
                .call(y_grid) ;

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + innerheight + ")") 
                .call(x_axis)
                .append("text")
                .attr("dy", "-.71em")
                .attr("x", innerwidth)
                .style("text-anchor", "end")
                .text(xlabel) ;
            
            svg.append("g")
                .attr("class", "y axis")
                .call(y_axis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .style("text-anchor", "end")
                .text(ylabel) ;

            var data_lines = svg.selectAll(".d3_xy_chart_line")
                .data(datasets.map(function(d) {return d3.zip(d.x, d.y);}))
                .enter().append("g")
                .attr("class", "d3_xy_chart_line") ;
            
            data_lines.append("path")
                .attr("class", "line")
                .attr("d", function(d) {return draw_line(d); })
                .attr("stroke", function(_, i) {return color_scale(i);}) ;
            
            data_lines.append("text")
                .datum(function(d, i) { return {name: datasets[i].label, final: d[d.length-1]}; }) 
                .attr("transform", function(d) { 
                    return ( "translate(" + x_scale(d.final[0]) + "," + 
                             y_scale(d.final[1]) + ")" ) ; })
                .attr("x", 3)
                .attr("dy", ".35em")
                .attr("fill", function(_, i) { return color_scale(i); })
                .text(function(d) { return d.name; }) ;

        }) ;
    }

    chart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    };

    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return chart;
    };

    chart.xlabel = function(value) {
        if(!arguments.length) return xlabel ;
        xlabel = value ;
        return chart ;
    } ;

    chart.ylabel = function(value) {
        if(!arguments.length) return ylabel ;
        ylabel = value ;
        return chart ;
    } ;

    return chart;
  }

  })

}




});