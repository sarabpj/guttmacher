$(document).ready(function(){ 
     var map2 = new Datamap({
          element: document.getElementById('mapTwo'), 
          scope:'usa',
           fills: {
          defaultFill: '#23AEE5'
        }
    });
// debugger

$(".column").click(function(e){

    var columnName = ($(this).val())

    column(columnName)
   console.log("columnName")
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
                  .range(['#D9DBE5', '#03A0D2']);

    function findId(d){
       return d.id
    }

    //this selects all of the states and overwrites the style
    //CURRENTLY THIS IS SELECTING FROM MAPONE EVEN THOUGH IT IS NOT CONNECTED
    d3.selectAll('.datamaps-subunit')
        //use a keyfunction to match the map to the data
        //FTFW
        .data(columnData, findId)
        .attr('style', function(d){
          return 'fill:' + color(d.val);
        })

    });
}




});

