
$(document).ready(function(){ 

 var map = new Datamap({
      element: document.getElementById('container'), 
      scope:'usa',
       fills: {
      defaultFill: '#D9DBE5'
    }

  });


$("#container").click(function(e){
    var temp = e.currentTarget.attributes[1].ownerElement.innerText
    var clickedState = temp.slice(0, temp.length - 1).replace(/ /g,"_")

    $('#statename').text(clickedState)

    currentSvg = document.getElementById("pieChart")

    currentSvg.innerHTML = ''
    pieData(clickedState)
    
});


//gives back the data i need for the first
function pieData(clickedState){
  var arr = []
  var arr2=[]
  d3.json('v1/table_1.2', function(data){
    var stateData = data.filter(val =>{
          return val['US_State'] === clickedState;
    })[0]
    arr2.push({legend:"Births 15-19" ,value:parseFloat(stateData.NoB_15_19.replace(/,|_|\[.*\]/g,''))}, {legend:"Abortions 15-19" ,value:parseFloat(stateData.NoA_15_19.replace(/,|_|\[.*\]/g,''))},{legend:"Fetal Losses 15-19" ,value: parseFloat(stateData.NoF_15_19.replace(/,|_|\[.*\]/g,''))} )   


    pieChart(arr2);

  })
}

var group = null;
//appends pie chat
function pieChart(arr){
    var color = d3.scale.category20c();

var data = arr;


var group = d3.select('#pieChart')
              .append("svg")
              .data([data])
              .attr("width", 180)
              .attr("height", 180)
              .append("g")
              .attr("transform", "translate(" + 90 + "," + 90 + ")");

var pie = d3.layout.pie().value(function(d){return d.value;});

// declare an arc generator function
var arc = d3.svg.arc().outerRadius(90);

// select paths, use arc generator to draw
var arcs = group.selectAll("arc")
                .data(pie)
                .enter()
                .append("g")
                .attr("class", "arc");

arcs.append("path")
    .attr("fill", function(d, i){
        return color(i);
    })
    .attr("d", function (d) {
        return arc(d);
    });

// add the text
arcs.append("text").attr("transform", function(d){
      d.innerRadius = 0;
      d.outerRadius = 90;
    return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "top").text( function(d, i) {
    return data[i].legend;}
    );

}

});