var map = document.getElementById("circlePartialRotate");
var context = map.getContext("2d");

map_Obj = {
  size: 400,
  left: '50%',
  bgColor: 'white'
}
canvasLine = {
  start: 0,
  end: 400,
  width: 1,
  color: "#2E7D32"
}

map.width = map_Obj.size;
map.height = map_Obj.size;
map.style.width = map_Obj.size + 'px';
map.style.height = map_Obj.size + 'px';
map.style.left = map_Obj.left;

var x = map_Obj.size / 2;
var y = map_Obj.size / 2;
var radius = 100;
var startAngle = 0.00 * Math.PI;
var endAngle = 0.02 * Math.PI;
var counterClockwise = false;

var startAngle2 = 0.00;
var endAngle2 = 0.00;
var timeStart = 0;
var timeEnd = 200;
var timer = setInterval(function() {
    if (timeStart == timeEnd) {	
        text.innerHTML = '100%';
        clearInterval(timer);
    } else {
        context.beginPath();
        context.arc(x, y, radius, startAngle2 * Math.PI, endAngle2 * Math.PI, counterClockwise);
        context.lineWidth = 15;
        context.strokeStyle = "purple";
        context.stroke();
        timeStart++;
        endAngle2 =  endAngle2 + 0.01;
        startAngle2 = startAngle2 + 0.02;
        timeStart--;
        context.beginPath();
        context.arc(x,y,radius, startAngle2 * Math.PI , endAngle2 * Math.PI, counterClockwise);
        context.lineWidth = 17;
        context.strokeStyle = "white";
        context.stroke();
    }
}, 15);
