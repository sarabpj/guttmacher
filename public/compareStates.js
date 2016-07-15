$(document).ready(function(){ 
     var map = new Datamap({
          element: document.getElementById('container'), 
          scope:'usa',
           fills: {
          defaultFill: '#D9DBE5'
        }});
// debugger

$(".column").click(function(e){

    var columnName = ($(this).val())

    column(columnName)

});

      // function change() {
      //   var value = this.value;
      //   debugger
      // }

//takes in the value of current radio, makes a request to my database
function column(columnName){
  

    d3.json("v2", function(error, data) { 

    //return the state and value in an object
    var columnData = data.map( function (val, i){
        var obj ={}
        if(val.hasOwnProperty(columnName)){
         obj['PC'] = val['Postal_Code']
         obj['val'] = parseInt(val[columnName].replace(/,|_|\[.*\]/g,''))
            return obj
        }

    })
    // console.log('column data', columnData)
    //color scale storting from min value to max value of column
    //if NAN it does not apply color
    var color = d3.scale.linear()
                  .domain([d3.min(columnData, function(d){return d.val}), d3.max(columnData, function(d){return d.val})])
                  .range(['#D9DBE5', '#03A0D2']);


    //this selects all of the states and overwrites the style
    d3.selectAll('.datamaps-subunit')

        //figure out do a key match...
        .data(columnData)
        .attr('style', function(d){
          return 'fill:' + color(d.val);

        })

    debugger

    });
}

debugger




});

