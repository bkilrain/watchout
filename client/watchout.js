// start slingin' some d3 here.
var data = [{ 'x': 198, 'y': 245 }, { 'x': 44, 'y': 174 }, { 'x': 470, 'y': 325 }, { 'x': 458, 'y': 42 }, { 'x': 51, 'y': 162 }];
var asteroids = d3.select('svg').selectAll('image');

var getData = function(n) {
  var result = [];
  for (var i = 0; i < n; i++) {
    result.push({i: i, x: Math.floor(Math.random() * 450), y: Math.floor(Math.random() * 350)});
  }
  return result;
};
var getData1 = getData(10);
var getData2 = getData(5);


var t = d3.transition().duration(5000);//.ease(d3.easeLinear);
asteroids.data(getData1, function (d) { return d.i; }).enter().append('image').attr('class', 'update').attr('xlink:href', './asteroid.png').attr('x', function(d) { return d.x; }).attr('y', function(d) { return d.y; }).attr('height', '50px').attr('width', '50px');
// d3.select('svg').selectAll('circle').data(data).enter().append('circle').attr('cx', function(d) { return d.x; }).attr('cy', function(d) { return d.y; }).attr('height', '50px').attr('width', '50px');

setInterval(function () { d3.selectAll('.update').data(getData(10)).transition().duration(1000).attr('x', function(d) { return d.x; }).attr('y', function(d) { return d.y; }); }, 1000);

//asteroids.data(getData(5)).enter().append('image').style('x', function(d) { return d.x; }).style('y', function(d) { return d.y; });


// d3.select('svg').selectAll('circle').interval(function (d) {
//   var randx = Math.floor(Math.random() * 500);
//   var randy = Math.floor(Math.random() * 400);

//   this.attr('x', randx).attr('y', randy);

// }, 1000)