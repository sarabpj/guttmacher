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
// debugger

$(".column").click(function(e){

    var columnName = ($(this).val())

    column(columnName)
   
});

d3.select(window).on('resize', function() {
    map2.resize();
});

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
 

    //if NAN it does not apply color
    var color = d3.scale.linear()
                  .domain([d3.min(columnData, function(d){return d.val}), d3.max(columnData, function(d){return d.val})])
                  .range(['#94B8A6', '#C18E3D']);

    function findId(d){
       return d.id
    }

    //this selects all of the states and overwrites the style
    //selectling all from the first instance of the map (#mapOne) though the variable is difference in reference to the map
    d3.selectAll("#mapTwo").selectAll('.datamaps-subunit')
        //use a keyfunction to match the map to the data
        .data(columnData, findId)
        .attr('style', function(d){
          return 'fill:' + color(d.val);
        })

    });
}




});

