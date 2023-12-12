const rectReactiveCanvas = document.getElementById("rectReactive");
const rectReactiveCanvasContext = rectReactiveCanvas.getContext("2d");
const minWidth = 300;
const minHeight = 300;

const rectReactiveConfig = {
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

  rectReactiveCanvasContext.fillStyle = innerRect.fillStyle;
  rectReactiveCanvasContext.fillRect(
    canvasWidth * 0.2,
    canvasHeight * 0.2,
    canvasWidth * 0.6,
    canvasHeight * 0.6
  );
};

const buildOuterRect = (canvasWidth, canvasHeight, config) => {
  const { outerRect } = config;

  rectReactiveCanvasContext.beginPath();
  rectReactiveCanvasContext.lineWidth = outerRect.lineWidth;
  rectReactiveCanvasContext.lineJoin = outerRect.lineJoin;
  rectReactiveCanvasContext.strokeStyle = outerRect.strokeStyle;
  rectReactiveCanvasContext.strokeRect(
    canvasWidth * 0.2,
    canvasHeight * 0.2,
    canvasWidth * 0.6,
    canvasHeight * 0.6
  );
  rectReactiveCanvasContext.stroke();
};

const animate = (canvas, width, height, config) => {
  canvas.width = Math.max(width, minWidth);
  canvas.height = Math.max(height, minHeight);
  buildInnerRect(rectReactiveCanvas.width, rectReactiveCanvas.height, config);
  buildOuterRect(rectReactiveCanvas.width, rectReactiveCanvas.height, config);
};

const init = () => {
  const initialCanvasWidth = window.innerWidth;
  const initialCanvasHeight = window.innerHeight;
  animate(
    rectReactiveCanvas,
    initialCanvasWidth,
    initialCanvasHeight,
    rectReactiveConfig
  );
};

init();

window.addEventListener("resize", () => {
  const newCanvasWidth = window.innerWidth;
  const newCanvasHeight = window.innerHeight;
  animate(
    rectReactiveCanvas,
    newCanvasWidth,
    newCanvasHeight,
    rectReactiveConfig
  );
});
