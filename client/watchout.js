var boxWidth = 500;
var boxHeight = 400;

var box = d3.select('body')
              .append('svg')
              .attr('class', 'box')
              .attr('width', boxWidth)
              .attr('height', boxHeight);

var dragFunc = function() { 
  player.attr('cx', function () {
    if (d3.event.x > boxWidth - 25) {
      return boxWidth - 25;
    } else if (d3.event.x < 25) {
      return 25;
    } else {
      return d3.event.x;
    }
  }).attr('cy', function () {
    if (d3.event.y > boxHeight - 25) {
      return boxHeight - 25;
    } else if (d3.event.y < 25) {
      return 25;
    } else {
      return d3.event.y;
    }
  }); 
};

var drag = d3.behavior.drag()
             .on('drag', dragFunc);

var player = box.selectAll('.player')
                .data([{ x: (boxWidth / 2), y: (boxHeight / 2), r: 25 }])
                .enter()
                .append('svg:circle')
                .attr('class', 'player')
                .attr('cx', function(d) { return d.x; })
                .attr('cy', function(d) { return d.y; })
                .attr('r', function(d) { return d.r; })
                .call(drag)
                .style('fill', 'black');

var asteroids = d3
  .select('svg')
  .selectAll('.enemy');

var getData = function(n) {
  var result = [];
  for (var i = 0; i < n; i++) {
    result.push({i: i, x: Math.floor(Math.random() * 450), y: Math.floor(Math.random() * 350)});
  }
  return result;
};



asteroids
  .data(getData(10), function (d) { return d.i; })
  .enter()
  .append('image')
  .attr('class', 'enemy')
  .attr('xlink:href', './shuriken.png')
  .attr('x', function(d) { return d.x; })
  .attr('y', function(d) { return d.y; })
  .attr('height', '50px')
  .attr('width', '50px')
  .style('transform-origin', function(d) { return '' + (d.x + 25) + 'px ' + (d.y + 25) + 'px'; });

var isCollision = false;
var collision = d3.dispatch('collideEvent');
var count = 0;
var score = 0;
var highScore = 0;
collision.on('collideEvent', function() {
  isCollision = true;
  count++;
  score = 0;
  d3.select('.collisions').select('span').text(count);
  player.style('fill', 'red');
  player.transition().duration(2000).style('fill', 'black');
  setTimeout(function() { 
    isCollision = false; 
  }, 2000);
});

var detectCollision = function () {
  var asteroidPositions = [];
  var cxs = d3.select('svg').selectAll('.enemy').each(function() {
    asteroidPositions.push([d3.select(this).attr('x'), d3.select(this).attr('y')]);
  });
  var playerPosition = [player.attr('cx'), player.attr('cy')];
  for (var i = 0; i < asteroidPositions.length; i++) {
    if (Math.sqrt(Math.pow(playerPosition[0] - (asteroidPositions[i][0] + 25), 2) + Math.pow(playerPosition[1] - (asteroidPositions[i][1] + 25), 2)) < 50 && !isCollision) {
      collision.collideEvent();
    }
  }
};



setInterval(function () {
  d3
    .selectAll('.enemy')
    .data(getData(10))
    .transition()
    .duration(1000)
    .attr('x', function(d) { return d.x; })
    .attr('y', function(d) { return d.y; })
    .style('transform-origin', function(d) { return '' + (d.x + 25) + 'px ' + (d.y + 25) + 'px'; });

  score++;
  highScore = score > highScore ? score : highScore;
  d3.select('.current').select('span').text(score);
  d3.select('.highscore').select('span').text(highScore);
}, 1000);
  

var startCheckingCollissions = setInterval(detectCollision, 1);






