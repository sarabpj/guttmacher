
$(document).ready(function(){ 

 var map = new Datamap({
      element: document.getElementById('mapOne'), 
      scope:'usa',
      width: 700,
      height: 400,
      fills: {
        defaultFill: '#587E84'
      }

  });


$("#mapOne").click(function(e){
    var temp = e.currentTarget.attributes[1].ownerElement.innerText
    if(!temp){return temp}
    var clickedState = temp.slice(0, temp.length - 1).replace(/ /g,"_")

    // $('#stateName').text(clickedState)
    pieData(clickedState)
    
});




//gives back the data i need for the first
function pieData(clickedState){
  var arr=[]
  d3.json('v1/table_1.2', function(data){
    var stateData = data.filter(val =>{
          return val['US_State'] === clickedState;
    })[0]
    arr.push({legend:"Births" ,value:parseFloat(stateData.NoB_15_19.replace(/,|_|\[.*\]/g,''))}, {legend:"Abortions" ,value:parseFloat(stateData.NoA_15_19.replace(/,|_|\[.*\]/g,''))},{legend:"Fetal Losses" ,value: parseFloat(stateData.NoF_15_19.replace(/,|_|\[.*\]/g,''))} )   

    //run the chart function which appends a graph...
    pieChart(arr);

  })
}

var group = null;

//appends pie chat
function pieChart(arr){
  var data = arr;
  var r =80;
  var color = d3.scale.ordinal().range(["#BC6542", "#C18E3D", "#E3BF6B"]);

  var dataValue = arr.map(function(v,i){return v.value})
  var dataLegend = arr.map(function(v,i){return v.legend})


  //canvas
  var canvas = d3.select('#pieChart')
  //arc path generator
  var arc = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(r);

  //layouts are built into d3, takes our data
  var pie = d3.layout.pie()

  var legendRectSize = 15;
  var rectSpace = 4;

  //create svg is none is there
  if(!group){
  group = canvas.append('svg')
    .attr('width', 290)
    .attr('height', 260).append('g')
    .attr('transform', 'translate(80,100)')

  var arcs = group.selectAll(".arc")
    .data(pie(dataValue))
    .enter()
    .append('g')
    .attr('class', 'arc')

  arcs.append('path')
    .attr('d', arc)
    .attr('class', 'path')
    .attr('fill', function(d){
      return color(d.value);
    })

  arcs.append('text')
    .attr('transform', function(d){return "translate (" + arc.centroid(d) + ")";})
    .attr('text-anchor', 'middle')
    .attr('font-size', '.8em')
    .text(function(d){ 
      return d.value})
    .attr('class', 'pieValue')

  var pieLegend = d3.select('#pieChart svg')
      .append("g")
      .selectAll("g")
      .data(dataLegend)
      .enter()
      .append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) {
          var height = legendRectSize + rectSpace;
          var offset =  height*40 /4 ;    
          var horz = 170;                      
          var vert = i * height + offset;                       
          return 'translate(' + horz + ',' + vert + ')';   
      });

    d3.select('#pieChart svg').append('text')
          .attr('class', 'pieTitle')
          .attr("text-anchor", "middle")
          .text('Number of Teen')
          .attr('transform', "translate(212,180)")


    pieLegend.append('rect')
    .attr('class', 'pieLegendBox')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', color)
      .style('stroke', color);

    pieLegend.append('text')
      .attr('class', 'pieLegendText')
      .attr('x', legendRectSize + 10)
      .attr('y', legendRectSize - 3)
      .text(function(d) { return d; });


  } else {

  //update the path 
  group.selectAll('.arc path')
    .data(pie(dataValue)).attr('d', arc)
    .attr('fill', function(d){
      return color(d.value);
    });
  //update the text
  group.selectAll('.arc text')
    .data(pie(dataValue))
    .attr('transform', function(d){return "translate (" + arc.centroid(d)+ ")";})
    .attr('text-anchor', 'middle')
    .attr('font-size', '.8em')
    .text(function(d){ return d.value});

  }


}

});