
$(document).ready(function(){ 
//not sure how this was appeneded to the layout    
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
    graph1(clickedState)

});


//gives back the data i need for the first
function graph1(clickedState){
  d3.json('v1/table_1.2', function(data){
    var arr = []
    var stateData = data.filter(val =>{
          return val['US_State'] === clickedState;
    })[0]
    arr.push(parseInt(stateData.NoB_15_19.replace(/,|_|\[.*\]/g,'')), parseInt(stateData.NoA_15_19.replace(/,|_|\[.*\]/g,'')), parseInt(stateData.NoF_15_19.replace(/,|_|\[.*\]/g,'')) )    
    console.log(arr)
    return(arr)
  })
}




});