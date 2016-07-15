$(document).ready(function(){ 
     var map = new Datamap({
          element: document.getElementById('container'), 
          scope:'usa',
           fills: {
          defaultFill: '#D9DBE5'
        }

      });


$(".column").click(function(e){

    var columnName = ($(this).val())

    column(columnName)

});



      // function change() {
      //   var value = this.value;
      //   debugger
      // }


function column(columnName){
    // var prop = columnName

    d3.json("v1", function(error, data) {
     
    var columnData = data.map( function (val, i){
        // debugger
        var obj ={}
        if(val.hasOwnProperty(columnName)){
               // console.log("obj."+columnName + "=" +val[columnName] + " , " + val["US_State"] );
            obj[val['Postal_Code']] = parseInt(val[columnName].replace(/,|_|\[.*\]/g,''))
            return obj


        }
        
        // debugger
        
    })
    // debugger
    console.log(columnData)

      // d3.selectAll("input")
      //     .on("change", change);

    });
}





});

