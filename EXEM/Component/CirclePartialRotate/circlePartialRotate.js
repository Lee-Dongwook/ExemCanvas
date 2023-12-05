const circlePartialRotateCanvas = document.getElementById(
  "circlePartialRotate"
);
const circlePartialRotateCanvasContext =
  circlePartialRotateCanvas.getContext("2d");
const circlePartialRotateCanvasWidth = circlePartialRotateCanvas.width;
const circlePartialRotateCanvasHeight = circlePartialRotateCanvas.height;

const circlePartialRotateConfig = {
  center: {
    x: 300,
    y: 300,
  },

  outerCircle: {
    radius: 180,
    angleStart: 0,
    angleEnd: 2 * Math.PI,
    lineWidth: 20,
    strokeStyle: "#DDDDDD",
  },

  middleCircle: {
    radius: 140,
    angleStart: 0,
    angleEnd: 1,
    firstLineWidth: 50,
    firstStrokeStyle: "purple",
    secondLineWidth: 50,
    secondStrokeStyle: "white",
  },

  innerCircle: {
    radius: 110,
    angleStart: 0,
    angleEnd: 2 * Math.PI,
    fillStyle: "#DDDDDD",
  },

  timer: {
    startTime: 0,
    endTime: 200,
  },
};

const buildInnerCircle = (config) => {
  const { center, innerCircle } = config;

  circlePartialRotateCanvasContext.beginPath();
  circlePartialRotateCanvasContext.arc(
    center.x,
    center.y,
    innerCircle.radius,
    innerCircle.angleStart,
    innerCircle.angleEnd,
    false
  );
  circlePartialRotateCanvasContext.fillStyle = innerCircle.fillStyle;
  circlePartialRotateCanvasContext.fill();
};

const buildMiddleCircle = (config) => {
  const { center, middleCircle, timer } = config;

  circlePartialRotateCanvasContext.beginPath();
  circlePartialRotateCanvasContext.arc(
    center.x,
    center.y,
    middleCircle.radius,
    middleCircle.angleStart * Math.PI,
    middleCircle.angleEnd * Math.PI,
    false
  );
  circlePartialRotateCanvasContext.lineWidth = middleCircle.firstLineWidth;
  circlePartialRotateCanvasContext.strokeStyle = middleCircle.firstStrokeStyle;
  circlePartialRotateCanvasContext.stroke();
  timer.startTime++;
  middleCircle.angleStart += 0.02;
  middleCircle.angleEnd += 0.02;
  timer.startTime--;
  circlePartialRotateCanvasContext.beginPath();
  circlePartialRotateCanvasContext.arc(
    center.x,
    center.y,
    middleCircle.radius,
    middleCircle.angleStart * Math.PI,
    middleCircle.angleEnd * Math.PI,
    false
  );
  circlePartialRotateCanvasContext.lineWidth = middleCircle.secondLineWidth;
  circlePartialRotateCanvasContext.strokeStyle = middleCircle.secondStrokeStyle;
  circlePartialRotateCanvasContext.stroke();
};

const buildOuterCircle = (config) => {
  const { center, outerCircle } = config;

  circlePartialRotateCanvasContext.beginPath();
  circlePartialRotateCanvasContext.arc(
    center.x,
    center.y,
    outerCircle.radius,
    outerCircle.angleStart,
    outerCircle.angleEnd,
    false
  );
  circlePartialRotateCanvasContext.lineWidth = outerCircle.lineWidth;
  circlePartialRotateCanvasContext.strokeStyle = outerCircle.strokeStyle;
  circlePartialRotateCanvasContext.stroke();
};

function render() {
  buildOuterCircle(circlePartialRotateConfig);
  buildInnerCircle(circlePartialRotateConfig);
  buildMiddleCircle(circlePartialRotateConfig);
  requestAnimationFrame(render);
}

requestAnimationFrame(render);
