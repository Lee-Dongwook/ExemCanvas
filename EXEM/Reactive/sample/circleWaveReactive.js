/* HTML에서 canvas 요소를 찾고, 2D Context를 얻어와서 해당 캔버스의 너비와 높이에 대한 정보를 저장합니다. */
const circleWaveCanvas = document.getElementById("circleWave");
const circleWaveCanvasContext = circleWaveCanvas.getContext("2d");
const circleWaveCanvasWidth = circleWaveCanvas.width;
const circleWaveCanvasHeight = circleWaveCanvas.height;

const circleRotateCanvas = document.getElementById("circleRotate");
const circleRotateCanvasContext = circleRotateCanvas.getContext("2d");
const circleRotateCanvasWidth = circleRotateCanvas.width;
const circleRotateCanvasHeight = circleRotateCanvas.height;

const minWidth = 400;
const maxWidth = 800;

let rotate = 0;

/* circleWave 캔버스에 그려질 원과 파형의 그래픽을 구성합니다. 
   1. center : 원과 웨이브가 그려질 중심점의 x,y 좌표를 설정합니다.
   2. outerCircle: 외부 원에 대한 반지름(radius), 시작각도(angleStart), 끝 각도(angleEnd), 선의 두께(lineWidth), 선의 색상(strokeStyle)을 설정합니다.
   3. innerCircle: 내부 원에 대한 반지름(radius), 시작각도(angleStart), 끝 각도(angleEnd), 선의 두께(lineWidth), 채우기 색상(fillStyle)을 설정합니다.
   4. wave : api 응답을 통해 받아들이는 수치 값(data)에 따라 파형의 높낮이를 조절합니다.
*/
const circleWaveConfig = {
  center: {
    x: circleWaveCanvasWidth,
    y: circleWaveCanvasHeight,
  },

  rotateCircle: {
    lineWidth: 15,
    strokeStyle: "skyblue",
  },

  outerCircle: {
    lineWidth: 80,
    strokeStyle: "skyblue",
  },

  innerCircle: {
    lineWidth: 20,
    fillStyle: "#000",
  },
  wave: {
    data: 30,
    color: ["rgba(0,199,235,0.4)", "rgba(0,146,199,0.4)", "rgba(0,87,158,0.4)"],
    totalWaves: 3,
    totalPoints: 6,
  },
};

/* 
  circleWave 캔버스의 내부 원을 그리는 함수입니다.
  circleWaveConfig에 정의된 center와 innerCircle 속성을 이용합니다.
  arc 메서드를 사용하여 중심좌표, 반지름, 시작/끝 각도, 시계방향 여부를 설정하여 원을 그립니다.
  lineWidth로 선의 두께를, fillStyle로 채우기 색상을 설정합니다.
*/
const buildInnerCircle = (canvasWidth, canvasHeight, config) => {
  const { innerCircle } = config;

  circleWaveCanvasContext.beginPath();
  circleWaveCanvasContext.arc(
    canvasWidth / 2,
    canvasHeight / 2,
    canvasWidth * 0.3,
    0,
    2 * Math.PI,
    false
  );
  circleWaveCanvasContext.lineWidth = innerCircle.lineWidth;
  circleWaveCanvasContext.fillStyle = innerCircle.fillStyle;
  circleWaveCanvasContext.fill();
};

/* 
 circleWave 캔버스의 외부 원을 그리는 함수입니다.
 circleWaveConfig에 정의된 center와 outerCircle 속성을 이용합니다.
 arc 메서드를 사용하여 중심좌표, 반지름, 시작/끝 각도, 시계방향 여부를 설정하여 원을 그립니다.
 lineWidth로 선의 두께를, strokeStyle로 선의 색상을 설정합니다.
*/
const buildOuterCircle = (canvasWidth, canvasHeight, config) => {
  const { outerCircle } = config;

  circleWaveCanvasContext.beginPath();
  circleWaveCanvasContext.arc(
    canvasWidth / 2,
    canvasHeight / 2,
    canvasWidth * 0.3,
    0,
    2 * Math.PI,
    false
  );
  circleWaveCanvasContext.lineWidth = outerCircle.lineWidth;
  circleWaveCanvasContext.strokeStyle = outerCircle.strokeStyle;
  circleWaveCanvasContext.stroke();
};

const buildRotateOuterCircle = (
  canvasWidth,
  canvasHeight,
  config,
  rotateAngle
) => {
  const { rotateCircle } = config;

  circleRotateCanvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

  circleRotateCanvasContext.beginPath();
  circleRotateCanvasContext.arc(
    canvasWidth / 2,
    canvasHeight / 2,
    canvasWidth * 0.4,
    0 + rotateAngle,
    2 * Math.PI + rotateAngle,
    false
  );
  circleRotateCanvasContext.lineWidth = rotateCircle.lineWidth;
  circleRotateCanvasContext.strokeStyle = rotateCircle.strokeStyle;
  circleRotateCanvasContext.stroke();
  circleRotateCanvasContext.setLineDash([1, 100]);
  circleRotateCanvasContext.setTransform(1, 0, 0, 1, 0, 0);

  requestAnimationFrame(() => {
    rotateAngle += (1 * Math.PI) / 180;
    buildRotateOuterCircle(canvasWidth, canvasHeight, config, rotateAngle);
  });
};

/* 
    파형을 구현하는 부분은 Point, Wave, WaveGroup 3개의 Class로 구현하였습니다.
    1. Point : 파형의 한 점을 나타내는 클래스입니다.
    2. Wave : 여러 개의 Point객체를 사용하여 파형을 구현합니다.
    3. WaveGroup : 여러 개의 Wave 객체를 사용하여 중첩된 파형을 구현합니다.
*/
class Point {
  constructor(index, x, y) {
    this.x = x;
    this.y = y;
    this.fixedY = y;
    this.speed = 0.02 * (circleWaveConfig.wave.data / 10); //파형의 속도를 조절하는 부분입니다.
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
    this.points = [];
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.centerX = stageWidth / 2;
    this.centerY = stageHeight / 2 + stageWidth * 0.25; // 파형이 렌더링 되는 중심 y좌표입니다.
    this.pointGap = this.stageWidth / (this.totalPoints - 1);

    this.init();
  }

  init() {
    this.points = [];
    for (let i = 0; i < this.totalPoints; i++) {
      const point = new Point(
        this.index + i,
        this.stageWidth * 0.2 + this.pointGap * i * 0.6, // Can6vas 내에서 Point 객체의 첫 시작 위치와 Point 객체 간 간격을 조절하는 부분입니다.
        this.centerY - circleWaveConfig.wave.data * 3 //게이지 수치에 따른 파형의 높이 변화 정도를 조절하는 부분입니다.
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

    /* 
      파형의 아랫 부분을 렌더링하는 로직입니다.
    */
    ctx.lineTo(prevX, prevY);
    ctx.lineTo(
      this.points[this.totalPoints - 2].x,
      this.stageHeight / 2 + this.stageWidth * 0.25
    );
    ctx.lineTo(this.points[1].x, this.stageHeight / 2 + this.stageWidth * 0.25);
    ctx.fill();
    ctx.closePath();
  }
}

class WaveGroup {
  constructor() {
    this.totalWaves = circleWaveConfig.wave.totalWaves;
    this.totalPoints = circleWaveConfig.wave.totalPoints;

    this.color = circleWaveConfig.wave.color;

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
    this.circleWaveCanvas = document.getElementById("circleWave");
    this.circleWaveCtx = this.circleWaveCanvas.getContext("2d");
    this.circleWaveWidth = this.circleWaveCanvas.width;
    this.circleWaveHeight = this.circleWaveCanvas.height;

    this.circleRotateCanvas = document.getElementById("circleRotate");
    this.circleRotateCtx = this.circleRotateCanvas.getContext("2d");
    this.circleRotateWidth = this.circleRotateCanvas.width;
    this.circleRotateHeight = this.circleRotateCanvas.height;

    document.body.appendChild(this.circleWaveCanvas);
    document.body.appendChild(this.circleRotateCanvas);

    this.waveGroup = new WaveGroup();

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    const maxWidth = 800;
    const minWidth = 400;

    this.circleWaveWidth = Math.max(
      minWidth,
      Math.min(maxWidth, window.innerWidth)
    );
    this.circleWaveHeight = this.circleWaveWidth;

    this.circleRotateWidth = this.circleWaveWidth;
    this.circleRotateHeight = this.circleWaveHeight;

    this.circleWaveCanvas.width = this.circleWaveWidth;
    this.circleWaveCanvas.height = this.circleWaveHeight;

    this.circleRotateCanvas.width = this.circleRotateWidth;
    this.circleRotateCanvas.height = this.circleRotateHeight;

    this.waveGroup.resize(this.circleWaveWidth, this.circleWaveHeight);
  }

  animate(time) {
    this.circleWaveCtx.clearRect(
      0,
      0,
      this.circleWaveWidth,
      this.circleWaveHeight
    );
    buildInnerCircle(
      this.circleWaveWidth,
      this.circleWaveHeight,
      circleWaveConfig
    );
    this.waveGroup.draw(this.circleWaveCtx);
    buildOuterCircle(
      this.circleWaveWidth,
      this.circleWaveHeight,
      circleWaveConfig
    );

    this.circleRotateCtx.clearRect(
      0,
      0,
      this.circleRotateWidth,
      this.circleRotateHeight
    );
    buildRotateOuterCircle(
      this.circleRotateWidth,
      this.circleRotateHeight,
      circleWaveConfig,
      (rotate * Math.PI) / 180
    );

    requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = () => {
  new App();
};
