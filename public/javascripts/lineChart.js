$(document).ready(function(){ 

$("#mapOne").click(function(e){
    var temp = e.currentTarget.attributes[1].ownerElement.innerText
    if(!temp === ""){return clickedState}
    var clickedState = temp.slice(0, temp.length - 1).replace(/ /g,"_")

    // $('#stateName').text(temp)
    lineGraph(clickedState)
    
});

var svg;
//gives back the data line graph
function lineGraph(clickedState){

      var arr =[]
      d3.json('v1/chart2', function(data){
        var stateData = data.filter(val =>{
        return val['US_State'] === clickedState;
        })[0] 
        //data for chart
        arr.push({label:"Pregnancy Rate", 
          x:[1988, 1992, 1996, 2000, 2005, 2010, 2011], 
          y:[parseFloat(stateData.PR_1988.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.PR_1992.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.PR_1996.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.PR_2000.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.PR_2005.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.PR_2010.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.PR_2011.replace(/,|_|\[.*\]/g,''))]},
          {label:"Abortion Rate", 
          x:[1988, 1992, 1996, 2000, 2005, 2010, 2011], 
          y:[parseFloat(stateData.AR_1988.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.AR_1992.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.AR_1996.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.AR_2000.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.AR_2005.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.AR_2010.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.AR_2011.replace(/,|_|\[.*\]/g,''))]},
          {label:"Birth Rate", 
          x:[1988, 1992, 1996, 2000, 2005, 2010, 2011], 
          y:[parseFloat(stateData.BR_1988.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.BR_1992.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.BR_1996.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.BR_2000.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.BR_2005.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.BR_2010.replace(/,|_|\[.*\]/g,'')),parseFloat(stateData.BR_2011.replace(/,|_|\[.*\]/g,''))]})
        
        currentSvg = document.getElementById("lineChart")

        currentSvg.innerHTML = ''

        svg = d3.select("#lineChart").append("svg")
            .datum(arr)
            .call(lineChart()) ;
    })
}


function lineChart() {
    var width = 510,  
        height = 250

    //selection is the complete array
    function chart(selection) {
        //datasets is the individual array
        selection.each(function(datasets) {
            //create plot
            var margin = {top: 30, right: 80, bottom: 50, left: 70}, 
                innerwidth = width - margin.left - margin.right,
                innerheight = height - margin.top - margin.bottom ;
            
            //create x scale
            var x_scale = d3.scale.linear()
            //defines the available area to render graph
                .range([0, innerwidth])
            //defines the max and min values that we have to plot
                .domain(["1988", "2012" ]) ;
            //create y scale
            var y_scale = d3.scale.linear()
                .range([innerheight, 0])
                .domain([ 0, 175 ]) ;
            //
            var color_scale = d3.scale
                .ordinal()
                .range(["#BC6542", "#C18E3D", "#587E84"])
                .domain(d3.range(datasets.length));

            var x_axis = d3.svg.axis()
                .scale(x_scale)
                .orient("bottom")
                .tickFormat(d3.format("d")) ;

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
            //append grid
            svg.append("g")
                .attr("class", "x grid")
                .attr("transform", "translate(0," + innerheight + ")")
                .call(x_grid) ;

            //append y grid
            svg.append("g")
                .attr("class", "y grid")
                .call(y_grid) ;

            //xlabel 
            svg.append("text")
                .attr('class', 'xlabel')
                .attr('x', 180)
                .attr('y', 215)
                .attr("text-anchor", "end")
                .text('Year');
                
            //ylabel
            svg.append("text")
                .attr('class', 'ylabel')
                .attr("transform", "rotate(-90)")
                .attr("x", -20)
                .attr("y", -45)
                .attr("dy", ".71em")
                .attr("text-anchor", "end")
                .text("# per 1,000 teens");
                
            //append y axis
            svg.append("g")
                .attr("class", "y axis")
                .call(y_axis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.11em")
                .attr("text-anchor", "end");

            //append x axis
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0,170)") 
                .call(x_axis)
                .attr("x", innerwidth)
                .selectAll("text")  
                    .attr("text-anchor", "end")
                    .attr("dx", "-1.8em")
                    .attr("dy", ".25em")
                    .attr("transform", function(d) {
                        return "rotate(-55)" 
                    })
        

            var data_lines = svg.selectAll(".data_line")
                .data(datasets.map(function(d) {return d3.zip(d.x, d.y);}))
                .enter().append("g")
                .attr("class", "data_line") ;

            //add the valueline path
            data_lines.append("path")
                .attr("class", "line")
                .attr("d", function(d) {return draw_line(d); })
                .attr("stroke", function(_, i) {return color_scale(i);})
                .attr('fill', 'none') ;

     
            var legendBox = 15;                                
            var legendSpacing = 4;

            var legend = svg.selectAll('.lineLegend')                     
              .data(datasets.map(function(d) { return d.label}))                                   
              .enter()                                                
              .append('g')                                           
              .attr('class', 'lineLegend')                                
              .attr('transform', function(d, i) {                     
                var height = legendBox + legendSpacing;         
                var offset =  2 ;    
                var horz = 240;                      
                var vert = i * height + offset;                       
                return 'translate(' + horz + ',' + vert + ')';        
              });     

            legend.append('rect')                                    
              .attr('width', legendBox)                         
              .attr('height', legendBox)                        
              .style('fill', color_scale)                                   
              .style('stroke', color_scale);  

            legend.append('text')                                     
              .attr('x', legendBox + legendSpacing)              
              .attr('y', legendBox - legendSpacing)              
              .text(function(d) { return d; });    







        }) ;
    }


    return chart;

  }

});