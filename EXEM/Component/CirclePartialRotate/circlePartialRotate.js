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
    angleStart: 0.85,
    angleEnd: 2,
    firstLineWidth: 50,
    firstStrokeStyle: "purple",
    secondLineWidth: 100,
    secondStrokeStyle: "white",
  },

  innerCircle: {
    radius: 110,
    angleStart: 0,
    angleEnd: 2 * Math.PI,
    fillStyle: "#DDDDDD",
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
  const { center, middleCircle } = config;

  circlePartialRotateCanvasContext.beginPath();
  circlePartialRotateCanvasContext.arc(
    center.x,
    center.y,
    middleCircle.radius,
    middleCircle.angleStart * Math.PI,
    middleCircle.angleEnd * Math.PI,
    false
  );

  const gradient = circlePartialRotateCanvasContext.createLinearGradient(
    center.x - middleCircle.radius,
    center.y,
    center.x + middleCircle.radius,
    center.y
  );

  gradient.addColorStop(0, "rgba(128, 0, 128, 1)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  circlePartialRotateCanvasContext.strokeStyle = gradient;
  circlePartialRotateCanvasContext.lineWidth = middleCircle.firstLineWidth;
  circlePartialRotateCanvasContext.stroke();

  middleCircle.angleStart += 0.01;
  middleCircle.angleEnd += 0.01;

  circlePartialRotateCanvasContext.globalCompositeOperation = "destination-in";
  circlePartialRotateCanvasContext.lineWidth = middleCircle.secondLineWidth;
  circlePartialRotateCanvasContext.stroke();
  circlePartialRotateCanvasContext.globalCompositeOperation = "source-over";
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
  buildMiddleCircle(circlePartialRotateConfig);
  buildOuterCircle(circlePartialRotateConfig);
  buildInnerCircle(circlePartialRotateConfig);
  requestAnimationFrame(render);
}

requestAnimationFrame(render);
