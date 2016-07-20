$(document).ready(function(){ 

$("#mapOne").click(function(e){
    var temp = (e.currentTarget.attributes[1].ownerElement.innerText || "Click on a state")
    if(!temp === ""){return clickedState}
    var clickedState = temp.slice(0, temp.length - 1).replace(/ /g,"_")

    $('#statename').text(temp)

    barChart(clickedState)
});

    
function barChart(clickedState) {
        var arr =[]
      d3.json('v1/table_1.8', function(data){
        var stateData = data.filter(val =>{
        return val['US_State'] === clickedState;
        })[0] 
      //data for chart
        arr.push(parseInt(stateData.NoB_H.replace(/,|_|\[.*\]/g,'')),parseInt(stateData.NoB_NHB.replace(/,|_|\[.*\]/g,'')),parseInt(stateData.NoB_NHW.replace(/,|_|\[.*\]/g,'')),parseInt(stateData.NoB_NHO.replace(/,|_|\[.*\]/g,'')))
        
        update(arr);

    })

};

var legend = null;
function update(data) {
    var scale = d3.scale.linear()
        .range([0, 400])
        .domain([0, d3.max(data)]);

    var bars = d3.select("#barChart")
        .selectAll("div")
        .data(data)
        .attr("class","barChart");
     
    var color = d3.scale.ordinal()
    .domain(["Hispanic", "Nonhispanic Black", "Nonhispanic White", "Nonhispanic Other"])
    .range(["#BC6542", "#C18E3D", "#E3BF6B", "#587E84"]);


    var legendRectSize =15;
 
    // enter divs
    bars.enter().append("div");

    // update divs
    bars.style("width", function (d) {return scale(d)/2 +  "px";})
        .text(function (d) {return d;}).style('background-color', function(d){ return color(d)});

                
    if(!legend){

         //xlabel 
        d3.select("#barChart").append("text")
            .attr('class', 'barTitle')
            .attr("text-anchor", "middle")
            .text('Number of teen births, by race: 2011');

     legend = d3.select('#barChart')
        .append("g")
        .attr('class', 'barLegend')
        .selectAll("g")
        .data(color.domain().slice(0,4))
        .enter()
        .append('g')
          .attr('class', 'legend')
          .attr('transform', function(d, i) {
            var height = legendRectSize;
            var x = 0;
            var y = i * height ;
            return 'translate(' + x + ',' + y + ')';
        });

      // console.log('COLor DOMAIN', color.domain())
      legend.append('div')
        .attr('width', 10)
        .attr('height', 10)
        .style('background-color', function(d){ return color(d)})
        .style('display', 'inline-block');

      legend.append('text')
        .attr('x', legendRectSize + 5)
        .attr('y', legendRectSize )
        .text(function(d,i) { 
          console.log(d, i)
          return d; });

    }
};



});

