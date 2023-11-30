const circleRotateCanvas = document.getElementById('circleRotate');
const circleRotateCanvasContext = circleRotateCanvas.getContext('2d');
const circleRotateCanvasWidth = circleRotateCanvas.width;
const circleRotateCanvasHeight = circleRotateCanvas.height;

const circleRotateConfig = {
    center: {
        x: 315,
        y: 300,
    },
    outerCircle: {
        radius: 240,
        angleStart: 0,
        angleEnd: 2 * Math.PI,
        lineWidth: 50,
        strokeStyle: '#196df3'
    },

    middleCircle: {
        radius: 240,
        angleStart: 0,
        angleEnd: 2 * Math.PI,
        fillStyle: '#196df3'
    },

    innerCircle: {
        radius: 200,
        angleStart: 0,
        angleEnd: 2 * Math.PI,
        fillStyle: '#000'
    },

    wave: {
        data: 20,
    }
};

const buildInnerCircle = (config) => {
    const {center, innerCircle} = config;

    circleRotateCanvasContext.beginPath();
    circleRotateCanvasContext.arc(center.x, center.y, innerCircle.radius, innerCircle.angleStart, innerCircle.angleEnd, false);
    circleRotateCanvasContext.fillStyle = innerCircle.fillStyle;
    circleRotateCanvasContext.fill();
}

const buildMiddleCircle = (config) => {
    const {center, middleCircle} = config;

    circleRotateCanvasContext.beginPath();
    circleRotateCanvasContext.arc(center.x, center.y, middleCircle.radius, middleCircle.angleStart, middleCircle.angleEnd, false);
    circleRotateCanvasContext.fillStyle = middleCircle.fillStyle;
    circleRotateCanvasContext.fill();
}

const buildOuterCircle = (config, rotateAngle) => {
    const {center, outerCircle} = config;

    circleRotateCanvasContext.beginPath();
    circleRotateCanvasContext.arc(center.x, center.y, outerCircle.radius, outerCircle.angleStart + rotateAngle, outerCircle.angleEnd + rotateAngle, false);
    circleRotateCanvasContext.lineWidth = outerCircle.lineWidth;
    circleRotateCanvasContext.strokeStyle = outerCircle.strokeStyle;
    circleRotateCanvasContext.stroke();
}

let rotate = 0;
function loop() {
    circleRotateCanvasContext.clearRect(0, 0, circleRotateCanvasWidth, circleRotateCanvasHeight);
    circleRotateCanvasContext.translate(circleRotateConfig.center.x, circleRotateConfig.center.y);
    rotate++;
    circleRotateCanvasContext.setLineDash([1,100]);
    circleRotateCanvasContext.setTransform(1,0,0,1,0,0);

    if(rotate > 359) rotate = 0;

    buildMiddleCircle(circleRotateConfig);
    buildInnerCircle(circleRotateConfig);
    buildOuterCircle(circleRotateConfig, rotate * Math.PI / 180);
}

setInterval(() => {
    loop();
}, 50);
