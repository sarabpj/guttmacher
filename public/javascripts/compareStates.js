$(document).ready(function(){ 
     var map2 = new Datamap({
          element: document.getElementById('mapTwo'), 
          scope:'usa',
          width: 800,
          height: 470,
           fills: {
          defaultFill: '#9D7274'
           },
           geographyConfig:{
            popupOnHover: false, 
            highlightOnHover: false,
           }
    });



$('.compareOption').hide();

$('.ageButton').click(function(e){
  $('.ageButton').fadeOut( "slow" )
  $('.raceButton').fadeOut( "slow",function(e){
    $('.ageOption').fadeIn( "slow" );   
  } )

});


$(".raceButton").click(function(e){
  $('.ageButton').fadeOut( "slow" )
  $('.raceButton').fadeOut( "slow",function(e){
    $('.raceOption').fadeIn( "slow" );   
  } )
});
  

$('#raceOption').change(function(){
   var x = $(this).val()
    compareStates(x)}).change()

$('#ageOption').change(function(){
   var x = $(this).val()
   compareStates(x)}).change()


//needs cleaner transitions
$(".backButton").click(function(e){
  $('.compareOption').fadeOut(2000,function(e){
    $('.ageButton').fadeIn( 3000 )
    $('.raceButton').fadeIn( 3000 )    
  })
})



var legendRectSize = 20;
//takes in the value of current radio, makes a request to my database
function compareStates(columnName){

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


     d3.selectAll("#mapTwo").selectAll('.datamaps-subunit')
          //use a keyfunction to match the map to the data
          .data(columnData, findId)
          .attr('style', function(d){
            if(!d.val){return 'fill: #E3DFBB'}
            return 'fill:' + colors(d.val );
          })     

      var svg = d3.select('#mapTwo svg');
      svg.append('g').attr('class', 'legendLinear').attr('transform', 'translate(230,0)')

      var legendLinear = d3.legend.color().shapeWidth(50).orient('horizontal').scale(colors);
      svg.select('.legendLinear').call(legendLinear)



    });

}




});

