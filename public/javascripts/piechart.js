
$(document).ready(function(){ 

 var map = new Datamap({
      element: document.getElementById('mapOne'), 
      scope:'usa',
      width: 700,
      responsive: true,
      fills: {
        defaultFill: '#587E84'
      }

  });


$("#mapOne").click(function(e){
    var temp = e.currentTarget.attributes[1].ownerElement.innerText
    if(!temp === " "){return clickedState}
    var clickedState = temp.slice(0, temp.length - 1).replace(/ /g,"_")

    $('#statename').text(clickedState)
    pieData(clickedState)
    
    $('.transform').toggleClass('transform-active');
});

//resize map  when window changes
d3.select(window).on('resize', function() {
    map.resize();
});

//gives back the data i need for the first
function pieData(clickedState){
  var arr=[]
  d3.json('v1/table_1.2', function(data){
    var stateData = data.filter(val =>{
          return val['US_State'] === clickedState;
    })[0]
    arr.push({legend:"BIRTHS" ,value:parseFloat(stateData.NoB_15_19.replace(/,|_|\[.*\]/g,''))}, {legend:"ABORTIONS" ,value:parseFloat(stateData.NoA_15_19.replace(/,|_|\[.*\]/g,''))},{legend:"FETAL LOSSES" ,value: parseFloat(stateData.NoF_15_19.replace(/,|_|\[.*\]/g,''))} )   

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
  // console.log(dataLegend)
  //canvas
  var canvas = d3.select('#pieChart')
  //arc path generator
  var arc = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(r);

  //layouts are built into d3, takes our data
  var pie = d3.layout.pie()

  var legendRectSize = 15;

  //create svg is none is there
  if(!group){
  group = canvas.append('svg')
    .attr('width', 285)
    .attr('height', 250).append('g')
    .attr('transform', 'translate(100,100)')

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

  var legend = d3.select('#pieChart svg')
      .append("g")
      .selectAll("g")
      .data(dataLegend)
      .enter()
      .append('g')
        .attr('class', 'legend')
        // .style('display', 'block')
        .attr('transform', function(d, i) {
          var height = legendRectSize;
          var x = 160;
          var y = i * height + 200;
          return 'translate(' + x + ',' + y + ')';
      });

    legend.append('title')
          .text('# of women 15-19: 2011')

    legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', color)
      .style('stroke', color);

    legend.append('text')
      .attr('x', legendRectSize + 3)
      .attr('y', legendRectSize - 3)
      .text(function(d,i) { 
        console.log(d, i)
        return d; });



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