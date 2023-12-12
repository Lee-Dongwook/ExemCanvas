const circleReactiveCanvas = document.getElementById("circleReactive");
const circleReactiveCanvasContext = circleReactiveCanvas.getContext("2d");
const minWidth = 300;
const minHeight = 300;

const circleReactiveConfig = {
  rotateCircle: {
    radius: 280,
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

const circleRotateCanvas = document.getElementById("circleRotateReactive");
const circleRotateCanvasContext = circleRotateCanvas.getContext("2d");
const circleRotateCanvasWidth = circleRotateCanvas.width;
const circleRotateCanvasHeight = circleRotateCanvas.height;

const buildRotateOuterCircle = (config, rotateAngle) => {
  const { center, rotateCircle } = config;

  circleRotateCanvasContext.beginPath();
  circleRotateCanvasContext.arc(
    center.x,
    center.y,
    rotateCircle.radius,
    rotateCircle.angleStart + rotateAngle,
    rotateCircle.angleEnd + rotateAngle,
    false
  );
  circleRotateCanvasContext.lineWidth = rotateCircle.lineWidth;
  circleRotateCanvasContext.strokeStyle = rotateCircle.strokeStyle;
  circleRotateCanvasContext.stroke();
};

let rotate = 0;
function loop() {
  circleRotateCanvasContext.clearRect(
    0,
    0,
    circleRotateCanvasWidth,
    circleRotateCanvasHeight
  );
  circleRotateCanvasContext.translate(
    circleReactiveConfig.center.x,
    circleReactiveConfig.center.y
  );
  rotate++;
  circleRotateCanvasContext.setLineDash([1, 135]);
  circleRotateCanvasContext.setTransform(1, 0, 0, 1, 0, 0);

  buildRotateOuterCircle(circleReactiveConfig, (rotate * Math.PI) / 180);

  requestAnimationFrame(loop);
}

const animate = (canvas, width, height, config) => {
  canvas.width = Math.max(width, minWidth);
  canvas.height = Math.max(height, minHeight);
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
};

const init = () => {
  const initialCanvasWidth = window.innerWidth;
  const initialCanvasHeight = window.innerHeight;
  animate(
    circleReactiveCanvas,
    initialCanvasWidth,
    initialCanvasHeight,
    circleReactiveConfig
  );
};

init();

window.addEventListener("resize", () => {
  const newCanvasWidth = window.innerWidth;
  const newCanvasHeight = window.innerHeight;
  animate(
    circleReactiveCanvas,
    newCanvasWidth,
    newCanvasHeight,
    circleReactiveConfig
  );
});
