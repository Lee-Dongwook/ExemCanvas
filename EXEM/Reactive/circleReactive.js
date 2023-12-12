const circleReactiveCanvas = document.getElementById("circleReactive");
const circleReactiveCanvasContext = circleReactiveCanvas.getContext("2d");
const circleRotateReactiveCanvas = document.getElementById(
  "circleRotateReactive"
);
const circleRotateReactiveCanvasContext =
  circleRotateReactiveCanvas.getContext("2d");

const minWidth = 300;
const minHeight = 300;

let rotate = 0;

const circleReactiveConfig = {
  rotateCircle: {
    angleStart: 0,
    angleEnd: 2 * Math.PI,
    lineWidth: 15,
    strokeStyle: "skyblue",
  },
  innerCircle: {
    fillStyle: "#000",
  },

  outerCircle: {
    lineWidth: 30,
    strokeStyle: "#7ab3f7",
  },
};

const buildInnerCircle = (canvasWidth, canvasHeight, config) => {
  const { innerCircle } = config;

  circleReactiveCanvasContext.fillStyle = innerCircle.fillStyle;
  circleReactiveCanvasContext.beginPath();
  circleReactiveCanvasContext.arc(
    canvasWidth / 2,
    canvasHeight / 2,
    canvasWidth * 0.25,
    0,
    2 * Math.PI
  );
  circleReactiveCanvasContext.fill();
};

const buildOuterCircle = (canvasWidth, canvasHeight, config) => {
  const { outerCircle } = config;

  circleReactiveCanvasContext.beginPath();
  circleReactiveCanvasContext.lineWidth = outerCircle.lineWidth;
  circleReactiveCanvasContext.strokeStyle = outerCircle.strokeStyle;
  circleReactiveCanvasContext.arc(
    canvasWidth / 2,
    canvasHeight / 2,
    canvasWidth * 0.25,
    0,
    2 * Math.PI
  );
  circleReactiveCanvasContext.stroke();
};

const buildRotateOuterCircle = (
  canvasWidth,
  canvasHeight,
  rotateAngle,
  config
) => {
  const { rotateCircle } = config;

  circleRotateReactiveCanvasContext.beginPath();
  circleRotateReactiveCanvasContext.arc(
    canvasWidth / 2,
    canvasHeight / 2,
    canvasWidth * 0.3,
    rotateCircle.angleStart + rotateAngle,
    rotateCircle.angleEnd + rotateAngle,
    false
  );

  circleRotateReactiveCanvasContext.lineWidth = rotateCircle.lineWidth;
  circleRotateReactiveCanvasContext.strokeStyle = rotateCircle.strokeStyle;
  circleRotateReactiveCanvasContext.stroke();
};

const animate = (canvas, rotateCanvas, width, height, config, rotateAngle) => {
  canvas.width = Math.max(width, minWidth);
  canvas.height = Math.max(height, minHeight);

  rotateCanvas.width = Math.max(width, minWidth);
  rotateCanvas.height = Math.max(height, minHeight);

  buildInnerCircle(
    circleReactiveCanvas.width,
    circleReactiveCanvas.height,
    config
  );
  buildOuterCircle(
    circleReactiveCanvas.width,
    circleReactiveCanvas.height,
    config
  );

  circleRotateReactiveCanvasContext.clearRect(
    0,
    0,
    circleRotateReactiveCanvas.width,
    circleRotateReactiveCanvas.height
  );
  rotate++;
  circleRotateReactiveCanvasContext.setLineDash([
    1,
    (circleRotateReactiveCanvas.width / 560) * 81,
  ]);
  circleRotateReactiveCanvasContext.setTransform(1, 0, 0, 1, 0, 0);
  buildRotateOuterCircle(
    circleRotateReactiveCanvas.width,
    circleRotateReactiveCanvas.height,
    rotateAngle,
    config
  );
};

const init = () => {
  const initialCanvasWidth = window.innerWidth;
  const initialCanvasHeight = window.innerHeight;
  animate(
    circleReactiveCanvas,
    circleRotateReactiveCanvas,
    initialCanvasWidth,
    initialCanvasHeight,
    circleReactiveConfig,
    0
  );
};

init();

window.addEventListener("resize", () => {
  const newCanvasWidth = window.innerWidth;
  const newCanvasHeight = window.innerHeight;
  animate(
    circleReactiveCanvas,
    circleRotateReactiveCanvas,
    newCanvasWidth,
    newCanvasHeight,
    circleReactiveConfig,
    (rotate * Math.PI) / 180
  );
});
