const rectWaveCanvas = document.getElementById("rectWave");
const rectWaveCanvasContext = rectWaveCanvas.getContext("2d");
const minWidth = 300;
const minHeight = 300;

const rectWaveConfig = {
  innerRect: {
    fillStyle: "#000",
  },

  outerRect: {
    lineWidth: 30,
    lineJoin: "round",
    strokeStyle: "#7ab3f7",
  },

  wave: {
    totalWaves: 3,
    totalPoints: 6,
    color: ["rgba(0,199,235,0.4)", "rgba(0,146,199,0.4)", "rgba(0,87,158,0.4)"],
    data: 70,
  },
};

const buildInnerRect = (canvasWidth, canvasHeight, config) => {
  const { innerRect } = config;

  rectWaveCanvasContext.fillStyle = innerRect.fillStyle;
  rectWaveCanvasContext.fillRect(
    canvasWidth * 0.2,
    canvasHeight * 0.2,
    canvasWidth * 0.6,
    canvasHeight * 0.6
  );
};

const buildOuterRect = (canvasWidth, canvasHeight, config) => {
  const { outerRect } = config;

  rectWaveCanvasContext.beginPath();
  rectWaveCanvasContext.lineWidth = outerRect.lineWidth;
  rectWaveCanvasContext.lineJoin = outerRect.lineJoin;
  rectWaveCanvasContext.strokeStyle = outerRect.strokeStyle;
  rectWaveCanvasContext.strokeRect(
    canvasWidth * 0.2,
    canvasHeight * 0.2,
    canvasWidth * 0.6,
    canvasHeight * 0.6
  );
  rectWaveCanvasContext.stroke();
};

const animate = (canvas, width, height, config) => {
  canvas.width = Math.max(width, minWidth);
  canvas.height = Math.max(height, minHeight);
  buildInnerRect(rectWaveCanvas.width, rectWaveCanvas.height, config);
  buildOuterRect(rectWaveCanvas.width, rectWaveCanvas.height, config);
};

const init = () => {
  const initialCanvasWidth = window.innerWidth;
  const initialCanvasHeight = window.innerHeight;
  animate(
    rectWaveCanvas,
    initialCanvasWidth,
    initialCanvasHeight,
    rectWaveConfig
  );
};

init();

window.addEventListener("resize", () => {
  const newCanvasWidth = window.innerWidth;
  const newCanvasHeight = window.innerHeight;
  animate(rectWaveCanvas, newCanvasWidth, newCanvasHeight, rectWaveConfig);
});
