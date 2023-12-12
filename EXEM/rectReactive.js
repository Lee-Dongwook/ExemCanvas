const rectWaveCanvas = document.getElementById("rectWave");
const rectWaveCanvasContext = rectWaveCanvas.getContext("2d");
const minWidth = 300;
const minHeight = 300;

const rectWaveConfig = {
  center: {
    x: 0,
    y: 0,
  },

  outerRect: {
    width: 500,
    height: 500,
    radius: 10,
    lineWidth: 30,
    lineJoin: "round",
    strokeStyle: "#7ab3f7",
  },

  innerRect: {
    width: 500,
    height: 500,
    radius: 10,
    fillStyle: "#000",
  },

  wave: {
    data: 70,
  },
};

const buildInnerRect = (canvasWidth, canvasHeight) => {
  rectWaveCanvasContext.fillStyle = "#000";
  rectWaveCanvasContext.fillRect(
    canvasWidth * 0.2,
    canvasHeight * 0.2,
    canvasWidth * 0.6,
    canvasHeight * 0.6
  );
};

const buildOuterRect = (canvasWidth, canvasHeight) => {
  rectWaveCanvasContext.beginPath();
  rectWaveCanvasContext.lineWidth = 30;
  rectWaveCanvasContext.lineJoin = "round";
  rectWaveCanvasContext.strokeStyle = "#7ab3f7";
  rectWaveCanvasContext.strokeRect(
    canvasWidth * 0.2,
    canvasHeight * 0.2,
    canvasWidth * 0.6,
    canvasHeight * 0.6
  );
  rectWaveCanvasContext.stroke();
};

class Point {
  constructor(index, x, y) {
    this.x = x;
    this.y = y;
    this.fixedY = y;
    this.speed = 0.02 * (rectWaveConfig.wave.data / 10);
    this.cur = index;
  }

  update() {
    this.cur += this.speed;
    this.y = this.fixedY + Math.sin(this.cur) * 45;
  }
}

class Wave {
  constructor(index, totalPoints, color) {
    this.index = index;
    this.totalPoints = totalPoints;
    this.color = color;
    this.points = [];
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.centerX = stageWidth / 2;
    this.centerY = stageHeight;
    this.pointGap = this.stageWidth / (this.totalPoints - 1);
    this.init();
  }

  init() {
    this.points = [];
    for (let i = 0; i < this.totalPoints; i++) {
      const point = new Point(
        this.index + i,
        this.pointGap * i,
        this.centerY - rectWaveConfig.wave.data * 4.5
      );
      this.points[i] = point;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;

    let prevX = this.points[0].x;
    let prevY = this.points[0].y;

    ctx.moveTo(prevX, prevY);

    for (let i = 1; i < this.totalPoints; i++) {
      if (i < this.totalPoints - 1) {
        this.points[i].update();
      }

      const cx = (prevX + this.points[i].x) / 2;
      const cy = (prevY + this.points[i].y) / 2;

      ctx.quadraticCurveTo(prevX, prevY, cx, cy);

      prevX = this.points[i].x;
      prevY = this.points[i].y;
    }

    ctx.lineTo(prevX, prevY);
    ctx.lineTo(this.stageWidth, this.stageHeight);
    ctx.lineTo(this.points[0].x, this.stageHeight);
    ctx.fill();
    ctx.closePath();
  }
}

class WaveGroup {
  constructor() {
    this.totalWaves = 3;
    this.totalPoints = 6;
    this.color = [
      "rgba(0,199,235,0.4)",
      "rgba(0,146,199,0.4)",
      "rgba(0,87,158,0.4)",
    ];
    this.waves = [];

    for (let i = 0; i < this.totalWaves; i++) {
      const wave = new Wave(i, this.totalPoints, this.color[i]);
      this.waves[i] = wave;
    }
  }

  resize(stageWidth, stageHeight) {
    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i];
      wave.resize(stageWidth, stageHeight);
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i];
      wave.draw(ctx);
    }
  }
}

const adjustCanvasSizeAndBuild = (canvas, width, height) => {
  canvas.width = Math.max(width, minWidth);
  canvas.height = Math.max(height, minHeight);
};

const build = (canvasWidth, canvasHeight) => {
  adjustCanvasSizeAndBuild(rectWaveCanvas, canvasWidth, canvasHeight);
};

const waveGroup = new WaveGroup();
let requestId;

const animate = () => {
  rectWaveCanvasContext.clearRect(
    0,
    0,
    rectWaveCanvas.width,
    rectWaveCanvas.height
  );
  buildInnerRect(rectWaveCanvas.width, rectWaveCanvas.height);
  buildOuterRect(rectWaveCanvas.width, rectWaveCanvas.height);

  waveGroup.draw(rectWaveCanvasContext);
  requestId = requestAnimationFrame(animate);
};

const startAnimation = () => {
  requestId = requestAnimationFrame(animate);
};

const stopAnimation = () => {
  cancelAnimationFrame(requestId);
};

build(rectWaveCanvas.width, rectWaveCanvas.height);
waveGroup.resize(rectWaveCanvas.width, rectWaveCanvas.height);
startAnimation();

window.addEventListener("resize", () => {
  const newCanvasWidth = window.innerWidth;
  const newCanvasHeight = window.innerHeight;
  build(newCanvasWidth, newCanvasHeight);
  waveGroup.resize(newCanvasWidth, newCanvasHeight);
  stopAnimation();
  startAnimation();
});
