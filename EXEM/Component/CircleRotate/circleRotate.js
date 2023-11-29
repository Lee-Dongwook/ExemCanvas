/* HTML에서 canvas 요소를 찾고, 2D Context를 얻어와서 해당 캔버스의 너비와 높이에 대한 정보를 저장합니다. */
const circleRotateCanvas = document.getElementById('circleRotate');
const circleRotateCanvasContext = circleRotateCanvas.getContext('2d');
const circleRotateCanvasWidth = circleRotateCanvas.width;
const circleRotateCanvasHeight = circleRotateCanvas.height;

/* circleRotate 캔버스에 그려질 원과 파형의 그래픽을 구성합니다. 
   1. center : 원과 웨이브가 그려질 중심점의 x,y 좌표를 설정합니다.
   2. outerCircle: 외부 원에 대한 반지름(radius), 시작각도(angleStart), 끝 각도(angleEnd), 선의 두께(lineWidth), 선의 색상(strokeStyle)을 설정합니다.
   3. innerCircle: 내부 원에 대한 반지름(radius), 시작각도(angleStart), 끝 각도(angleEnd), 선의 두께(lineWidth), 채우기 색상(fillStyle)을 설정합니다.
   4. wave : api 응답을 통해 받아들이는 수치 값(data)에 따라 파형의 높낮이를 조절합니다.
*/
const circleRotateConfig = {
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
};

/* 
  circleRotate 캔버스의 내부 원을 그리는 함수입니다.
  circleRotateConfig에 정의된 center와 innerCircle 속성을 이용합니다.
  arc 메서드를 사용하여 중심좌표, 반지름, 시작/끝 각도, 시계방향 여부를 설정하여 원을 그립니다.
  lineWidth로 선의 두께를, fillStyle로 채우기 색상을 설정합니다.
*/
const buildInnerCircle = (config) => {
    const {center, innerCircle} = config;

    circleRotateCanvasContext.beginPath();
    circleRotateCanvasContext.arc(center.x, center.y, innerCircle.radius, innerCircle.angleStart, innerCircle.angleEnd, false);
    circleRotateCanvasContext.lineWidth = innerCircle.lineWidth;
    circleRotateCanvasContext.fillStyle = innerCircle.fillStyle;
    circleRotateCanvasContext.fill();
}

/* 
 circleRotate 캔버스의 외부 원을 그리는 함수입니다.
 circleRotateConfig에 정의된 center와 outerCircle 속성을 이용합니다.
 arc 메서드를 사용하여 중심좌표, 반지름, 시작/끝 각도, 시계방향 여부를 설정하여 원을 그립니다.
 lineWidth로 선의 두께를, strokeStyle로 선의 색상을 설정합니다.
*/
const buildOuterCircle = (config) => {
    const {center, outerCircle} = config;

    circleRotateCanvasContext.beginPath();
    circleRotateCanvasContext.arc(center.x, center.y, outerCircle.radius, outerCircle.angleStart, outerCircle.angleEnd, false);
    circleRotateCanvasContext.lineWidth = outerCircle.lineWidth;
    circleRotateCanvasContext.strokeStyle = outerCircle.strokeStyle;
    circleRotateCanvasContext.stroke();
}

class App {
    constructor() {
        this.canvas = circleRotateCanvas;
        this.ctx = this.canvas.getContext('2d');
        this.stageWidth = circleRotateCanvas.width;
        this.stageHeight = circleRotateCanvas.height / 2;

        document.body.appendChild(this.canvas);

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.canvas.width = this.stageWidth;
        this.canvas.height = this.stageHeight;
    }

    animate(time) {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        buildInnerCircle(circleRotateConfig);
        buildOuterCircle(circleRotateConfig);
        requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => {
    new App();
}
