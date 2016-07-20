$(document).ready(function(){ 
     var map2 = new Datamap({
          element: document.getElementById('mapTwo'), 
          scope:'usa',
          width: 700,
          responsive: true,
           fills: {
          defaultFill: '#9D7274'
           },
           geographyConfig:{
            popupOnHover: false, // True to show the popup while hovering
            highlightOnHover: false,
           }
    });

$(".column").click(function(e){

    var columnName = ($(this).val())

    column(columnName)
   
});

d3.select(window).on('resize', function() {
    map2.resize();
});

    var legendRectSize = 20;
//takes in the value of current radio, makes a request to my database
function column(columnName){
  
    d3.json("v2", function(error, data) { 

      //return the state and value in an object
      var columnData = data.map( function (val, i){
          var obj ={}
          if(val.hasOwnProperty(columnName)){
           obj['id'] = val['Postal_Code']
           obj['val'] = parseInt(val[columnName].replace(/,|_|\[.*\]/g,''))
              return obj
          }

      })
   
      var colors = d3.scale.linear()
                    .domain([d3.min(columnData, function(d){return d.val}), d3.max(columnData, function(d){return d.val})])
                    .range(['#94B8A6', '#C18E3D']);

      function findId(d){
         return d.id
      }

      //selects all the states, and applies the value of the column to the correct state
      //then give it a fill relative to the value
     d3.selectAll("#mapTwo").selectAll('.datamaps-subunit')
          //use a keyfunction to match the map to the data
          .data(columnData, findId)
          .attr('style', function(d){
            if(!d.val){return 'fill: #E3DFBB'}
            return 'fill:' + colors(d.val );
          })     

      var svg = d3.select('#mapTwo svg');
      svg.append('g').attr('class', 'legendLinear').attr('transform', 'translate(350,353)')

      var legendLinear = d3.legend.color().shapeWidth(50).orient('horizontal').scale(colors);
      svg.select('.legendLinear').call(legendLinear)

      // debugger

    });

}




});

