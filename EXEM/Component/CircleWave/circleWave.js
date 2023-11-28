const circleWaveCanvas = document.getElementById('circleWave');
const circleWaveCanvasContext = circleWaveCanvas.getContext('2d');
const circleWaveCanvasWidth = circleWaveCanvas.width;
const circleWaveCanvasHeight = circleWaveCanvas.height;

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
       data: 70,
    }
};

const buildDashboardInnerCircle = (config) => {
    const {center, innerCircle} = config;

    circleWaveCanvasContext.beginPath();
    circleWaveCanvasContext.arc(center.x, center.y, innerCircle.radius, innerCircle.angleStart, innerCircle.angleEnd, false);
    circleWaveCanvasContext.lineWidth = innerCircle.lineWidth;
    circleWaveCanvasContext.fillStyle = innerCircle.fillStyle;
    circleWaveCanvasContext.fill();
}

const buildDashboardOuterCircle = (config) => {
    const {center, outerCircle} = config;

    circleWaveCanvasContext.beginPath();
    circleWaveCanvasContext.arc(center.x, center.y, outerCircle.radius, outerCircle.angleStart, outerCircle.angleEnd, false);
    circleWaveCanvasContext.lineWidth = outerCircle.lineWidth;
    circleWaveCanvasContext.strokeStyle = outerCircle.strokeStyle;
    circleWaveCanvasContext.stroke();
}

class Point {
    constructor(index, x, y) {
        this.x = x;
        this.y = y;
        this.fixedY = y;
        this.speed = 0.05;
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
        this.centerY = circleWaveConfig.center.y + circleWaveConfig.outerCircle.radius;

        this.pointGap = (this.stageWidth) / (this.totalPoints - 1);

        this.init();
    }

    init() {
        this.points = [];
        for (let i = 0; i < this.totalPoints; i++) {
            const point = new Point(
                this.index + i,
                90 + (this.pointGap * i * 0.75),
                this.centerY - circleWaveConfig.wave.data * 4,
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
        ctx.lineTo(this.points[this.totalPoints -1].x, this.stageHeight - 150);
        ctx.arcTo(this.stageWidth / 2 + 20, this.stageHeight - circleWaveConfig.wave.data, this.points[0].x, this.points[0].y, 0);
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
