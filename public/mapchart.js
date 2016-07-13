
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
    // arr2.push({legend:"Birth 15-19" ,value:parseFloat(stateData.NoB_15_19.replace(/,|_|\[.*\]/g,''))}, {legend:"Abortions 15-19" ,value:parseFloat(stateData.NoA_15_19.replace(/,|_|\[.*\]/g,''))},{legend:"Fetal Losses 15-19" ,value: parseFloat(stateData.NoF_15_19.replace(/,|_|\[.*\]/g,''))} )   
    // console.log(arr2)

    //current data for chart
    arr.push( parseFloat(stateData.NoB_15_19.replace(/,|_|\[.*\]/g,'')), parseFloat(stateData.NoA_15_19.replace(/,|_|\[.*\]/g,'')), parseFloat(stateData.NoF_15_19.replace(/,|_|\[.*\]/g,'')) )    

    //run the chart function which appends a graph...
    pieChart(arr);

  })
}

var group = null;
//appends pie chat
function pieChart(arr){
  var data = arr;
  var r =50;
  var color = d3.scale.category10()

  //canvas
  var canvas = d3.select('#pieChart')
  //arc path generator
  var arc = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(r);
  //layouts are built into d3, takes our data
  var pie = d3.layout.pie()
    .value(function(d){return d;})

  //create svg is none is there
  if(!group){
  group = canvas.append('svg')
    .attr('width', 100)
    .attr('height', 100).append('g')
    .attr('transform', 'translate(50,50)')

  var arcs = group.selectAll(".arc")
    .data(pie(data))
    .enter()
    .append('g')
    .attr('class', 'arc')

  arcs.append('path')
    .attr('d', arc)
    .attr('fill', function(d){
      return color(d.data);
    })

  arcs.append('text')
    .attr('transform', function(d){return "translate (" + arc.centroid(d) + ")";})
    .attr('text-anchor', 'middle')
    .attr('font-size', '.8em')
    .text(function(d){ return d.data})


  } else {
  //update the path and text
  group.selectAll('.arc path')
    .data(pie(data)).attr('d', arc)
    .attr('fill', function(d){
      return color(d.data);
    })

  group.selectAll('.arc text')
    .data(pie(data))
    .attr('transform', function(d){return "translate (" + arc.centroid(d) + ")";})
    .attr('text-anchor', 'middle')
    .attr('font-size', '.8em')
    .text(function(d){ return d.data})

  }

}

});