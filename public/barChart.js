$(document).ready(function(){ 

$("#container").click(function(e){
    var temp = e.currentTarget.attributes[1].ownerElement.innerText
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

function update(data) {
    var scale = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0, 400]);

    var bars = d3.select("#barChart")
        .selectAll("div")
        .data(data)
        .attr("class","barChart");
     
    // enter divs
    bars.enter().append("div");

    // update divs
    bars.style("width", function (d) {return scale(d) + "px";})
        .text(function (d) {return d;});

};



});

