const circleWaveCanvas = document.getElementById("circleWave");
const circleWaveCanvasContext = circleWaveCanvas.getContext("2d");
const minWidth = 300;
const minHeight = 300;

const circleWaveConfig = {
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

  circleWaveCanvasContext.fillStyle = innerCircle.fillStyle;
  circleWaveCanvasContext.beginPath();
  circleWaveCanvasContext.arc(
    canvasWidth / 2,
    canvasHeight / 2,
    canvasWidth * 0.25,
    0,
    2 * Math.PI
  );
  circleWaveCanvasContext.fill();
};

const buildOuterCircle = (canvasWidth, canvasHeight, config) => {
  const { outerCircle } = config;

  circleWaveCanvasContext.beginPath();
  circleWaveCanvasContext.lineWidth = outerCircle.lineWidth;
  circleWaveCanvasContext.strokeStyle = outerCircle.strokeStyle;
  circleWaveCanvasContext.arc(
    canvasWidth / 2,
    canvasHeight / 2,
    canvasWidth * 0.25,
    0,
    2 * Math.PI
  );
  circleWaveCanvasContext.stroke();
};

const animate = (canvas, width, height, config) => {
  canvas.width = Math.max(width, minWidth);
  canvas.height = Math.max(height, minHeight);
  buildInnerCircle(circleWaveCanvas.width, circleWaveCanvas.height, config);
  buildOuterCircle(circleWaveCanvas.width, circleWaveCanvas.height, config);
};

const init = () => {
  const initialCanvasWidth = window.innerWidth;
  const initialCanvasHeight = window.innerHeight;
  animate(
    circleWaveCanvas,
    initialCanvasWidth,
    initialCanvasHeight,
    circleWaveConfig
  );
};

init();

window.addEventListener("resize", () => {
  const newCanvasWidth = window.innerWidth;
  const newCanvasHeight = window.innerHeight;
  animate(circleWaveCanvas, newCanvasWidth, newCanvasHeight, circleWaveConfig);
});
