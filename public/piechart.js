  var data = [20, 50, 80];
  var r = 150;

  var color = d3.scale.ordinal()
    .range(['red', 'blue', 'green']);

  var canvas = d3.select('body').append('svg')
    .attr('width', 300)
    .attr('height', 300);

  var group = canvas.append('g')
    .attr('transform', 'translate(150,150)')

  var arc = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(r);

  var pie = d3.layout.pie()
    .value(function(d){return d;})

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
    .attr('font-size', '1.5em')
    .text(function(d){return d.data})

