/* HTML에서 canvas 요소를 찾고, 2D Context를 얻어와서 해당 캔버스의 너비와 높이에 대한 정보를 저장합니다. */
const circleWaveCanvas = document.getElementById('circleWave');
const circleWaveCanvasContext = circleWaveCanvas.getContext('2d');
const circleWaveCanvasWidth = circleWaveCanvas.width;
const circleWaveCanvasHeight = circleWaveCanvas.height;

/* circleWave 캔버스에 그려질 원과 파형의 그래픽을 구성합니다. 
   1. center : 원과 웨이브가 그려질 중심점의 x,y 좌표를 설정합니다.
   2. outerCircle: 외부 원에 대한 반지름(radius), 시작각도(angleStart), 끝 각도(angleEnd), 선의 두께(lineWidth), 선의 색상(strokeStyle)을 설정합니다.
   3. innerCircle: 내부 원에 대한 반지름(radius), 시작각도(angleStart), 끝 각도(angleEnd), 선의 두께(lineWidth), 채우기 색상(fillStyle)을 설정합니다.
   4. wave : api 응답을 통해 받아들이는 수치 값(data)에 따라 파형의 높낮이를 조절합니다.
*/
const circleWaveConfig = {
    center: {
        x: 315,
        y: 300,
    },
    outerCircle: {
        radius: 240,
        angleStart: 0,
        angleEnd: 2 * Math.PI,
        lineWidth: 60,
        strokeStyle: '#196df3'
    },

    innerCircle: {
        radius: 220,
        angleStart: 0,
        angleEnd: 2 * Math.PI,
        lineWidth: 20,
        fillStyle: '#000'
    },
    wave: {
       data: 20,
    }
};

/* 
  circleWave 캔버스의 내부 원을 그리는 함수입니다.
  circleWaveConfig에 정의된 center와 innerCircle 속성을 이용합니다.
  arc 메서드를 사용하여 중심좌표, 반지름, 시작/끝 각도, 시계방향 여부를 설정하여 원을 그립니다.
  lineWidth로 선의 두께를, fillStyle로 채우기 색상을 설정합니다.
*/
const buildDashboardInnerCircle = (config) => {
    const {center, innerCircle} = config;

    circleWaveCanvasContext.beginPath();
    circleWaveCanvasContext.arc(center.x, center.y, innerCircle.radius, innerCircle.angleStart, innerCircle.angleEnd, false);
    circleWaveCanvasContext.lineWidth = innerCircle.lineWidth;
    circleWaveCanvasContext.fillStyle = innerCircle.fillStyle;
    circleWaveCanvasContext.fill();
}

/* 
 circleWave 캔버스의 외부 원을 그리는 함수입니다.
 circleWaveConfig에 정의된 center와 outerCircle 속성을 이용합니다.
 arc 메서드를 사용하여 중심좌표, 반지름, 시작/끝 각도, 시계방향 여부를 설정하여 원을 그립니다.
 lineWidth로 선의 두께를, strokeStyle로 선의 색상을 설정합니다.
*/
const buildDashboardOuterCircle = (config) => {
    const {center, outerCircle} = config;

    circleWaveCanvasContext.beginPath();
    circleWaveCanvasContext.arc(center.x, center.y, outerCircle.radius, outerCircle.angleStart, outerCircle.angleEnd, false);
    circleWaveCanvasContext.lineWidth = outerCircle.lineWidth;
    circleWaveCanvasContext.strokeStyle = outerCircle.strokeStyle;
    circleWaveCanvasContext.stroke();
}

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
        this.centerY = (stageHeight - (circleWaveConfig.center.y - circleWaveConfig.innerCircle.radius)); // 파형이 렌더링 되는 중심 y좌표입니다. 

        this.pointGap = (this.stageWidth) / (this.totalPoints - 1);

        this.init();
    }

    init() {
        this.points = [];
        for (let i = 0; i < this.totalPoints; i++) {
            const point = new Point(
                this.index + i,
                90 + (this.pointGap * i * 0.75), // Canvas 내에서 Point 객체의 첫 시작 위치와 Point 객체 간 간격을 조절하는 부분입니다.
                this.centerY - circleWaveConfig.wave.data * 3.5, //게이지 수치에 따른 파형의 높이 변화 정도를 조절하는 부분입니다.
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
        ctx.lineTo(this.points[this.totalPoints -1].x, this.stageHeight - 150);
        ctx.arcTo(this.stageWidth / 2 + 20, this.stageHeight - (circleWaveConfig.center.y - circleWaveConfig.innerCircle.radius), this.points[0].x, this.points[0].y, 0);
        ctx.lineTo((this.points[0].x + this.points[1].x) / 3, this.stageHeight - 150);
        ctx.fill();
        ctx.closePath();
    }
}

class WaveGroup {
    constructor() {
        this.totalWaves = 3;
        this.totalPoints = 6;

        this.color = ['rgba(0,199,235,0.4)', 'rgba(0,146,199,0.4)', 'rgba(0,87,158,0.4)'];

        this.waves = [];

        for (let i = 0; i < this.totalWaves; i++) {
            const wave = new Wave(
                i,
                this.totalPoints,
                this.color[i],
            );
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
        this.canvas = circleWaveCanvas;
        this.ctx = this.canvas.getContext('2d');
        this.stageWidth = circleWaveCanvas.width;
        this.stageHeight = circleWaveCanvas.height / 2;

        document.body.appendChild(this.canvas);

        this.waveGroup = new WaveGroup();

        window.addEventListener('resize', this.resize.bind(this), false);
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
        buildDashboardInnerCircle(circleWaveConfig);
        this.waveGroup.draw(this.ctx);
        buildDashboardOuterCircle(circleWaveConfig);
        requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => {
    new App();
}
