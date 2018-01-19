
var radius = document.getElementById('radius').value
// set radius
document.getElementById('radius').onchange = function(){
    radius = this.value
    mainCircle.attr('r', radius)
}
// svg body margins
var margin = {
    left:30,
    right:30,
    top:10,
    bottom:10
};

var width = 800-margin.left-margin.right;
var height = 500-margin.top-margin.bottom;

// scales
var yAxis = d3.scaleLinear()
    .range([0, height])
    .domain([height/2, -height/2])

var xAxis = d3.scaleLinear()
    .range([0, width])
    .domain([-width/2, width/2])

var xAxisRev = d3.scaleLinear()
    .range([0, -width])
    .domain([width/2, -width/2])

var body = d3.select('body')
var svg = body.append('svg')
    .attr('id', 'mySVG')
    .attr('width', width+margin.left+margin.right)// svg gets full width and height
    .attr('height', height+margin.top+margin.bottom)

var chart = svg
    .append('g')// this group to contain bars shifted by margins
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')

// adding axes 
var axisGroup = d3.select('#mySVG')
    .append('g')// this group to contain axes shifted by margins
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

axisGroup.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0, '+height/2+')')
    .call(d3.axisBottom(xAxis))

axisGroup.append('g')
    .attr('class', 'y axis')
    .attr('transform', 'translate('+width/2+', 0)')
    .call(d3.axisLeft(yAxis));

var mainCircle = chart
    .append('circle')
    .attr('class', 'mainCircle')
    .attr('cx', xAxis(0))
    .attr('cy', yAxis(0))
    .attr('r', radius)

var pointFrom = {
    x: -100,
    y: 100
}

document.getElementById('x').textContent = pointFrom.x
document.getElementById('y').textContent = pointFrom.y

var lengthFromPoint = Math.sqrt((pointFrom.x*pointFrom.x) + (pointFrom.y*pointFrom.y))
var radiusSecondCircle = Math.sqrt((lengthFromPoint*lengthFromPoint) - (radius*radius))
var d = lengthFromPoint
var l = ((radius*radius) - (radiusSecondCircle*radiusSecondCircle) + (d*d))/(2*d)
var h = Math.sqrt((radius*radius) - (l*l))
var foundPoint1 = {
    x: (l/d)*(pointFrom.x) + (h/d)*(pointFrom.y),
    y: (l/d)*(pointFrom.y) - (h/d)*(pointFrom.x)
}
foundPoint1.x = (2*foundPoint1.x)-pointFrom.x
foundPoint1.y = (2*foundPoint1.y)-pointFrom.y
var foundPoint2 = {
    x: (l/d)*(pointFrom.x) - (h/d)*(pointFrom.y),
    y: (l/d)*(pointFrom.y) + (h/d)*(pointFrom.x)
}
foundPoint2.x = (2*foundPoint2.x)-pointFrom.x
foundPoint2.y = (2*foundPoint2.y)-pointFrom.y

//eqn1
var m1 = (foundPoint1.y-pointFrom.y)/(foundPoint1.x-pointFrom.x)
var yInt1 = pointFrom.y - (m1*pointFrom.x)
var eqn1 = 'Y = '+m1.toFixed(2)+'X + '+yInt1.toFixed(2)
if((m1===Infinity) || (m1 === -Infinity)){
    eqn1 = 'X = ' + pointFrom.x.toFixed(2)
}
document.getElementById('eqn1').textContent = eqn1
//eqn2
var m2 = (foundPoint2.y-pointFrom.y)/(foundPoint2.x-pointFrom.x)
var yInt2 = pointFrom.y - (m2*pointFrom.x)
var eqn2 = 'Y = '+m2.toFixed(2)+'X + '+yInt2.toFixed(2)
if((m2===Infinity) || (m2===-Infinity)){
    eqn2 = 'X = ' + pointFrom.x.toFixed(2)
}
document.getElementById('eqn2').textContent = eqn2

var testTan = chart
    .append('line')
    .attr('class', 'tan1')
    .attr('x1', xAxis(pointFrom.x))
    .attr('y1', yAxis(pointFrom.y))
    .attr('x2', xAxis(foundPoint1.x))
    .attr('y2', yAxis(foundPoint1.y))

var testTan2 = chart
    .append('line')
    .attr('class', 'tan2')
    .attr('x1', xAxis(pointFrom.x))
    .attr('y1', yAxis(pointFrom.y))
    .attr('x2', xAxis(foundPoint2.x))
    .attr('y2', yAxis(foundPoint2.y))

svg.on('mousemove', function(){
    var point = d3.mouse(this)
    point[0] = point[0] - margin.left
    point[1] = point[1] - margin.top
    pointFrom = {
        x: Math.round(xAxisRev(point[0])),
        y: Math.round(yAxis(point[1]))
    }
    document.getElementById('x').textContent = pointFrom.x
    document.getElementById('y').textContent = pointFrom.y
    lengthFromPoint = Math.sqrt((pointFrom.x*pointFrom.x) + (pointFrom.y*pointFrom.y))
    if(lengthFromPoint< radius){
        return
    }

    radiusSecondCircle = Math.sqrt((lengthFromPoint*lengthFromPoint) - (radius*radius))
    var d = lengthFromPoint
    var l = ((radius*radius) - (radiusSecondCircle*radiusSecondCircle) + (d*d))/(2*d)
    var h = Math.sqrt((radius*radius) - (l*l))
    var foundPoint1 = {
        x: (l/d)*(pointFrom.x) + (h/d)*(pointFrom.y),
        y: (l/d)*(pointFrom.y) - (h/d)*(pointFrom.x)
    }
    foundPoint1.x = (2*foundPoint1.x)-pointFrom.x
    foundPoint1.y = (2*foundPoint1.y)-pointFrom.y   
    var foundPoint2 = {
        x: (l/d)*(pointFrom.x) - (h/d)*(pointFrom.y),
        y: (l/d)*(pointFrom.y) + (h/d)*(pointFrom.x)
    }
    foundPoint2.x = (2*foundPoint2.x)-pointFrom.x
    foundPoint2.y = (2*foundPoint2.y)-pointFrom.y
    
    //eqn1
    var m1 = (foundPoint1.y-pointFrom.y)/(foundPoint1.x-pointFrom.x)
    var yInt1 = pointFrom.y - (m1*pointFrom.x)
    var eqn1 = 'Y = '+m1.toFixed(2)+'X + '+yInt1.toFixed(2)
    if((m1===Infinity) || (m1 === -Infinity)){
        eqn1 = 'X = ' + pointFrom.x.toFixed(2)
    }
    document.getElementById('eqn1').textContent = eqn1
    
    //eqn2
    var m2 = (foundPoint2.y-pointFrom.y)/(foundPoint2.x-pointFrom.x)
    var yInt2 = pointFrom.y - (m2*pointFrom.x)
    var eqn2 = 'Y = '+m2.toFixed(2)+'X + '+yInt2.toFixed(2)
    if((m2===Infinity) || (m2===-Infinity)){
        eqn2 = 'X = ' + pointFrom.x.toFixed(2)
    }
    document.getElementById('eqn2').textContent = eqn2

    testTan
        .attr('x1', xAxis(pointFrom.x))
        .attr('y1', yAxis(pointFrom.y))
        .attr('x2', xAxis(foundPoint1.x))
        .attr('y2', yAxis(foundPoint1.y))
    
    testTan2
        .attr('x1', xAxis(pointFrom.x))
        .attr('y1', yAxis(pointFrom.y))
        .attr('x2', xAxis(foundPoint2.x))
        .attr('y2', yAxis(foundPoint2.y))
})