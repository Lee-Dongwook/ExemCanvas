const waveReactiveCanvas = document.getElementById("waveReactive");
const waveReactiveCanvasContext = waveReactiveCanvas.getContext("2d");
const minWidth = 300;
const minHeight = 300;

const waveConfig = {
  totalWaves: 3,
  totalPoints: 6,
  color: ["rgba(0,199,235,0.4)", "rgba(0,146,199,0.4)", "rgba(0,87,158,0.4)"],
  waves: [],
  data: 70,
};

class Point {
  constructor(index, x, y) {
    this.x = x;
    this.y = y;
    this.fixedY = y;
    this.speed = 0.02 * (waveConfig.data / 10); // 파형의 속도를 조절하는 부분입니다.
    this.cur = index;
  }

  update() {
    this.cur += this.speed;
    this.y = this.fixedY + Math.sin(this.cur) * 45; //파형의 진폭을 조절하는 부분입니다.
  }
}

class Wave {
  constructor(index, totalPoints, color) {
    this.index = index;
    this.totalPoints = totalPoints;
    this.color = color;
    this.centerX = waveReactiveCanvas.width / 2;
    this.centerY = waveReactiveCanvas.height / 2;
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
        this.centerY - waveConfig.data * 4.5 // 게이지 수치에 따른 파형의 높이 변화 정도를 조절하는 부분입니다.
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

class App {
  constructor() {
    this.canvas = waveReactiveCanvas;
    this.ctx = waveReactiveCanvasContext;
    this.stageWidth = window.innerWidth;
    this.stageHeight = window.innerHeight / 2;

    document.body.appendChild(this.canvas);

    this.waveGroup = new WaveGroup();

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    this.waveGroup.resize(this.stageWidth, this.stageHeight);
  }

  animate(time) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.waveGroup.draw(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = () => {
  new App();
};

window.addEventListener("resize", () => {
  const app = new App();
  app.resize();
});
